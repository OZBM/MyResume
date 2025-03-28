// DOM Elements
const video = document.getElementById('video');
const drawingCanvas = document.getElementById('drawing-canvas');
const handCanvas = document.getElementById('hand-canvas');
const saveBtn = document.getElementById('save-btn');
const colorBtn = document.getElementById('color-btn');
const sizeBtn = document.getElementById('size-btn');
const shapeBtn = document.getElementById('shape-btn');
const clearBtn = document.getElementById('clear-btn');
const smoothBtn = document.getElementById('smooth-btn');
const scalingBtn = document.getElementById('scaling-btn');
const colorWheel = document.getElementById('color-wheel');
const sizeSelector = document.getElementById('size-selector');
const shapeSelector = document.getElementById('shape-selector');
const smoothingControls = document.getElementById('smoothing-controls');
const scalingSelector = document.getElementById('scaling-selector');
const colorOptions = document.querySelectorAll('.color-option');
const sizeOptions = document.querySelectorAll('.size-option');
const brushOptions = document.querySelectorAll('.brush-option');
const brushCategories = document.querySelectorAll('.brush-category');
const smoothingSlider = document.getElementById('smoothing-slider');
const smoothingValue = document.getElementById('smoothing-value');
const smoothingToggle = document.getElementById('smoothing-toggle');
const scalingOptions = document.querySelectorAll('.scaling-option');
const scalingPreviewCanvas = document.getElementById('scaling-preview-canvas');

// Canvas Setup
const drawingCtx = drawingCanvas.getContext('2d');
const handCtx = handCanvas.getContext('2d');
let canvasWidth, canvasHeight;

// Drawing settings
let currentColor = '#ff0000';  // Default: red
let currentSize = 6;           // Default: medium (base size)
let currentShape = 'round';    // Default: round
let minDrawSize = 2;           // Minimum drawing size
let maxDrawSize = 15;          // Maximum drawing size
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Path tracking for continuous brush effects
let currentStrokePath = [];
let isNewStroke = true;
let strokeStartTime = Date.now();
let continuousEffectsCanvas = document.createElement('canvas'); // Hidden canvas for continuous effects

// Line smoothing settings
let smoothingEnabled = true;   // Enable smoothing by default
let smoothingStrength = 0.9;   // Smoothing strength (0-1) - increased default for stronger effect
let speedThreshold = 15;       // Speed threshold for adaptive smoothing
let pointsBuffer = [];         // Buffer to store recent points for smoothing
let maxBufferSize = 60;        // Maximum points for ultra-aggressive smoothing at max setting
let adaptiveWeight = true;     // Use adaptive weighting based on point recency

// Line scaling settings
let currentScalingMode = 'depth';  // Default scaling mode: depth-based (z-axis)
let lastSpeed = 0;                // Track movement speed for speed-based scaling
// Variables already defined below
let lastDirection = { x: 0, y: 1 };  // Track movement direction for calligraphy mode (start with downward)
let directionHistory = [];         // Buffer for averaging direction for smoother calligraphy
let maxDirectionHistorySize = 15;  // Size of direction history buffer (larger for stability)
let lastPressure = 0.5;            // Simulated pressure (0-1) for pressure mode
let pressureChangeRate = 0.05;     // How quickly pressure changes
let speedHistory = [];             // Buffer for averaging speed
let maxSpeedHistorySize = 10;      // Size of speed history buffer
let pressureDirection = 1;         // Direction of pressure change (increasing/decreasing)
let calligraphyAngle = 45;         // Angle for calligraphy mode in degrees
let minLineWidth = 1;              // Minimum line width in any mode
let maxLineWidth = 15;             // Maximum line width in any mode
let speedSensitivity = 0.8;        // How sensitive speed scaling is (higher = more sensitive)
let depthSensitivity = 1.0;        // How sensitive depth scaling is
let scalingPreviewActive = false;  // Flag for scaling preview animation

// Button positions and dimensions (will be calculated when video dimensions are known)
let buttonPositions = [];

// UI control for smoothing
let smoothingControlVisible = false;

// Hand tracking
let hands;
let camera;
let isIndexFingerUp = false;
let indexFingerTip = { x: 0, y: 0 };
let pressureLevel = 0.5; // Default pressure level - make it global

// Initialize MediaPipe Hands
function initHandTracking() {
    hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });
    
    // Add handler for potential initialization errors
    hands.onResults((results) => {
        try {
            onHandResults(results);
        } catch (error) {
            console.error('Error in hand tracking:', error);
        }
    });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    // Start camera
    camera = new Camera(video, {
        onFrame: async () => {
            await hands.send({ image: video });
        },
        width: 1280,
        height: 720
    });
    
    camera.start();
}

// Resize canvases when video size is known
function setupCanvases() {
    const containerRect = video.parentElement.getBoundingClientRect();
    canvasWidth = containerRect.width;
    canvasHeight = containerRect.height;
    
    video.width = canvasWidth;
    video.height = canvasHeight;
    
    drawingCanvas.width = canvasWidth;
    drawingCanvas.height = canvasHeight;
    
    handCanvas.width = canvasWidth;
    handCanvas.height = canvasHeight;
    
    // Set initial button positions
    updateButtonPositions();
    
    // Clear canvas with a transparent background
    drawingCtx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Update button positions based on canvas size
function updateButtonPositions() {
    const buttonSize = 50;
    const padding = 20;
    const margin = 15;
    
    buttonPositions = [
        // Save button (top right)
        {
            id: 'save-btn',
            x: canvasWidth - padding - buttonSize,
            y: padding,
            width: buttonSize,
            height: buttonSize
        },
        // Color button (top right - 1)
        {
            id: 'color-btn',
            x: canvasWidth - padding - buttonSize - margin - buttonSize,
            y: padding,
            width: buttonSize,
            height: buttonSize
        },
        // Size button (top right - 2)
        {
            id: 'size-btn',
            x: canvasWidth - padding - buttonSize - 2 * (margin + buttonSize),
            y: padding,
            width: buttonSize,
            height: buttonSize
        },
        // Shape button (top right - 3)
        {
            id: 'shape-btn',
            x: canvasWidth - padding - buttonSize - 3 * (margin + buttonSize),
            y: padding,
            width: buttonSize,
            height: buttonSize
        },
        // Clear button (top right - 4)
        {
            id: 'clear-btn',
            x: canvasWidth - padding - buttonSize - 4 * (margin + buttonSize),
            y: padding,
            width: buttonSize,
            height: buttonSize
        }
    ];
}

// Handle hand tracking results
function onHandResults(results) {
    // Clear hand canvas
    handCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Safety check for canvas dimensions
    if (!canvasWidth || !canvasHeight) {
        setupCanvases();
        return; // Skip this frame if canvas isn't ready
    }
    
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // We're only tracking one hand
        const landmarks = results.multiHandLandmarks[0];
        
        // Apply the same mirroring to hand landmarks as the video
        const mirroredLandmarks = landmarks.map(landmark => {
            return {
                x: 1 - landmark.x,  // Mirror the x-coordinate
                y: landmark.y,       // Keep y-coordinate the same
                z: landmark.z        // Keep z-coordinate the same
            };
        });
        
        // Draw hand landmarks (using mirrored coordinates)
        drawConnectors(handCtx, mirroredLandmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 2});
        drawLandmarks(handCtx, mirroredLandmarks, {color: '#FF0000', lineWidth: 1, radius: 3});
        
        // Get index finger tip position (mirrored)
        indexFingerTip = {
            x: (1 - landmarks[8].x) * canvasWidth,  // Mirror the x-coordinate
            y: landmarks[8].y * canvasHeight
        };
        
        // Get thumb tip position (mirrored)
        const thumbTip = {
            x: (1 - landmarks[4].x) * canvasWidth,  // Mirror the x-coordinate
            y: landmarks[4].y * canvasHeight
        };
        
        // Check if index finger is up and pointing forward
        // We can determine this by comparing the y-coordinates and z-coordinates
        isIndexFingerUp = landmarks[8].y < landmarks[6].y;  // Index tip is higher than PIP joint
        
        // Check if index finger is pointing forward (z coordinate is smaller/more negative than base)
        // This is a rough estimate as MediaPipe's z coordinate is less reliable than x and y
        const isFingerPointingForward = landmarks[8].z < landmarks[5].z - 0.05;
        
        // Calculate how far the finger is pressed (pressure level based on z-coordinate)
        // The more negative the z value, the closer to camera (more "pressed")
        // Map this to a value between 0 and 1 for drawing size
        const fingerBaseZ = landmarks[5].z;  // Base of the finger
        const fingerTipZ = landmarks[8].z;    // Tip of the finger
        
        // Calculate pressure as a ratio of how much closer the tip is compared to the base
        // Clamp between 0 and 1 - higher number means more pressure
        const basePressure = Math.min(Math.max((fingerBaseZ - fingerTipZ) / 0.1, 0), 1);
        
        // Apply an easing function to make the size control more intuitive
        pressureLevel = Math.pow(basePressure, 1.5); // Apply curve to make control more natural - update global variable
        
        const isThumbClose = 
            Math.sqrt(Math.pow(thumbTip.x - indexFingerTip.x, 2) + 
                      Math.pow(thumbTip.y - indexFingerTip.y, 2)) < 50;
        
        // Draw cursor at index finger tip with different color and size based on pressure
        const cursorSize = isFingerPointingForward ? 10 + (pressureLevel * 15) : 10;
        handCtx.beginPath();
        handCtx.arc(indexFingerTip.x, indexFingerTip.y, cursorSize, 0, Math.PI * 2);
        
        // Green when drawing (pointing forward), yellow when pressing (thumb close), red otherwise
        // Also adjust the shade of green based on pressure when drawing
        let cursorColor;
        if (isIndexFingerUp) {
            if (isThumbClose) {
                cursorColor = 'yellow';
            } else if (isFingerPointingForward) {
                // Calculate color based on pressure - from light green to dark green
                const colorIntensity = Math.floor(150 - (pressureLevel * 150));
                cursorColor = `rgb(0, ${colorIntensity}, 0)`;
            } else {
                cursorColor = '#98FB98';
            }
        } else {
            cursorColor = 'red';
        }
        
        handCtx.fillStyle = cursorColor;
        handCtx.fill();
        
        // Display pressure level indicator when drawing
        if (isIndexFingerUp && isFingerPointingForward) {
            handCtx.fillStyle = 'white';
            handCtx.font = '12px Arial';
            handCtx.fillText(`${Math.round(pressureLevel * 100)}%`, indexFingerTip.x + 20, indexFingerTip.y - 10);
        }
        
        // Check button interactions
        if (isIndexFingerUp && isThumbClose) {
            checkButtonInteractions();
        }
        
        // Handle drawing - now requiring finger to be pointing forward
        if (isIndexFingerUp && isFingerPointingForward && !isThumbClose) {
            // Z-axis position (depth) of the index finger tip - used for depth-based scaling
            const fingerZ = landmarks[8].z;
            
            if (!isDrawing) {
                // Start a new drawing path
                isDrawing = true;
                lastX = indexFingerTip.x;
                lastY = indexFingerTip.y;
                
                // Reset points buffer for new stroke
                pointsBuffer = [];
                addPointToBuffer(indexFingerTip.x, indexFingerTip.y);
                
                // Initialize speed tracking for scaling modes
                speedHistory = [];
                
                // For calligraphy, we DON'T reset direction completely
                // This allows smoother transitions between strokes
                if (directionHistory.length === 0) {
                    // If no previous direction, start with default
                    directionHistory = [{ x: 0, y: 1 }]; // Default downward direction
                    lastDirection = { x: 0, y: 1 };
                }
            } else {
                // Get smoothed position if enabled
                let nextPoint;
                if (smoothingEnabled) {
                    addPointToBuffer(indexFingerTip.x, indexFingerTip.y);
                    nextPoint = getSmoothedPoint();
                } else {
                    nextPoint = { x: indexFingerTip.x, y: indexFingerTip.y };
                }
                
                // Track changes in direction for calligraphy mode
                const dx = nextPoint.x - lastX;
                const dy = nextPoint.y - lastY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0) {
                    // Update current direction
                    const newDirection = { x: dx / distance, y: dy / distance };
                    
                    // Only add to direction history if it's a significant change
                    // This prevents tiny movements from causing direction shifts
                    const dotProduct = newDirection.x * lastDirection.x + newDirection.y * lastDirection.y;
                    
                    // For calligraphy, we need to be much more selective about direction changes
                    // Only record significant changes (dot product < 0.95 means angle > ~18 degrees)
                    if (dotProduct < 0.95 || directionHistory.length < 5) {
                        // Add to direction history
                        directionHistory.push(newDirection);
                        if (directionHistory.length > maxDirectionHistorySize) {
                            directionHistory.shift();
                        }
                    }
                    
                    // For calligraphy, weight recent directions more heavily but maintain history influence
                    // This creates much more stable lines with gradual transitions
                    let weightedX = 0;
                    let weightedY = 0;
                    let totalWeight = 0;
                    
                    // Calculate weighted average with much stronger emphasis on recent history
                    // and exponential weighting to maintain stability
                    for (let i = 0; i < directionHistory.length; i++) {
                        // Higher weight for more recent directions (exponential weighting)
                        // directionHistory[0] is oldest, directionHistory[length-1] is newest
                        const idx = directionHistory.length - 1 - i; // reverse index (newest first)
                        const weight = Math.pow(2, idx); // Exponential weight - much stronger emphasis on recent
                        
                        weightedX += directionHistory[i].x * weight;
                        weightedY += directionHistory[i].y * weight;
                        totalWeight += weight;
                    }
                    
                    // Calculate weighted average direction
                    lastDirection = {
                        x: weightedX / totalWeight,
                        y: weightedY / totalWeight
                    };
                    
                    // Normalize to unit vector
                    const dirMagnitude = Math.sqrt(lastDirection.x * lastDirection.x + lastDirection.y * lastDirection.y);
                    if (dirMagnitude > 0) {
                        lastDirection.x /= dirMagnitude;
                        lastDirection.y /= dirMagnitude;
                    }
                }
                
                // Continue drawing with smoothed position and dynamic z-value
                drawLine(lastX, lastY, nextPoint.x, nextPoint.y, fingerZ);
                lastX = nextPoint.x;
                lastY = nextPoint.y;
            }
        } else {
            // Stop drawing when index finger is down, not pointing forward, or thumb is close
            isDrawing = false;
            
            // Clear the points buffer
            pointsBuffer = [];
            
            // Reset path tracking variables for special effects
            isNewStroke = true;
            currentStrokePath = [];
            
            // Reset direction history when stopping drawing
            // But keep the last direction as the initial direction for the next stroke
            if (directionHistory.length > 0) {
                const lastDir = directionHistory[directionHistory.length - 1];
                directionHistory = [lastDir]; // Keep only the last direction
            }
        }
    } else {
        // No hands detected
        isDrawing = false;
    }
}

// Add point to smoothing buffer
function addPointToBuffer(x, y) {
    // Add the point to the buffer
    pointsBuffer.push({ x, y, timestamp: Date.now() });
    
    // Maintain buffer size
    if (pointsBuffer.length > maxBufferSize) {
        pointsBuffer.shift(); // Remove oldest point
    }
}

// Get smoothed point based on recent points in buffer
function getSmoothedPoint() {
    if (pointsBuffer.length <= 1) {
        return pointsBuffer[0]; // Not enough points to smooth
    }
    
    // Get the most recent point (current position)
    const current = pointsBuffer[pointsBuffer.length - 1];
    const previous = pointsBuffer[pointsBuffer.length - 2];
    
    // Calculate movement speed (pixels per millisecond)
    const distance = Math.sqrt(
        Math.pow(current.x - previous.x, 2) + 
        Math.pow(current.y - previous.y, 2)
    );
    const timeDelta = current.timestamp - previous.timestamp;
    const speed = timeDelta > 0 ? distance / timeDelta : 0;
    
    // Check if we're using max aggressive smoothing (over 0.95)
    const isUltraSmoothing = smoothingStrength > 0.95;
    
    // Adaptive smoothing - less smoothing for slow movements, more for fast
    let adaptiveStrength = smoothingStrength;
    
    // At ultra smoothing levels, we maintain high smoothing regardless of speed
    if (!isUltraSmoothing && speed > 0) {
        // Adjust smoothing strength based on speed
        // For faster movements (more than threshold), increase smoothing
        if (speed > speedThreshold) {
            adaptiveStrength = Math.min(smoothingStrength * 1.5, 0.98);
        } else {
            // For very slow, precise movements, reduce smoothing slightly
            adaptiveStrength = Math.max(smoothingStrength * 0.8, 0.5);
        }
    } else if (isUltraSmoothing) {
        // At ultra smoothing, we maintain extremely high smoothing values
        adaptiveStrength = Math.max(0.97, smoothingStrength);
    }
    
    // Decide how many points to consider based on smoothing level
    // At ultra-smoothing levels, use a much larger portion of the buffer
    const pointsToUse = isUltraSmoothing ? 
        Math.min(pointsBuffer.length, maxBufferSize) : 
        Math.min(pointsBuffer.length, Math.ceil(maxBufferSize * 0.5 * smoothingStrength));
    
    // Get subset of points to consider (most recent ones)
    const relevantPoints = pointsBuffer.slice(-pointsToUse);
    
    // Apply weighted average smoothing
    let smoothedX = 0;
    let smoothedY = 0;
    let totalWeight = 0;
    
    // Calculate weights for each point - more recent points have higher weight
    for (let i = 0; i < relevantPoints.length; i++) {
        // Different weighting strategies based on smoothing level
        let weight;
        
        if (isUltraSmoothing) {
            // For ultra-smoothing: use a more uniform weight distribution 
            // with only slight preference for recent points
            // This creates extremely smooth lines by considering long history
            const normalizedPos = i / (relevantPoints.length - 1);
            weight = 0.3 + 0.7 * normalizedPos;
        } else {
            // Normal smoothing: stronger preference for recent points
            // Weight increases exponentially with recency
            const normalizedPos = i / (relevantPoints.length - 1);
            weight = Math.pow(normalizedPos, 2);
        }
        
        smoothedX += relevantPoints[i].x * weight;
        smoothedY += relevantPoints[i].y * weight;
        totalWeight += weight;
    }
    
    // Normalize by total weight
    smoothedX /= totalWeight;
    smoothedY /= totalWeight;
    
    // For ultra-smoothing, we might add additional passes of smoothing
    if (isUltraSmoothing) {
        // Apply a second pass of smoothing for ultra-smooth results
        // This creates an even smoother curve by smoothing the already smoothed position
        const blendFactorToCurrentPos = 0.15; // Only use 15% of current position
        smoothedX = smoothedX * (1 - blendFactorToCurrentPos) + current.x * blendFactorToCurrentPos;
        smoothedY = smoothedY * (1 - blendFactorToCurrentPos) + current.y * blendFactorToCurrentPos;
    } else {
        // Blend between raw and smoothed position based on adaptive strength
        smoothedX = (current.x * (1 - adaptiveStrength)) + (smoothedX * adaptiveStrength);
        smoothedY = (current.y * (1 - adaptiveStrength)) + (smoothedY * adaptiveStrength);
    }
    
    return { x: smoothedX, y: smoothedY };
}

// Helper function to calculate the total length of a stroke path
function getStrokePathLength(path) {
    if (path.length < 2) return 0;
    
    let totalLength = 0;
    for (let i = 1; i < path.length; i++) {
        const dx = path[i].x - path[i-1].x;
        const dy = path[i].y - path[i-1].y;
        totalLength += Math.sqrt(dx*dx + dy*dy);
    }
    
    return totalLength;
}

// Draw line between two points
function drawLine(x1, y1, x2, y2, z = 0) {
    // Calculate line width based on the active scaling mode
    let lineWidth = calculateLineWidth(x2, y2, z, x1, y1);
    
    // Apply current size as a multiplier (scaled from the medium size of 6)
    lineWidth = lineWidth * (currentSize / 6);
    
    const brushType = currentShape;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    
    // Default brush settings
    drawingCtx.strokeStyle = currentColor;
    drawingCtx.lineWidth = lineWidth;
    drawingCtx.lineCap = 'round';
    drawingCtx.lineJoin = 'round';
    
    // Track current stroke path to create continuous lines
    if (isNewStroke) {
        isNewStroke = false;
        strokeStartTime = Date.now();
        currentStrokePath = [{x: x1, y: y1}, {x: x2, y: y2}];
    } else {
        // Add current point to path
        currentStrokePath.push({x: x2, y: y2});
        
        // For all brush types, ensure segments connect smoothly
        // Draw small connection dots at segment junctions for all brush types
        if (distance > 0 && currentStrokePath.length > 2) {
            // Save the current drawing state
            const origLineWidth = drawingCtx.lineWidth;
            const origFillStyle = drawingCtx.fillStyle;
            
            // Create a connector dot at the junction point
            drawingCtx.beginPath();
            drawingCtx.fillStyle = currentColor;
            drawingCtx.arc(x1, y1, lineWidth * 0.6, 0, Math.PI * 2);
            drawingCtx.fill();
            
            // Restore original properties
            drawingCtx.lineWidth = origLineWidth;
            drawingCtx.fillStyle = origFillStyle;
        }
    }
    
    // Helper function to convert hex color to rgba
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    // Helper function to shift hue of a color
    function shiftHue(hex, amount) {
        // Simple implementation - for complex applications use a library
        // This is just a basic approximation
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        // Crude hue shift - this will work for simple effects
        // For accurate hue shifting, you'd convert to HSL, shift H, convert back
        return `rgb(${Math.min(255, r + amount)}, ${g}, ${Math.min(255, b + amount)})`;
    }
    
    // Apply different brush effects based on the selected brush type
    switch (brushType) {
        case 'round': // Classic round brush
            drawingCtx.beginPath();
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            drawingCtx.stroke();
            break;
            
        case 'square': // Keep square brush for compatibility
            drawingCtx.lineCap = 'butt';
            drawingCtx.lineJoin = 'miter';
            drawingCtx.beginPath();
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            drawingCtx.stroke();
            break;
            
        case 'triangle': // Keep triangle brush for compatibility
            drawingCtx.beginPath();
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            drawingCtx.stroke();
            
            const size = lineWidth * 1.5;
            drawingCtx.beginPath();
            drawingCtx.moveTo(x2, y2 - size);
            drawingCtx.lineTo(x2 + size, y2 + size);
            drawingCtx.lineTo(x2 - size, y2 + size);
            drawingCtx.closePath();
            drawingCtx.fillStyle = currentColor;
            drawingCtx.fill();
            break;
            
        case 'pencil': // Pencil effect with slight jitter
            // Main line
            drawingCtx.beginPath();
            drawingCtx.lineWidth = lineWidth * 0.8;
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            drawingCtx.stroke();
            
            // Secondary slightly offset line for texture
            drawingCtx.beginPath();
            drawingCtx.lineWidth = lineWidth * 0.3;
            const jitterX = Math.random() * 1.5 - 0.75;
            const jitterY = Math.random() * 1.5 - 0.75;
            drawingCtx.moveTo(x1 + jitterX, y1 + jitterY);
            drawingCtx.lineTo(x2 + jitterX, y2 + jitterY);
            drawingCtx.stroke();
            break;
            
        case 'brush': // Paintbrush with texture
            drawingCtx.beginPath();
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            
            // Create brush texture with dash pattern
            drawingCtx.lineDashOffset = Math.random() * 2;
            drawingCtx.setLineDash([1, 2]);
            drawingCtx.stroke();
            drawingCtx.setLineDash([]);
            break;
            
        case 'marker': // Semi-transparent marker effect
            const origAlpha = hexToRgba(currentColor, 0.4);
            drawingCtx.strokeStyle = origAlpha;
            drawingCtx.lineWidth = lineWidth * 1.3;
            drawingCtx.beginPath();
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            drawingCtx.stroke();
            
            // Add more solid center
            drawingCtx.strokeStyle = currentColor;
            drawingCtx.lineWidth = lineWidth * 0.5;
            drawingCtx.beginPath();
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            drawingCtx.stroke();
            break;
            
        case 'chalk': // Chalk effect with multiple strokes
            const originalComposite = drawingCtx.globalCompositeOperation;
            drawingCtx.globalCompositeOperation = 'source-over';
            
            for (let i = 0; i < 3; i++) {
                const offset = (Math.random() - 0.5) * lineWidth * 0.8;
                drawingCtx.beginPath();
                drawingCtx.lineWidth = lineWidth * (0.5 + Math.random() * 0.5);
                drawingCtx.moveTo(x1 + offset, y1 + offset);
                drawingCtx.lineTo(x2 + offset, y2 + offset);
                drawingCtx.stroke();
            }
            
            drawingCtx.globalCompositeOperation = originalComposite;
            break;
            
        case 'splatter': // Paint splatter effect with dots
            // Main line
            drawingCtx.beginPath();
            drawingCtx.lineWidth = lineWidth * 0.4;
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            drawingCtx.stroke();
            
            // Add splatter dots
            if (distance > 5) {
                const numSplatters = Math.floor(lineWidth * 0.8);
                const perpendicular = angle + Math.PI / 2;
                
                for (let i = 0; i < numSplatters; i++) {
                    const t = Math.random();
                    const r = (Math.random() - 0.5) * lineWidth * 2;
                    const dotX = x1 + (x2 - x1) * t + Math.cos(perpendicular) * r;
                    const dotY = y1 + (y2 - y1) * t + Math.sin(perpendicular) * r;
                    const dotSize = (Math.random() * lineWidth * 0.5) + 1;
                    
                    drawingCtx.beginPath();
                    drawingCtx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
                    drawingCtx.fill();
                }
            }
            break;
            
        case 'fur': // Fur brush with perpendicular strokes
            // Main line
            drawingCtx.beginPath();
            drawingCtx.lineWidth = lineWidth * 0.7;
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            drawingCtx.stroke();
            
            // Add perpendicular "hairs"
            if (distance > 5) {
                const perpendicular = angle + Math.PI / 2;
                const numHairs = Math.floor(distance / 3);
                const hairLength = lineWidth * 1.2;
                
                for (let i = 0; i < numHairs; i++) {
                    const t = i / numHairs;
                    const ptX = x1 + (x2 - x1) * t;
                    const ptY = y1 + (y2 - y1) * t;
                    const dir = (Math.random() > 0.5) ? 1 : -1;
                    
                    drawingCtx.beginPath();
                    drawingCtx.lineWidth = lineWidth * 0.3;
                    drawingCtx.moveTo(ptX, ptY);
                    drawingCtx.lineTo(
                        ptX + Math.cos(perpendicular) * hairLength * dir,
                        ptY + Math.sin(perpendicular) * hairLength * dir
                    );
                    drawingCtx.stroke();
                }
            }
            break;
            
        case 'dots': // Dotted line effect
            const dotSpacing = lineWidth * 1.2;
            const numDots = Math.max(2, Math.floor(distance / dotSpacing));
            
            for (let i = 0; i < numDots; i++) {
                const t = i / (numDots - 1);
                const dotX = x1 + (x2 - x1) * t;
                const dotY = y1 + (y2 - y1) * t;
                
                drawingCtx.beginPath();
                drawingCtx.arc(dotX, dotY, lineWidth / 2, 0, Math.PI * 2);
                drawingCtx.fillStyle = currentColor;
                drawingCtx.fill();
            }
            break;
            
        case 'neon': // Neon glow effect
            // Implement continuous neon effect to avoid segment breaks
            // Track current stroke path for continuity
            if (currentStrokePath.length >= 2) {
                // Use entire stroke path for continuous neon effect
                const firstPoint = currentStrokePath[0];
                const lastPoint = currentStrokePath[currentStrokePath.length - 1];
                
                // Save context state
                drawingCtx.save();
                
                // Create more pronounced connection between segments
                drawingCtx.lineJoin = 'round';
                drawingCtx.lineCap = 'round';
                
                // Draw continuous outer glow along entire path
                const glowColor = shiftHue(currentColor, 30);
                drawingCtx.shadowColor = glowColor;
                drawingCtx.shadowBlur = lineWidth * 2.5; // Increased blur for better fusion
                
                // Draw the current segment with wider line to ensure fusion
                drawingCtx.beginPath();
                drawingCtx.lineWidth = lineWidth * 0.9; // Slightly wider
                drawingCtx.moveTo(x1, y1);
                drawingCtx.lineTo(x2, y2);
                drawingCtx.stroke();
                
                // Add connecting dots at segment junctions
                if (distance > 0) {
                    drawingCtx.beginPath();
                    drawingCtx.arc(x1, y1, lineWidth * 0.45, 0, Math.PI * 2);
                    drawingCtx.fill();
                }
                
                // Center line with glow for better fusion
                drawingCtx.shadowBlur = lineWidth * 0.8;
                drawingCtx.shadowColor = '#ffffff';
                drawingCtx.beginPath();
                drawingCtx.lineWidth = lineWidth * 0.3;
                drawingCtx.strokeStyle = '#ffffff';
                drawingCtx.moveTo(x1, y1);
                drawingCtx.lineTo(x2, y2);
                drawingCtx.stroke();
                
                // Restore context
                drawingCtx.restore();
            } else {
                // Fallback for first segment
                drawingCtx.shadowColor = shiftHue(currentColor, 30);
                drawingCtx.shadowBlur = lineWidth * 2;
                
                drawingCtx.beginPath();
                drawingCtx.lineWidth = lineWidth * 0.8;
                drawingCtx.moveTo(x1, y1);
                drawingCtx.lineTo(x2, y2);
                drawingCtx.stroke();
                
                // Center line
                drawingCtx.shadowBlur = 0;
                drawingCtx.beginPath();
                drawingCtx.lineWidth = lineWidth * 0.3;
                drawingCtx.strokeStyle = '#ffffff';
                drawingCtx.moveTo(x1, y1);
                drawingCtx.lineTo(x2, y2);
                drawingCtx.stroke();
            }
            
            // Reset
            drawingCtx.strokeStyle = currentColor;
            drawingCtx.shadowBlur = 0;
            break;
            
        case 'pixel': // Pixelated effect
            const pixelSize = Math.max(2, Math.floor(lineWidth / 2));
            const steps = Math.max(2, Math.floor(distance / pixelSize));
            
            for (let i = 0; i < steps; i++) {
                const t = i / steps;
                const pixelX = Math.floor((x1 + (x2 - x1) * t) / pixelSize) * pixelSize;
                const pixelY = Math.floor((y1 + (y2 - y1) * t) / pixelSize) * pixelSize;
                
                drawingCtx.fillStyle = currentColor;
                drawingCtx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
            }
            break;
            
        case 'rainbow': // Rainbow color effect
            if (distance > 0) {
                // Use a consistent time offset for the entire stroke
                // This prevents color jumps between segments
                if (isNewStroke) {
                    strokeStartTime = Date.now();
                    isNewStroke = false;
                    // Start tracking the current stroke
                    currentStrokePath = [{x: x1, y: y1}, {x: x2, y: y2}];
                } else {
                    // Add the current point to our path
                    currentStrokePath.push({x: x2, y: y2});
                }
                
                // Save current state
                drawingCtx.save();
                
                // Enhanced line connection properties
                drawingCtx.lineWidth = lineWidth * 1.1; // Slightly wider for better fusion
                drawingCtx.lineCap = 'round';
                drawingCtx.lineJoin = 'round';
                
                // Use total accumulated path for gradient calculation
                const lastPoint = currentStrokePath[currentStrokePath.length - 1];
                const firstPoint = currentStrokePath[0];
                
                // Create gradient from start of stroke to current position
                const gradient = drawingCtx.createLinearGradient(
                    firstPoint.x, firstPoint.y, lastPoint.x, lastPoint.y
                );
                
                // Use consistent time reference for the whole stroke
                const timeOffset = strokeStartTime / 3000;
                
                // Add more gradient stops for smoother transitions
                for (let i = 0; i <= 10; i++) {
                    const stop = i / 10;
                    gradient.addColorStop(stop, `hsl(${(timeOffset * 360 + i * 36) % 360}, 100%, 50%)`);
                }
                
                // Draw the main line
                drawingCtx.strokeStyle = gradient;
                drawingCtx.beginPath();
                drawingCtx.moveTo(x1, y1);
                drawingCtx.lineTo(x2, y2);
                drawingCtx.stroke();
                
                // Add connecting dots at segment junctions to ensure fusion
                drawingCtx.fillStyle = `hsl(${(timeOffset * 360) % 360}, 100%, 50%)`;
                drawingCtx.beginPath();
                drawingCtx.arc(x1, y1, lineWidth * 0.55, 0, Math.PI * 2); // Slightly larger dots
                drawingCtx.fill();
                
                // Draw small connecting line segments to fill any gaps
                if (currentStrokePath.length > 2) {
                    const prevPoint = currentStrokePath[currentStrokePath.length - 3];
                    const midPoint = currentStrokePath[currentStrokePath.length - 2];
                    
                    // Draw a slightly thicker connecting segment
                    drawingCtx.lineWidth = lineWidth * 1.2;
                    drawingCtx.beginPath();
                    drawingCtx.moveTo(prevPoint.x, prevPoint.y);
                    drawingCtx.lineTo(midPoint.x, midPoint.y);
                    drawingCtx.lineTo(x1, y1);
                    drawingCtx.stroke();
                }
                
                // Restore context
                drawingCtx.restore();
            }
            break;
            
        case 'galaxy': // Galaxy/nebula effect
            if (distance > 0) {
                // Track stroke path for continuity
                if (isNewStroke) {
                    strokeStartTime = Date.now();
                    isNewStroke = false;
                    currentStrokePath = [{x: x1, y: y1}, {x: x2, y: y2}];
                } else {
                    currentStrokePath.push({x: x2, y: y2});
                }
                
                // Save current state
                drawingCtx.save();
                
                // Create a stardust effect with enhanced fusion
                const originalComposite = drawingCtx.globalCompositeOperation;
                drawingCtx.globalCompositeOperation = 'lighter';
                
                // Use consistent color across stroke based on total path
                const timeOffset = strokeStartTime / 2000;
                const colorShift = (timeOffset * 100) % 60 - 30; // Oscillating shift
                
                // Enhanced glow for better fusion
                drawingCtx.shadowColor = shiftHue(currentColor, colorShift - 30);
                drawingCtx.shadowBlur = lineWidth * 2.5; // Increased blur for fusion
                
                // Draw wider connecting dots at segment junctions
                drawingCtx.fillStyle = shiftHue(currentColor, colorShift);
                drawingCtx.beginPath();
                drawingCtx.arc(x1, y1, lineWidth * 0.6, 0, Math.PI * 2);
                drawingCtx.fill();
                
                // Add extra stars/particles at junctions to hide segmentation
                const numParticles = 3 + Math.floor(lineWidth / 2);
                for (let i = 0; i < numParticles; i++) {
                    const particleSize = (Math.random() * lineWidth * 0.4) + (lineWidth * 0.2);
                    const offsetX = (Math.random() - 0.5) * lineWidth * 1.2;
                    const offsetY = (Math.random() - 0.5) * lineWidth * 1.2;
                    
                    drawingCtx.beginPath();
                    drawingCtx.arc(x1 + offsetX, y1 + offsetY, particleSize, 0, Math.PI * 2);
                    drawingCtx.fillStyle = shiftHue(currentColor, colorShift + Math.random() * 50 - 25);
                    drawingCtx.fill();
                }
                
                // Draw the main line with consistent color but thicker for fusion
                drawingCtx.beginPath();
                drawingCtx.lineWidth = lineWidth * 1.0; // Slightly thicker
                drawingCtx.lineCap = 'round';
                drawingCtx.lineJoin = 'round';
                drawingCtx.strokeStyle = shiftHue(currentColor, colorShift + 30);
                drawingCtx.moveTo(x1, y1);
                drawingCtx.lineTo(x2, y2);
                drawingCtx.stroke();
                
                // Add connecting segment for previous points to ensure fusion
                if (currentStrokePath.length > 2) {
                    const prevPoint = currentStrokePath[currentStrokePath.length - 3];
                    const midPoint = currentStrokePath[currentStrokePath.length - 2];
                    
                    // Draw a slightly thicker connecting bridge
                    drawingCtx.lineWidth = lineWidth * 1.1;
                    drawingCtx.beginPath();
                    drawingCtx.moveTo(prevPoint.x, prevPoint.y);
                    drawingCtx.lineTo(midPoint.x, midPoint.y);
                    drawingCtx.lineTo(x1, y1);
                    drawingCtx.stroke();
                }
                
                // Add some stars along the path
                if (Math.random() > 0.7) {
                    const starX = x1 + Math.random() * (x2 - x1);
                    const starY = y1 + Math.random() * (y2 - y1);
                    const starSize = (Math.random() * lineWidth * 0.5) + 1;
                    
                    drawingCtx.beginPath();
                    drawingCtx.fillStyle = '#ffffff';
                    drawingCtx.arc(starX, starY, starSize, 0, Math.PI * 2);
                    drawingCtx.fill();
                }
                
                // Reset
                drawingCtx.globalCompositeOperation = originalComposite;
                drawingCtx.shadowBlur = 0;
                drawingCtx.strokeStyle = currentColor;
                
                // Restore context to prevent issues
                drawingCtx.restore();
            }
            break;
            
        default:
            // Default to round brush if unknown
            drawingCtx.beginPath();
            drawingCtx.moveTo(x1, y1);
            drawingCtx.lineTo(x2, y2);
            drawingCtx.stroke();
    }
}

// Update UI to show smoothing status
// Initialize scaling preview canvas
function initScalingPreview() {
    if (!scalingPreviewCanvas) return;
    
    const previewCtx = scalingPreviewCanvas.getContext('2d');
    // Clear the canvas
    previewCtx.clearRect(0, 0, scalingPreviewCanvas.width, scalingPreviewCanvas.height);
    
    // Set background
    previewCtx.fillStyle = '#222';
    previewCtx.fillRect(0, 0, scalingPreviewCanvas.width, scalingPreviewCanvas.height);
}

// Animation frame for the scaling preview
let previewAnimationFrame;

// Start the scaling preview animation
function startScalingPreview() {
    if (scalingPreviewActive) return;
    scalingPreviewActive = true;
    
    // Initialize first frame
    initScalingPreview();
    
    // Variables for the preview animation
    let time = 0;
    const previewCtx = scalingPreviewCanvas.getContext('2d');
    const width = scalingPreviewCanvas.width;
    const height = scalingPreviewCanvas.height;
    const centerY = height / 2;
    
    // Custom animation loop for each scaling mode
    function animatePreview() {
        // Clear canvas
        previewCtx.clearRect(0, 0, width, height);
        previewCtx.fillStyle = '#222';
        previewCtx.fillRect(0, 0, width, height);
        
        // Draw grid lines
        previewCtx.strokeStyle = '#333';
        previewCtx.lineWidth = 1;
        previewCtx.beginPath();
        for (let i = 0; i < width; i += 20) {
            previewCtx.moveTo(i, 0);
            previewCtx.lineTo(i, height);
        }
        for (let i = 0; i < height; i += 20) {
            previewCtx.moveTo(0, i);
            previewCtx.lineTo(width, i);
        }
        previewCtx.stroke();
        
        // Animation parameters
        time += 0.03;
        const period = 2; // seconds per cycle
        const phase = (time % period) / period;
        
        // Draw line based on current scaling mode
        previewCtx.strokeStyle = '#4CAF50';
        previewCtx.lineCap = 'round';
        previewCtx.lineJoin = 'round';
        
        // Start position
        let startX = 30;
        let endX = width - 30;
        
        // Draw different previews based on the mode
        switch (currentScalingMode) {
            case 'depth':
                // Simulate hand moving in and out of screen
                const depthWidth = minLineWidth + (maxLineWidth - minLineWidth) * Math.abs(Math.sin(phase * Math.PI * 2));
                previewCtx.lineWidth = depthWidth;
                previewCtx.beginPath();
                previewCtx.moveTo(startX, centerY);
                previewCtx.lineTo(endX, centerY);
                previewCtx.stroke();
                
                // Label
                previewCtx.fillStyle = '#aaa';
                previewCtx.font = '10px Arial';
                previewCtx.textAlign = 'center';
                previewCtx.fillText('Move hand forward/back to change thickness', width/2, height - 10);
                break;
                
            case 'speed':
                // Simulate varied drawing speed
                previewCtx.beginPath();
                for (let x = startX; x <= endX; x += 2) {
                    // Calculate point on sine wave
                    const progress = (x - startX) / (endX - startX);
                    const y = centerY + Math.sin(progress * Math.PI * 4 + time * 5) * 15;
                    
                    // Calculate speed at this point
                    const speedFactor = Math.abs(Math.cos(progress * Math.PI * 4 + time * 5));
                    const speedWidth = maxLineWidth - (maxLineWidth - minLineWidth) * speedFactor;
                    
                    if (x === startX) {
                        previewCtx.moveTo(x, y);
                    } else {
                        previewCtx.lineTo(x, y);
                    }
                    
                    // We can't change lineWidth in the middle of a path, so we'll draw points
                    if (x % 8 === 0) {
                        previewCtx.stroke();
                        previewCtx.beginPath();
                        previewCtx.lineWidth = speedWidth;
                        previewCtx.moveTo(x, y);
                    }
                }
                previewCtx.stroke();
                
                // Label
                previewCtx.fillStyle = '#aaa';
                previewCtx.font = '10px Arial';
                previewCtx.textAlign = 'center';
                previewCtx.fillText('Move faster for thinner lines', width/2, height - 10);
                break;
                
            case 'hybrid':
                // Simulate both depth and speed
                previewCtx.beginPath();
                for (let x = startX; x <= endX; x += 2) {
                    // Calculate point on wave
                    const progress = (x - startX) / (endX - startX);
                    const depthCycle = Math.sin(time * 2) * 0.5 + 0.5; // Slow depth cycle
                    const y = centerY + Math.sin(progress * Math.PI * 3 + time * 3) * 15;
                    
                    // Calculate hybrid width
                    const speedFactor = Math.abs(Math.cos(progress * Math.PI * 3 + time * 3)) * 0.7;
                    const depthFactor = depthCycle * 0.6;
                    const hybridWidth = minLineWidth + (maxLineWidth - minLineWidth) * (1 - (speedFactor + depthFactor) / 2);
                    
                    if (x === startX) {
                        previewCtx.moveTo(x, y);
                    } else {
                        previewCtx.lineTo(x, y);
                    }
                    
                    // Update line width periodically
                    if (x % 8 === 0) {
                        previewCtx.stroke();
                        previewCtx.beginPath();
                        previewCtx.lineWidth = hybridWidth;
                        previewCtx.moveTo(x, y);
                    }
                }
                previewCtx.stroke();
                
                // Label
                previewCtx.fillStyle = '#aaa';
                previewCtx.font = '10px Arial';
                previewCtx.textAlign = 'center';
                previewCtx.fillText('Combines depth and speed for dynamic lines', width/2, height - 10);
                break;
                
            case 'pressure':
                // Simulate pressure sensitivity
                previewCtx.beginPath();
                let pressure = 0;
                let pressureDir = 1;
                
                for (let x = startX; x <= endX; x += 2) {
                    // Calculate pressure
                    pressure += 0.02 * pressureDir;
                    if (pressure > 1 || pressure < 0.1) {
                        pressureDir *= -1;
                        pressure = Math.max(0.1, Math.min(1, pressure));
                    }
                    
                    // Calculate width based on pressure
                    const pressureWidth = minLineWidth + (maxLineWidth - minLineWidth) * pressure;
                    
                    // Gentle wave pattern
                    const progress = (x - startX) / (endX - startX);
                    const y = centerY + Math.sin(progress * Math.PI * 2 + time) * 10;
                    
                    if (x === startX) {
                        previewCtx.moveTo(x, y);
                    } else {
                        previewCtx.lineTo(x, y);
                    }
                    
                    // Update line width
                    if (x % 6 === 0) {
                        previewCtx.stroke();
                        previewCtx.beginPath();
                        previewCtx.lineWidth = pressureWidth;
                        previewCtx.moveTo(x, y);
                    }
                }
                previewCtx.stroke();
                
                // Label
                previewCtx.fillStyle = '#aaa';
                previewCtx.font = '10px Arial';
                previewCtx.textAlign = 'center';
                previewCtx.fillText('Simulates pressure sensitivity with natural variation', width/2, height - 10);
                break;
                
            case 'calligraphy':
                // Simulate calligraphy effect with direction-based thickness
                const angle = time * 30 % 180; // Rotate through angles
                const radians = angle * Math.PI / 180;
                
                // Draw a circular path to show all directions
                const radius = 30;
                const centerX = width / 2;
                
                for (let a = 0; a < Math.PI * 2; a += 0.1) {
                    const x = centerX + Math.cos(a) * radius;
                    const y = centerY + Math.sin(a) * radius;
                    
                    // Direction
                    const dir = { x: Math.cos(a), y: Math.sin(a) };
                    
                    // Calculate angle between movement and calligraphy angle
                    let moveAngle = Math.atan2(dir.y, dir.x) * 180 / Math.PI;
                    moveAngle = ((moveAngle + 180) % 180);
                    
                    const angleDiff = Math.min(
                        Math.abs(moveAngle - angle),
                        Math.abs(moveAngle - (angle + 180) % 180)
                    );
                    
                    // Perpendicular = thin, parallel = thick
                    const angleFactor = angleDiff / 90;
                    const width = minLineWidth + (maxLineWidth - minLineWidth) * (1 - angleFactor);
                    
                    // Draw dot with calculated width
                    previewCtx.beginPath();
                    previewCtx.arc(x, y, width/2, 0, Math.PI * 2);
                    previewCtx.fill();
                }
                
                // Draw pen orientation
                previewCtx.strokeStyle = '#fff';
                previewCtx.lineWidth = 1;
                previewCtx.beginPath();
                previewCtx.moveTo(
                    centerX - Math.cos(radians) * 40,
                    centerY - Math.sin(radians) * 40
                );
                previewCtx.lineTo(
                    centerX + Math.cos(radians) * 40,
                    centerY + Math.sin(radians) * 40
                );
                previewCtx.stroke();
                
                // Label
                previewCtx.fillStyle = '#aaa';
                previewCtx.font = '10px Arial';
                previewCtx.textAlign = 'center';
                previewCtx.fillText('Line thickness varies with direction like a calligraphy pen', width/2, height - 10);
                break;
        }
        
        if (scalingPreviewActive) {
            previewAnimationFrame = requestAnimationFrame(animatePreview);
        }
    }
    
    // Start animation
    previewAnimationFrame = requestAnimationFrame(animatePreview);
}

// Stop the scaling preview animation
function stopScalingPreview() {
    scalingPreviewActive = false;
    if (previewAnimationFrame) {
        cancelAnimationFrame(previewAnimationFrame);
    }
}

function updateSmoothingUI() {
    // Create or update smoothing indicator
    let indicator = document.getElementById('smoothing-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'smoothing-indicator';
        indicator.style.position = 'absolute';
        indicator.style.top = '10px';
        indicator.style.left = '10px';
        indicator.style.background = 'rgba(0,0,0,0.5)';
        indicator.style.color = 'white';
        indicator.style.padding = '5px 10px';
        indicator.style.borderRadius = '5px';
        indicator.style.fontFamily = 'Arial, sans-serif';
        indicator.style.fontSize = '12px';
        indicator.style.zIndex = '100';
        document.body.appendChild(indicator);
    }
    
    // Update the smoothing indicator text and color
    indicator.textContent = smoothingEnabled ? 
        `Smoothing: ON (${Math.round(smoothingStrength * 100)}%)` : 
        'Smoothing: OFF';
    indicator.style.backgroundColor = smoothingEnabled ? 'rgba(0,128,0,0.5)' : 'rgba(128,0,0,0.5)';
    
    // Update slider value display
    if (smoothingValue) {
        smoothingValue.textContent = `${Math.round(smoothingStrength * 100)}%`;
    }
    
    // Update toggle checkbox
    if (smoothingToggle) {
        smoothingToggle.checked = smoothingEnabled;
    }
    
    // Update slider position
    if (smoothingSlider) {
        smoothingSlider.value = Math.round(smoothingStrength * 100);
    }
}

// Check if index finger is interacting with any UI buttons
function checkButtonInteractions() {
    for (const button of buttonPositions) {
        if (
            indexFingerTip.x >= button.x && 
            indexFingerTip.x <= button.x + button.width &&
            indexFingerTip.y >= button.y && 
            indexFingerTip.y <= button.y + button.height
        ) {
            // Button was "pressed"
            handleButtonPress(button.id);
            
            // Add visual feedback on the canvas
            handCtx.beginPath();
            handCtx.rect(button.x, button.y, button.width, button.height);
            handCtx.strokeStyle = '#FFFFFF';
            handCtx.lineWidth = 3;
            handCtx.stroke();
            
            // Prevent multiple activations by adding a small delay
            setTimeout(() => {}, 500);
            
            break;
        }
    }
}

// Toggle smoothing controls visibility
function toggleSmoothingControls() {
    smoothingControls.classList.toggle('hidden');
    colorWheel.classList.add('hidden');
    sizeSelector.classList.add('hidden');
    shapeSelector.classList.add('hidden');
    
    // Position the smoothing controls
    const smoothBtnRect = smoothBtn.getBoundingClientRect();
    smoothingControls.style.left = `${smoothBtnRect.left}px`;
    smoothingControls.style.top = `${smoothBtnRect.bottom + 10}px`;
}

// Handle button press events
function handleButtonPress(buttonId) {
    switch (buttonId) {
        case 'save-btn':
            saveDrawing();
            break;
        case 'color-btn':
            toggleColorWheel();
            break;
        case 'size-btn':
            toggleSizeSelector();
            break;
        case 'shape-btn':
            toggleShapeSelector();
            break;
        case 'smooth-btn':
            toggleSmoothingControls();
            break;
        case 'clear-btn':
            clearCanvas();
            break;
    }
}

// Save the drawing as an image
function saveDrawing() {
    // Create a temporary canvas to combine video and drawing
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasWidth;
    tempCanvas.height = canvasHeight;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Draw video frame
    tempCtx.drawImage(video, 0, 0, canvasWidth, canvasHeight);
    
    // Draw the drawing on top
    tempCtx.drawImage(drawingCanvas, 0, 0);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `air-drawing-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
}

// Clear the canvas
function clearCanvas() {
    drawingCtx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Toggle color wheel visibility
function toggleColorWheel() {
    colorWheel.classList.toggle('hidden');
    sizeSelector.classList.add('hidden');
    shapeSelector.classList.add('hidden');
    smoothingControls.classList.add('hidden');
    
    // Position the color wheel
    const colorBtnRect = colorBtn.getBoundingClientRect();
    colorWheel.style.left = `${colorBtnRect.left}px`;
    colorWheel.style.top = `${colorBtnRect.bottom + 10}px`;
}

// Toggle size selector visibility
function toggleSizeSelector() {
    sizeSelector.classList.toggle('hidden');
    colorWheel.classList.add('hidden');
    shapeSelector.classList.add('hidden');
    smoothingControls.classList.add('hidden');
    
    // Position the size selector
    const sizeBtnRect = sizeBtn.getBoundingClientRect();
    sizeSelector.style.left = `${sizeBtnRect.left}px`;
    sizeSelector.style.top = `${sizeBtnRect.bottom + 10}px`;
}

// Toggle shape selector visibility
function toggleShapeSelector() {
    shapeSelector.classList.toggle('hidden');
    colorWheel.classList.add('hidden');
    sizeSelector.classList.add('hidden');
    smoothingControls.classList.add('hidden');
    scalingSelector.classList.add('hidden');
    
    // Position the shape selector
    const shapeBtnRect = shapeBtn.getBoundingClientRect();
    shapeSelector.style.left = `${shapeBtnRect.left}px`;
    shapeSelector.style.top = `${shapeBtnRect.bottom + 10}px`;
    
    // Ensure the first category is active when opening
    if (!shapeSelector.classList.contains('hidden')) {
        // Make sure only one brush category is active
        brushCategories.forEach(category => {
            if (category.dataset.category === 'artistic') {
                category.classList.add('active');
            } else {
                category.classList.remove('active');
            }
        });
        
        // Show only the active category brushes
        document.querySelectorAll('.brush-options').forEach(options => {
            if (options.classList.contains('artistic')) {
                options.classList.remove('hidden');
            } else {
                options.classList.add('hidden');
            }
        });
    }
}

// Toggle scaling selector visibility
function toggleScalingSelector() {
    scalingSelector.classList.toggle('hidden');
    colorWheel.classList.add('hidden');
    sizeSelector.classList.add('hidden');
    shapeSelector.classList.add('hidden');
    smoothingControls.classList.add('hidden');
    
    // Position the scaling selector
    const scalingBtnRect = scalingBtn.getBoundingClientRect();
    scalingSelector.style.left = `${scalingBtnRect.left}px`;
    scalingSelector.style.top = `${scalingBtnRect.bottom + 10}px`;
    
    // Start preview animation if the selector is visible
    if (!scalingSelector.classList.contains('hidden')) {
        startScalingPreview();
    } else {
        stopScalingPreview();
    }
}

// Calculate line width based on different scaling modes
function calculateLineWidth(x, y, z, prevX, prevY) {
    // Calculate movement speed
    const dx = x - prevX;
    const dy = y - prevY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = distance;
    
    // Update speed history for smoother speed calculations
    speedHistory.push(speed);
    if (speedHistory.length > maxSpeedHistorySize) {
        speedHistory.shift();
    }
    
    // Get average speed
    const avgSpeed = speedHistory.reduce((sum, s) => sum + s, 0) / speedHistory.length;
    lastSpeed = avgSpeed;
    
    // Update direction for calligraphy mode
    if (distance > 0) {
        lastDirection = { x: dx / distance, y: dy / distance };
    }
    
    // Update simulated pressure for pressure mode
    if (currentScalingMode === 'pressure') {
        // Change pressure direction occasionally for natural effect
        if (Math.random() < 0.03) { // 3% chance to change direction
            pressureDirection *= -1;
        }
        
        // Update pressure value
        lastPressure += pressureChangeRate * pressureDirection;
        
        // Keep pressure between 0.1 and 1
        if (lastPressure > 1) {
            lastPressure = 1;
            pressureDirection = -1;
        } else if (lastPressure < 0.1) {
            lastPressure = 0.1;
            pressureDirection = 1;
        }
    }
    
    // Base size
    let size = currentSize;
    
    // Apply different scaling modes
    switch (currentScalingMode) {
        case 'depth':
            // Z-axis (depth) based scaling, ranges from 0 to 1
            // Normalize z to be between 0 and 1 (with 0 being closest to camera)
            const normalizedZ = Math.max(0, Math.min(1, (z + 0.1) * depthSensitivity));
            size = minLineWidth + (maxLineWidth - minLineWidth) * (1 - normalizedZ);
            break;
            
        case 'speed':
            // Speed-based scaling: faster = thinner lines
            // Map speed (typically 0-50) to a normalized value (0-1)
            const normalizedSpeed = Math.min(1, avgSpeed / (50 * speedSensitivity));
            size = maxLineWidth - (maxLineWidth - minLineWidth) * normalizedSpeed;
            break;
            
        case 'hybrid':
            // Combine speed and depth for a dynamic effect
            const speedFactor = Math.min(1, avgSpeed / (50 * speedSensitivity));
            const depthFactor = Math.max(0, Math.min(1, (z + 0.1) * depthSensitivity));
            
            // Mix the two factors with a bias toward depth at slow speeds
            const hybridFactor = speedFactor * 0.6 + (1 - depthFactor) * 0.4;
            size = minLineWidth + (maxLineWidth - minLineWidth) * (1 - hybridFactor);
            break;
            
        case 'pressure':
            // Simulated pressure sensitivity
            size = minLineWidth + (maxLineWidth - minLineWidth) * lastPressure;
            break;
            
        case 'calligraphy':
            // Direction-based thickness (calligraphy pen effect)
            // Calculate angle of movement
            let angle = Math.atan2(lastDirection.y, lastDirection.x) * 180 / Math.PI;
            // Normalize to 0-180
            angle = ((angle + 180) % 180);
            
            // Use a fixed reference angle for more stability (0 = horizontal)
            const referenceAngle = calligraphyAngle; // 45 degrees
            
            // Calculate the smallest angular difference
            // This finds the closest alignment between the pen angle and direction
            const angleDiff = Math.min(
                Math.abs((angle - referenceAngle + 180) % 180 - 90),
                Math.abs((angle - referenceAngle) % 180 - 90)
            );
            
            // Apply a smoother mapping curve with cubic easing
            // This creates more gradual transitions between thick and thin
            const normalizedDiff = Math.min(90, Math.max(0, angleDiff)) / 90;
            const easing = 1 - Math.pow(normalizedDiff, 3); // Cubic easing for smoother transitions
            
            // Calculate size with more contrast between thick and thin
            const minCalligraphyWidth = minLineWidth * 1.5; // Not too thin
            const maxCalligraphyWidth = maxLineWidth * 1.2; // Slightly thicker for emphasis
            size = minCalligraphyWidth + (maxCalligraphyWidth - minCalligraphyWidth) * easing;
            break;
    }
    
    return Math.max(minLineWidth, Math.min(maxLineWidth, size));
}

// Set up event listeners
function setupEventListeners() {
    // Palette tab switching
    const paletteTabs = document.querySelectorAll('.palette-tab');
    paletteTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            paletteTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all color palettes
            document.querySelectorAll('.color-palette').forEach(palette => {
                palette.classList.add('hidden');
            });
            
            // Show selected palette
            const paletteToShow = tab.dataset.palette;
            document.querySelector(`.color-palette.${paletteToShow}`).classList.remove('hidden');
        });
    });
    
    // Color options
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            currentColor = option.dataset.color;
            colorWheel.classList.add('hidden');
            
            // Remove selected class from all colors
            colorOptions.forEach(opt => opt.style.border = '2px solid #555');
            
            // Add selected class to clicked color
            option.style.border = '3px solid #fff';
        });
    });
    
    // Add keyboard shortcut for toggling smoothing
    document.addEventListener('keydown', (event) => {
        if (event.key === 's' || event.key === 'S') {
            smoothingEnabled = !smoothingEnabled;
            updateSmoothingUI();
            
            // Show feedback
            const message = document.createElement('div');
            message.textContent = smoothingEnabled ? 'Smoothing: ON' : 'Smoothing: OFF';
            message.style.position = 'absolute';
            message.style.bottom = '20px';
            message.style.left = '50%';
            message.style.transform = 'translateX(-50%)';
            message.style.background = 'rgba(0,0,0,0.7)';
            message.style.color = 'white';
            message.style.padding = '10px 20px';
            message.style.borderRadius = '5px';
            message.style.fontFamily = 'Arial, sans-serif';
            message.style.zIndex = '100';
            document.body.appendChild(message);
            
            // Remove after 2 seconds
            setTimeout(() => {
                document.body.removeChild(message);
            }, 2000);
        }
    });
    
    // Set up smoothing controls
    if (smoothingSlider) {
        // Update smoothing strength when slider changes
        smoothingSlider.addEventListener('input', () => {
            // Convert from percentage (0-100) to decimal (0-1)
            smoothingStrength = smoothingSlider.value / 100;
            updateSmoothingUI();
        });
    }
    
    if (smoothingToggle) {
        // Toggle smoothing on/off with checkbox
        smoothingToggle.addEventListener('change', () => {
            smoothingEnabled = smoothingToggle.checked;
            updateSmoothingUI();
        });
    }
    
    // Clicking smoothing button
    smoothBtn.addEventListener('click', toggleSmoothingControls);
    
    // Size options
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            currentSize = parseInt(option.dataset.size);
            sizeSelector.classList.add('hidden');
        });
    });
    
    // Brush category options
    brushCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Update active state for categories
            brushCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');
            
            // Show the selected category's brushes
            const selectedCategory = category.dataset.category;
            document.querySelectorAll('.brush-options').forEach(options => {
                if (options.classList.contains(selectedCategory)) {
                    options.classList.remove('hidden');
                } else {
                    options.classList.add('hidden');
                }
            });
        });
    });
    
    // Brush options
    brushOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Update active state for brushes
            brushOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Set current brush shape
            const brushShape = option.dataset.shape;
            currentShape = brushShape;
            
            // Show feedback message
            const message = document.createElement('div');
            message.textContent = `Brush: ${option.querySelector('.brush-name').textContent}`;
            message.style.position = 'absolute';
            message.style.bottom = '20px';
            message.style.left = '50%';
            message.style.transform = 'translateX(-50%)';
            message.style.padding = '10px 20px';
            message.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            message.style.color = 'white';
            message.style.borderRadius = '20px';
            message.style.zIndex = '1000';
            document.body.appendChild(message);
            
            // Remove message after 2 seconds
            setTimeout(() => {
                document.body.removeChild(message);
            }, 2000);
            
            // Hide the selector
            shapeSelector.classList.add('hidden');
        });
    });
    
    // Button events for mouse interaction
    saveBtn.addEventListener('click', saveDrawing);
    colorBtn.addEventListener('click', toggleColorWheel);
    sizeBtn.addEventListener('click', toggleSizeSelector);
    shapeBtn.addEventListener('click', toggleShapeSelector);
    clearBtn.addEventListener('click', clearCanvas);
    scalingBtn.addEventListener('click', toggleScalingSelector);
    
    // Scaling mode options
    scalingOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all scaling options
            scalingOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to the clicked option
            this.classList.add('active');
            
            // Get the scaling mode from the data attribute
            currentScalingMode = this.getAttribute('data-scaling');
            
            // Update preview to show the new mode
            if (scalingPreviewActive) {
                stopScalingPreview();
                startScalingPreview();
            }
            
            // Show feedback
            const message = document.createElement('div');
            message.textContent = `Scaling Mode: ${this.querySelector('.scaling-name').textContent}`;
            message.style.position = 'absolute';
            message.style.bottom = '20px';
            message.style.left = '50%';
            message.style.transform = 'translateX(-50%)';
            message.style.background = 'rgba(0,0,0,0.7)';
            message.style.color = 'white';
            message.style.padding = '10px 20px';
            message.style.borderRadius = '5px';
            message.style.fontFamily = 'Arial, sans-serif';
            message.style.zIndex = '100';
            document.body.appendChild(message);
            
            // Remove after 2 seconds
            setTimeout(() => {
                document.body.removeChild(message);
            }, 2000);
        });
    });
    
    // Hide selectors when clicking elsewhere
    document.addEventListener('click', (event) => {
        if (!event.target.closest('#color-wheel') && !event.target.closest('#color-btn')) {
            colorWheel.classList.add('hidden');
        }
        if (!event.target.closest('#size-selector') && !event.target.closest('#size-btn')) {
            sizeSelector.classList.add('hidden');
        }
        if (!event.target.closest('#shape-selector') && !event.target.closest('#shape-btn')) {
            shapeSelector.classList.add('hidden');
        }
        if (!event.target.closest('#scaling-selector') && !event.target.closest('#scaling-btn')) {
            scalingSelector.classList.add('hidden');
            stopScalingPreview();
        }
        if (!event.target.closest('#smoothing-controls') && !event.target.closest('#smooth-btn')) {
            smoothingControls.classList.add('hidden');
        }
    });
    
    // Resize handler
    window.addEventListener('resize', () => {
        setupCanvases();
    });
    
    // Wait for video metadata to setup canvas dimensions
    video.addEventListener('loadedmetadata', setupCanvases);
}

// Initialize the application
function init() {
    setupEventListeners();
    initHandTracking();
    updateSmoothingUI();
}

// Start the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);

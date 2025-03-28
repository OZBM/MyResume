# Air Drawing with Hand Tracking

This web application allows users to draw in the air using their hand, tracked via their webcam. The app uses MediaPipe's Hand Tracking API to detect hand landmarks and enables drawing with finger movements.

## Features

- **Camera-based Hand Tracking**: Uses your webcam to detect and track hand movements in real-time
- **Air Drawing**: Draw by moving your index finger in the air
- **Interactive Controls**: Use your finger to interact with on-screen buttons
- **Save Drawings**: Save your drawings as PNG images
- **Color Selection**: Choose from a color wheel to change the drawing color
- **Line Size Adjustment**: Change the thickness of the drawing line
- **Line Shape Options**: Select different drawing shapes (round, square, triangle)
- **Clear Canvas**: Easily clear the drawing and start fresh

## How to Use

1. **Allow Camera Access**: When prompted, allow the application to access your camera
2. **Hand Gestures**:
   - **Draw**: Extend your index finger and move it around
   - **Stop Drawing**: Lower your index finger or bring your thumb close to it
   - **Interact with Buttons**: Extend your index finger and bring your thumb close to it, then hover over buttons

3. **Buttons**:
   - **Save**: Save your drawing as a PNG image
   - **Color**: Open the color wheel to select a different color
   - **Size**: Change the thickness of the drawing line
   - **Shape**: Change the shape of the drawing line
   - **Clear**: Clear the canvas

## Technical Details

This application uses:
- **MediaPipe Hands**: For hand landmark detection
- **HTML5 Canvas**: For drawing
- **Modern JavaScript**: For application logic
- **CSS3**: For styling and responsive design

## Running the Application

Simply serve the files using any local web server and open it in a browser that has webcam access.

Example using Python's built-in HTTP server:
```
python -m http.server
```

Then open `http://localhost:8000` in your browser.

## Browser Compatibility

This application works best in modern browsers with webcam access and support for the MediaPipe libraries:
- Chrome (recommended)
- Firefox
- Edge
- Safari (may have limited compatibility)

## Privacy Note

This application processes all video locally in your browser. No video data is sent to any server.

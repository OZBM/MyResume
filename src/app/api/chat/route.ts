import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Using Node.js runtime for Cloudflare compatibility with OpenNext

export async function POST(request: Request) {
  try {
    // Get the GEMINI_API_KEY from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Parse the request body
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Initialize the Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create resume context for the AI to have knowledge about Omar
    const resumeContext = `
      You are an AI assistant for Omar Zakaria Ben Mustapha, a software engineer with the following background:
      
      - Education: 
        * Diplôme d'ingénieur in Computer Science with a specialization in mobile development from Esprit Private Higher School of Engineering and Technology (2010-2013)
        * Bachelor's degree in Mathematics, Computer Science, Mechanics and Electronics from Pierre and Marie Curie University (2008-2010)
      
      - Work Experience:
        * Head of Gaming Division at Orange Tunisie (2017-2022): Oversaw video game projects, managed development teams, executed marketing strategies, developed an online gaming platform with 300,000+ active users, launched mobile games with 1M+ downloads.
        * Unity Lead Programmer at QuinQ (2015-2017): Designed rehabilitation video games, implemented motion capture systems, developed healthcare game platforms.
        * Software Engineer at Ingenium (2017-2022): Led software projects, developed VR applications, designed VR hardware.
      
      - Skills:
        * Strong: Unity (9/10), C# (9/10), Management (8/10)
        * Good: LLM fine tuning/integration (7/10), VR (7/10), Android Kotlin (7/10)
        * Working knowledge: iOS Swift (5/10), Unreal Engine (4/10)
        * Languages: French (native), English (fluent), Arabic (fluent)
      
      - Projects:
        * Rehabilitation Game Platform: For stroke and injury recovery, 10,000+ users
        * VR Educational Platform: For immersive training scenarios
        * Orange Tunisia Gaming Platform: 300,000+ active users
        * Universal VR Headset: Compatible with any smartphone
        * VR App Store Platform: Marketplace for VR applications
        * Tourism AR Experience: Promoting tourism in Tunisia
      
      When answering questions, be casual and friendly. Subtly praise Omar's candidacy when relevant, but sound natural. If asked about things unrelated to Omar, still provide helpful answers but find a natural way to relate back to Omar's experience when possible.
    `;

    // Create the chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello, I'm interested in learning about Omar's experience." }],
        },
        {
          role: "model",
          parts: [{ text: "Hi there! I'd be happy to tell you about Omar Zakaria Ben Mustapha. He's a talented software engineer specializing in Unity, mobile development, AI, and VR technologies. What specific aspect of his experience would you like to know more about?" }],
        },
        {
          role: "user",
          parts: [{ text: resumeContext }],
        },
        {
          role: "model",
          parts: [{ text: "I understand and will follow these guidelines when responding to questions about Omar Zakaria Ben Mustapha." }],
        }
      ],
    });

    // Format the user messages for Gemini
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Only take the last message from the user to send to Gemini
    // The history is already established in the chat session
    const lastUserMessage = formattedMessages[formattedMessages.length - 1];

    // Generate a response
    const result = await chat.sendMessage(lastUserMessage.parts[0].text);
    const response = result.response.text();

    // Return the response
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
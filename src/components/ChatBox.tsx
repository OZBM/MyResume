"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useChatStore, Message } from "@/store/chatStore";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

const ChatBox = () => {
  const { messages, isLoading, addMessage, setIsLoading } = useChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add initial greeting if no messages exist
    if (messages.length === 0) {
      addMessage({
        role: "assistant",
        content: "Hi there! I'm Omar's AI assistant. Ask me anything about Omar's experience, skills, or projects. I can also help with any other questions you might have!",
      });
    }
  }, [messages, addMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Add user message to chat
    addMessage({
      role: "user",
      content: userMessage,
    });

    // Set loading state
    setIsLoading(true);

    try {
      // Import the Gemini API client dynamically to avoid SSR issues
      const { GoogleGenerativeAI } = await import("@google/generative-ai");

      // Initialize the Gemini AI with the API key from environment variables
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("Gemini API key not configured");
      }

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
      const formattedMessages = messages.map((msg: Message) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      // Send the message to Gemini
      const result = await chat.sendMessage(userMessage);
      const response = result.response.text();

      // Add assistant message to chat
      addMessage({
        role: "assistant",
        content: response,
      });
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground"> {/* Use card background/text */}
      {/* Chat header - Use primary color */}
      <div className="bg-primary dark:bg-primary-dark text-primary-foreground px-4 py-3 rounded-t-lg flex-shrink-0">
        <div className="flex items-center">
          <FaRobot className="mr-2" />
          <h3 className="font-semibold text-sm">Chat with Omar's AI Assistant</h3> {/* Slightly smaller text */}
        </div>
      </div>

      {/* Chat messages - Use background color */}
      <div className="flex-1 overflow-y-auto p-4 bg-background dark:bg-dark-bg scrollbar-custom">
        <div className="space-y-4">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Icon container styles */}
                <div
                  className={`rounded-full p-2 flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-primary dark:bg-primary-dark text-primary-foreground" // User icon bg/text
                      : "bg-muted text-muted-foreground" // Assistant icon bg/text
                  }`}
                >
                  {message.role === "user" ? (
                    <FaUser size={14} />
                  ) : (
                    <FaRobot size={14} />
                  )}
                </div>
                {/* Message bubble styles */}
                <div
                  className={`rounded-lg px-3 py-2 ${ // Slightly less padding
                    message.role === "user"
                      ? "bg-primary dark:bg-primary-dark text-primary-foreground" // User message bg/text
                      : "bg-muted text-muted-foreground" // Assistant message bg/text
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p> {/* Text color inherited */}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator styles */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <div className="rounded-full p-2 bg-muted text-muted-foreground flex-shrink-0">
                  <FaRobot size={14} />
                </div>
                <div className="rounded-lg px-3 py-2 bg-muted text-muted-foreground">
                  <div className="flex space-x-1 items-center h-5"> {/* Ensure height consistency */}
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-pulse delay-100"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error message styles */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive p-2 rounded text-sm">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input area styles */}
      <form onSubmit={handleSubmit} className="p-3 bg-muted dark:bg-dark-card/50 border-t border-border rounded-b-lg flex-shrink-0">
        <div className="flex items-center">
          {/* Input field styles */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-l-md border border-border bg-background text-foreground dark:bg-dark-bg dark:text-dark-fg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            disabled={isLoading}
          />
          {/* Send button styles */}
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 rounded-r-md bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
          >
            <FaPaperPlane size={16} /> {/* Slightly larger icon */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;

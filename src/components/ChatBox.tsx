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
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", content: userMessage },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      // Add assistant message to chat
      addMessage({
        role: "assistant",
        content: data.response,
      });
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-primary text-white px-4 py-3 rounded-t-lg">
        <div className="flex items-center">
          <FaRobot className="mr-2" />
          <h3 className="font-semibold">Chat with Omar's AI Assistant</h3>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800 scrollbar-custom">
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
                <div
                  className={`rounded-full p-2 ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {message.role === "user" ? (
                    <FaUser size={14} />
                  ) : (
                    <FaRobot size={14} />
                  )}
                </div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <div className="rounded-full p-2 bg-gray-200 dark:bg-gray-700">
                  <FaRobot size={14} />
                </div>
                <div className="rounded-lg px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-2 rounded text-sm">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input */}
      <form onSubmit={handleSubmit} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-l-md border-0 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 rounded-r-md bg-primary text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ChatBox from "@/components/ChatBox";
import Footer from "@/components/Footer";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    // Removed bg-gray-50 dark:bg-dark - handled by body now
    <main className="flex flex-col min-h-screen"> 
      <Header />
      <Hero />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </motion.div>

      <Footer />
      
      {/* Chat Button */}
      {/* Chat Button - Updated styles */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 dark:hover:bg-primary-dark/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all z-50"
        aria-label="Chat with AI Assistant"
      >
        {isChatOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          // Chat Window - Updated styles using card variables
          className="fixed bottom-20 right-6 w-[350px] sm:w-[400px] h-[500px] bg-card text-card-foreground border border-border rounded-lg shadow-xl z-50 overflow-hidden flex flex-col"
        >
          <ChatBox /> 
        </motion.div>
      )}
    </main>
  );
}

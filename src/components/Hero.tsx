"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    // Removed gradient background, adjusted padding
    <section
      id="home"
      className="relative pt-36 pb-24 md:pt-48 md:pb-32" // Increased padding top/bottom
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12"> {/* Added gap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 text-center md:text-left" // Removed margin bottom, gap handles spacing
        >
          {/* Updated text colors */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-dark-fg mb-4">
            <span className="block">Omar Zakaria</span>
            {/* Use primary color for name */}
            <span className="block text-primary dark:text-primary-dark">Ben Mustapha</span>
          </h1>
          {/* Updated text colors */}
          <h2 className="text-xl md:text-2xl font-medium text-foreground/80 dark:text-dark-fg/80 mb-6">
            <TypeAnimation
              sequence={[
                "Unity Developer", // Keep existing animation
                1000,
                "Mobile App Engineer",
                1000,
                "AI & LLM Specialist",
                1000,
                "VR Technology Expert",
                1000, // Keep existing animation timings
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
          {/* Updated text colors */}
          <p className="text-foreground/70 dark:text-dark-fg/70 mb-8 max-w-lg mx-auto md:mx-0"> {/* Centered on mobile */}
            A highly skilled software engineer with a Computer Science engineering degree,
            specializing in mobile development (iOS and Android), game development,
            virtual reality technologies, and AI/LLM integration.
          </p>
          {/* Updated button styles */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 font-medium py-2.5 px-6 rounded-md transition-all duration-300 shadow-sm hover:shadow-md" // New primary button style
            >
              Contact Me
            </a>
            <a
              href="/resume.pdf" // Assuming resume.pdf is in public folder
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary text-primary hover:bg-primary/10 dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark/10 font-medium py-2.5 px-6 rounded-md transition-all duration-300" // New outline button style
            >
              Download CV
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 flex justify-center" // Center image container
        >
          {/* Updated border color, added subtle glow */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary dark:border-primary-dark shadow-xl card-glow">
            <Image
              src="/images/profile.jpg" // Ensure this path is correct relative to the public folder
              alt="Omar Ben Mustapha"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Updated scroll down arrow color */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"> {/* Adjusted position */}
        <a href="#about" aria-label="Scroll to About section">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary dark:text-primary-dark hover:opacity-75 transition-opacity" // Use primary colors
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;

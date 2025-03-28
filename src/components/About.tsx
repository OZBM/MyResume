"use client";

import { motion } from "framer-motion";
import { FaUser, FaMapMarkerAlt, FaGlobe, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28"> {/* Adjusted padding */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16" // Increased margin bottom
        >
          {/* Updated heading and divider styles */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-dark mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary dark:bg-primary-dark mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"> {/* Increased gap */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-hidden" // Keep overflow hidden
          >
            {/* Apply card-glow effect */}
            <div className="relative h-full rounded-2xl border border-border p-1 card-glow"> 
              {/* GlowingEffect might need adjustments based on visual result */}
              <GlowingEffect 
                // Consider adjusting props if needed for new theme
                spread={40} 
                glow={true} 
                disabled={false}
                proximity={64}
                inactiveZone={0.01} 
                borderWidth={3} 
              />
              {/* Updated card styles */}
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
                {/* Updated heading color */}
                <h3 className="text-2xl font-semibold text-primary dark:text-primary-dark mb-4">
                  Who am I?
                </h3>
                {/* Updated paragraph colors */}
                <p className="text-foreground/80 dark:text-dark-fg/80 mb-4">
                  I am a highly skilled software engineer with a Computer Science
                  engineering degree, specializing in mobile development (iOS and
                  Android) and project management. I also master video game
                  development, virtual reality (VR) technologies and have a passion for
                  Large model Language Fine Tuning, Agent workflow and Agentic AI.
                </p>
                {/* Updated paragraph colors */}
                <p className="text-foreground/80 dark:text-dark-fg/80">
                  As a creative, organized, dedicated and empathetic team player with natural
                  leadership abilities, I bring a comprehensive skill set to any project.
                  My diverse background includes leading gaming divisions, developing rehabilitation
                  applications, and creating innovative VR solutions.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="overflow-hidden" // Keep overflow hidden
          >
             {/* Apply card-glow effect */}
            <div className="relative h-full rounded-2xl border border-border p-1 card-glow">
               {/* GlowingEffect might need adjustments based on visual result */}
              <GlowingEffect 
                // Consider adjusting props if needed for new theme
                spread={40} 
                glow={true} 
                disabled={false}
                proximity={64}
                inactiveZone={0.01} 
                borderWidth={3} 
              />
              {/* Updated card styles */}
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
                {/* Updated heading color */}
                <h3 className="text-2xl font-semibold text-primary dark:text-primary-dark mb-4">
                  Personal Details
                </h3>
                
                <div className="space-y-4">
                  {/* Updated icon, label, and value colors */}
                  <div className="flex items-center">
                    <FaUser className="text-primary dark:text-primary-dark mr-3 text-xl flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground/90 dark:text-dark-fg/90">Full Name</p>
                      <p className="text-foreground/70 dark:text-dark-fg/70">Omar Zakaria Ben Mustapha</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-primary dark:text-primary-dark mr-3 text-xl flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground/90 dark:text-dark-fg/90">Location</p>
                      <p className="text-foreground/70 dark:text-dark-fg/70">
                        Tunisia (can travel to France or any other country if needed)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaGlobe className="text-primary dark:text-primary-dark mr-3 text-xl flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground/90 dark:text-dark-fg/90">Languages</p>
                      <p className="text-foreground/70 dark:text-dark-fg/70">
                        French (native), English (fluent), Arabic (fluent)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaLinkedin className="text-primary dark:text-primary-dark mr-3 text-xl flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground/90 dark:text-dark-fg/90">LinkedIn</p>
                      <Link
                        href="https://www.linkedin.com/in/omar-zakaria-ben"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary dark:text-primary-dark hover:underline break-all" // Added break-all
                      >
                        linkedin.com/in/omar-zakaria-ben
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-primary dark:text-primary-dark mr-3 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-foreground/90 dark:text-dark-fg/90">Website</p>
                      <Link
                        href="https://hazenstudio.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary dark:text-primary-dark hover:underline break-all" // Added break-all
                      >
                        hazenstudio.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

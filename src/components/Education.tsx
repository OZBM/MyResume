"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const Education = () => {
  const educationHistory = [
    {
      degree: "Diplôme d'ingénieur, Ingenieur informatique",
      specialization: "spécialité développement mobile",
      institution: "Esprit Private Higher School of Engineering and Technology",
      location: "Tunisia",
      period: "Sept, 2010 – May, 2013",
    },
    {
      degree: "Bachelor's degree in Mathematics, Computer Science, Mechanics and Electronics",
      institution: "Pierre and Marie Curie University",
      location: "France",
      period: "Sept, 2008 – Sept, 2010",
    },
  ];

  return (
    // Removed section background, adjusted padding
    <section id="education" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16" // Increased margin
        >
          {/* Updated heading and divider */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-dark mb-4">Education</h2>
          <div className="w-24 h-1 bg-primary dark:bg-primary-dark mx-auto"></div>
        </motion.div>

        <div className="space-y-12"> {/* Increased spacing */}
          {educationHistory.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden" // Keep overflow hidden
            >
              {/* Apply card-glow, adjust border */}
              <div className="relative h-full rounded-2xl border border-border border-l-4 border-l-primary dark:border-l-primary-dark p-1 card-glow">
                {/* GlowingEffect might need adjustments */}
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                {/* Updated card styles */}
                <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2"> {/* Align items start */}
                    <div className="flex-grow"> {/* Allow text to take space */}
                      {/* Updated text colors */}
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground dark:text-dark-fg">
                        {edu.degree}
                      </h3>
                      {edu.specialization && (
                        <h4 className="text-md text-foreground/70 dark:text-dark-fg/70 mb-1">
                          {edu.specialization}
                        </h4>
                      )}
                      <h4 className="text-lg text-primary dark:text-primary-dark font-medium mb-2">
                        {edu.institution}
                      </h4>
                    </div>
                    <div className="md:text-right flex-shrink-0 mt-1 md:mt-0"> {/* Prevent shrinking */}
                      {/* Updated text and icon colors */}
                      <div className="flex items-center md:justify-end text-sm text-muted-foreground dark:text-dark-fg/70 mb-1">
                        <FaCalendarAlt className="mr-1.5 text-primary dark:text-primary-dark" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center md:justify-end text-sm text-muted-foreground dark:text-dark-fg/70">
                        <FaMapMarkerAlt className="mr-1.5 text-primary dark:text-primary-dark" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center" // Increased margin
        >
          {/* Updated quote text colors */}
          <p className="text-foreground/70 dark:text-dark-fg/70 italic text-lg">
            "Education is not the learning of facts, but the training of the mind to think."
          </p>
          <p className="text-primary dark:text-primary-dark mt-2 font-medium">- Albert Einstein</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

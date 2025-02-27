"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

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
    <section id="education" className="py-16 bg-gray-50 dark:bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Education</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-2 mb-8"></div>
        </motion.div>

        <div className="space-y-8">
          {educationHistory.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card relative border-l-4 border-primary pl-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-secondary dark:text-white">
                    {edu.degree}
                  </h3>
                  {edu.specialization && (
                    <h4 className="text-lg text-gray-600 dark:text-gray-300 mb-1">
                      {edu.specialization}
                    </h4>
                  )}
                  <h4 className="text-xl text-primary font-medium mb-2">
                    {edu.institution}
                  </h4>
                </div>
                <div className="md:text-right">
                  <div className="flex items-center md:justify-end text-gray-600 dark:text-gray-300 mb-1">
                    <FaCalendarAlt className="mr-2" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center md:justify-end text-gray-600 dark:text-gray-300">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{edu.location}</span>
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
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 italic">
            "Education is not the learning of facts, but the training of the mind to think."
          </p>
          <p className="text-primary mt-2">- Albert Einstein</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
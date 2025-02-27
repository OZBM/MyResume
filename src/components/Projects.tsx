"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCode, FaGamepad, FaVrCardboard, FaMobileAlt } from "react-icons/fa";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Rehabilitation Game Platform",
      description: "Developed a game platform for MindMaze Switzerland with over 10,000 users, focused on rehabilitation for stroke, multiple sclerosis, and sports injuries.",
      image: "/images/projects/rehab-platform.jpg",
      category: ["unity", "medical"],
      technologies: ["Unity", "C#", "Motion Capture", "Healthcare API"],
    },
    {
      id: 2,
      title: "VR Educational Platform",
      description: "Created an immersive VR educational platform for realistic training scenarios, used by institutions for professional training.",
      image: "/images/projects/vr-edu.jpg",
      category: ["vr", "education"],
      technologies: ["Unity", "C#", "VR Development", "3D Modeling"],
    },
    {
      id: 3,
      title: "Orange Tunisia Gaming Platform",
      description: "Built an online gaming platform for Orange Tunisia that attracted over 300,000 active users and hosted e-sport events.",
      image: "/images/projects/orange-gaming.jpg",
      category: ["gaming", "mobile"],
      technologies: ["Unity", "Mobile Development", "Backend Services"],
    },
    {
      id: 4,
      title: "Universal VR Headset Design",
      description: "Designed a VR headset compatible with any smartphone, launched through Hazen, a VR video game company I founded.",
      image: "/images/projects/vr-headset.jpg",
      category: ["vr", "hardware"],
      technologies: ["3D Design", "Hardware Prototyping", "Mobile Integration"],
    },
    {
      id: 5,
      title: "VR App Store Platform",
      description: "Launched a VR app store platform through Hazen that allowed users to access a marketplace of VR applications.",
      image: "/images/projects/vr-store.jpg",
      category: ["vr", "platform"],
      technologies: ["Web Development", "VR Integration", "Payment Systems"],
    },
    {
      id: 6,
      title: "Tourism AR Experience for Tunisia",
      description: "Created an augmented reality game to promote tourism in Tunisia, highlighting cultural and historical sites.",
      image: "/images/projects/tourism-ar.jpg",
      category: ["ar", "mobile"],
      technologies: ["AR Development", "Unity", "Geolocation", "Cultural Mapping"],
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category.includes(filter));

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-2 mb-8"></div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unity")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center ${
              filter === "unity"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <FaGamepad className="mr-2" /> Unity
          </button>
          <button
            onClick={() => setFilter("vr")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center ${
              filter === "vr"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <FaVrCardboard className="mr-2" /> VR
          </button>
          <button
            onClick={() => setFilter("mobile")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center ${
              filter === "mobile"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <FaMobileAlt className="mr-2" /> Mobile
          </button>
          <button
            onClick={() => setFilter("ar")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center ${
              filter === "ar"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <FaCode className="mr-2" /> AR
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden group"
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="text-white text-center p-4">
                    <h4 className="font-semibold mb-2">Technologies</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-primary bg-opacity-70 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Project image placeholder with gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 dark:from-primary/20 dark:to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mb-2 mx-auto">
                      {project.category.includes('vr') ? (
                        <FaVrCardboard className="w-full h-full text-gray-600 dark:text-gray-400" />
                      ) : project.category.includes('mobile') ? (
                        <FaMobileAlt className="w-full h-full text-gray-600 dark:text-gray-400" />
                      ) : project.category.includes('gaming') ? (
                        <FaGamepad className="w-full h-full text-gray-600 dark:text-gray-400" />
                      ) : (
                        <FaCode className="w-full h-full text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{project.title}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.category.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
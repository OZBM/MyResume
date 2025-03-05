"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaGamepad, FaVrCardboard, FaMobileAlt } from "react-icons/fa";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Rehabilitation Game Platform",
      description: "Developed a game platform for MindMaze Switzerland with over 10,000 users, focused on rehabilitation for stroke, multiple sclerosis, and sports injuries.",
      category: ["unity", "medical"],
      technologies: ["Unity", "C#", "Motion Capture", "Healthcare API"],
    },
    {
      id: 2,
      title: "VR Educational Platform",
      description: "Created an immersive VR educational platform for realistic training scenarios, used by institutions for professional training.",
      category: ["vr", "education"],
      technologies: ["Unity", "C#", "VR Development", "3D Modeling"],
    },
    {
      id: 3,
      title: "Orange Tunisia Gaming Platform",
      description: "Built an online gaming platform for Orange Tunisia that attracted over 300,000 active users and hosted e-sport events.",
      category: ["gaming", "mobile"],
      technologies: ["Unity", "Mobile Development", "Backend Services"],
    },
    {
      id: 4,
      title: "Universal VR Headset Design",
      description: "Designed a VR headset compatible with any smartphone, launched through Hazen, a VR video game company I founded.",
      category: ["vr", "hardware"],
      technologies: ["3D Design", "Hardware Prototyping", "Mobile Integration"],
    },
    {
      id: 5,
      title: "VR App Store Platform",
      description: "Launched a VR app store platform through Hazen that allowed users to access a marketplace of VR applications.",
      category: ["vr", "platform"],
      technologies: ["Web Development", "VR Integration", "Payment Systems"],
    },
    {
      id: 6,
      title: "Tourism AR Experience for Tunisia",
      description: "Created an augmented reality game to promote tourism in Tunisia, highlighting cultural and historical sites.",
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

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[42rem] xl:grid-rows-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              area={getGridArea(index)}
              title={project.title}
              description={project.description}
              icon={getCategoryIcon(project.category)}
              technologies={project.technologies}
              categories={project.category}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  technologies: string[];
  categories: string[];
}

const ProjectCard = ({ area, icon, title, description, technologies, categories }: ProjectCardProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none group", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </p>
            </div>
            
            {/* Technologies and Categories */}
            <div className="mt-4">
              <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-xl">
                <div className="text-white text-center p-4">
                  <h4 className="font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary bg-opacity-70 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

// Helper function to return the grid area for each index
function getGridArea(index: number): string {
  const gridAreas = [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    "md:[grid-area:3/1/4/7] xl:[grid-area:2/8/3/13]",
    "md:[grid-area:3/7/4/13] lg:hidden"
  ];
  
  return index < gridAreas.length ? gridAreas[index] : "md:col-span-6 lg:col-span-4";
}

// Helper function to get the icon based on the project category
function getCategoryIcon(categories: string[]): React.ReactNode {
  if (categories.includes('vr')) {
    return <FaVrCardboard className="h-4 w-4" />;
  } else if (categories.includes('mobile')) {
    return <FaMobileAlt className="h-4 w-4" />;
  } else if (categories.includes('gaming')) {
    return <FaGamepad className="h-4 w-4" />;
  } else {
    return <FaCode className="h-4 w-4" />;
  }
}

export default Projects;

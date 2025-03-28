"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaGamepad, FaVrCardboard, FaMobileAlt, FaLaptopCode } from "react-icons/fa";
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
    },
    {
      id: 7,
      title: "FingerMagic: Hand-Tracking Drawing Tool",
      description: "Developed a web-based creative tool that uses webcam hand-tracking to let users draw in the air with their finger. Features multiple line smoothing algorithms and various artistic effects.",
      category: ["web", "creative"],
      technologies: ["HTML5", "JavaScript", "CSS", "MediaPipe", "Canvas API"],
      tryItLink: "/FingerMagic/index.html"
    }
  ];

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.category.includes(filter));

  return (
    // Adjusted padding
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16" // Increased margin
        >
          {/* Updated heading and divider */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-dark mb-4">Projects</h2>
          <div className="w-24 h-1 bg-primary dark:bg-primary-dark mx-auto"></div>
        </motion.div>

        {/* Updated Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12"> {/* Increased margin bottom */}
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
              filter === "all"
                ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unity")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
              filter === "unity"
                ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
            }`}
          >
            <FaGamepad className="mr-1.5" /> Unity
          </button>
          <button
            onClick={() => setFilter("vr")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
              filter === "vr"
                ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
            }`}
          >
            <FaVrCardboard className="mr-1.5" /> VR
          </button>
          <button
            onClick={() => setFilter("mobile")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
              filter === "mobile"
                ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
            }`}
          >
            <FaMobileAlt className="mr-1.5" /> Mobile
          </button>
          <button
            onClick={() => setFilter("ar")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
              filter === "ar"
                ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
            }`}
          >
            <FaCode className="mr-1.5" /> AR
          </button>
          <button
            onClick={() => setFilter("web")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
              filter === "web"
                ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
            }`}
          >
            <FaLaptopCode className="mr-1.5" /> Web
          </button>
        </div>

        {/* Grid layout - adjusted to fix overlapping issue */}
        <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-4 lg:gap-8 xl:grid-rows-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              area={getGridArea(index)}
              title={project.title}
              description={project.description}
              icon={getCategoryIcon(project.category)}
              technologies={project.technologies}
              categories={project.category}
              tryItLink={project.tryItLink}
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
  tryItLink?: string;
}

const ProjectCard = ({ area, icon, title, description, technologies, categories, tryItLink }: ProjectCardProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none group relative", area)}> {/* Added relative positioning */}
      {/* Apply card-glow, adjust border/padding */}
      <div className="relative h-full rounded-2xl border border-border p-1 card-glow">
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
          <div className="relative flex flex-1 flex-col justify-start gap-3"> {/* Use justify-start */}
            {/* Updated icon background and color */}
            <div className="w-fit rounded-lg border border-border bg-muted p-2 text-primary dark:text-primary-dark">
              {icon}
            </div>
            <div className="space-y-2"> {/* Reduced space */}
              {/* Updated title color */}
              <h3 className="pt-0.5 text-lg md:text-xl font-semibold text-foreground dark:text-dark-fg">
                {title}
              </h3>
              {/* Updated description color */}
              <p className="text-sm text-foreground/80 dark:text-dark-fg/80">
                {description}
              </p>
            </div>
          </div>

          {/* Technologies (Hover Overlay) and Categories */}
          <div className="mt-auto pt-4"> {/* Push tags to bottom */}
            {/* Updated Hover Overlay - Added background to inner div */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl">
              <div className="bg-primary dark:bg-primary-dark text-primary-foreground text-center p-4 rounded-lg"> {/* Added background and rounded corners */}
                <h4 className="font-semibold mb-2 text-sm">Technologies</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {technologies.map((tech, idx) => (
                    // Updated tech tag style
                    <span key={idx} className="px-2 py-0.5 bg-white/20 dark:bg-black/20 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Updated Category Tags */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
                >
                  {cat}
                </span>
              ))}
            </div> {/* Closing div for flex flex-wrap */}
          </div> {/* Closing div for mt-auto */}
        </div> {/* Closing div for relative flex h-full */}
      </div> {/* Closing div for relative h-full rounded-2xl */}

      {/* Try It Now button - Moved outside the main card content div and positioned absolutely */}
      {tryItLink && (
        <a 
          href={tryItLink} 
          target="_blank" 
          rel="noopener noreferrer"
          // Adjusted positioning and z-index
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 px-4 py-1.5 bg-primary dark:bg-primary-dark text-primary-foreground rounded-md text-sm font-medium flex items-center justify-center gap-1.5 transition-all hover:bg-primary/90 dark:hover:bg-primary-dark/90 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-dark/50 group-hover:transform group-hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Try It Now
        </a>
      )}
    </li>
  );
};

// Helper function to return the grid area for each index
function getGridArea(index: number): string {
  const gridAreas = [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/5]",
    "md:[grid-area:3/1/4/7] xl:[grid-area:2/5/3/9]",
    "md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]",
    "md:[grid-area:4/1/5/13] xl:[grid-area:3/1/4/13]"
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
  } else if (categories.includes('web')) {
    return <FaLaptopCode className="h-4 w-4" />;
  } else {
    return <FaCode className="h-4 w-4" />;
  }
}

export default Projects;

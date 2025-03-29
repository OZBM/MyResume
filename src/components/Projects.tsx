"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaGamepad, FaVrCardboard, FaMobileAlt, FaLaptopCode, FaPlay } from "react-icons/fa";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [projectsCarouselApi, setProjectsCarouselApi] = useState<CarouselApi>();
  const [demosCarouselApi, setDemosCarouselApi] = useState<CarouselApi>();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // Projects data - all professional projects except FingerMagic
  const projects = [
    {
      id: 1,
      title: "Rehabilitation Game Platform",
      description: "Developed a game platform for MindMaze Switzerland with over 10,000 users, focused on rehabilitation for stroke, multiple sclerosis, and sports injuries.",
      category: ["unity", "medical"],
      technologies: ["Unity", "C#", "Motion Capture", "Healthcare API"],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "VR Educational Platform",
      description: "Created an immersive VR educational platform for realistic training scenarios, used by institutions for professional training.",
      category: ["vr", "education"],
      technologies: ["Unity", "C#", "VR Development", "3D Modeling"],
      gradient: "from-indigo-500 to-cyan-400",
    },
    {
      id: 3,
      title: "Orange Tunisia Gaming Platform",
      description: "Built an online gaming platform for Orange Tunisia that attracted over 300,000 active users and hosted e-sport events.",
      category: ["gaming", "mobile"],
      technologies: ["Unity", "Mobile Development", "Backend Services"],
      gradient: "from-green-400 to-teal-500",
    },
    {
      id: 4,
      title: "Universal VR Headset Design",
      description: "Designed a VR headset compatible with any smartphone, launched through Hazen, a VR video game company I founded.",
      category: ["vr", "hardware"],
      technologies: ["3D Design", "Hardware Prototyping", "Mobile Integration"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      title: "VR App Store Platform",
      description: "Launched a VR app store platform through Hazen that allowed users to access a marketplace of VR applications.",
      category: ["vr", "platform"],
      technologies: ["Web Development", "VR Integration", "Payment Systems"],
      gradient: "from-blue-400 to-indigo-600",
    },
    {
      id: 6,
      title: "Tourism AR Experience for Tunisia",
      description: "Created an augmented reality game to promote tourism in Tunisia, highlighting cultural and historical sites.",
      category: ["ar", "mobile"],
      technologies: ["AR Development", "Unity", "Geolocation", "Cultural Mapping"],
      gradient: "from-yellow-400 to-orange-500",
    },
  ];

  // Demos data - only FingerMagic for now
  const demos = [
    {
      id: 7,
      title: "FingerMagic: Hand-Tracking Drawing Tool",
      description: "Developed a web-based creative tool that uses webcam hand-tracking to let users draw in the air with their finger. Features multiple line smoothing algorithms and various artistic effects.",
      category: ["web", "creative"],
      technologies: ["HTML5", "JavaScript", "CSS", "MediaPipe", "Canvas API"],
      tryItLink: "/FingerMagic/index.html",
      gradient: "from-pink-500 to-orange-400",
    }
  ];

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.category.includes(filter));

  // Animation variants for filter transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  // Current slide indicators for carousels
  const [currentProjectsSlide, setCurrentProjectsSlide] = useState(0);
  const [currentDemosSlide, setCurrentDemosSlide] = useState(0);
  
  // Update current slide indicators
  const updateProjectsSlide = (api: CarouselApi | null) => {
    if (!api) return;
    setCurrentProjectsSlide(api.selectedScrollSnap());
  };
  
  const updateDemosSlide = (api: CarouselApi | null) => {
    if (!api) return;
    setCurrentDemosSlide(api.selectedScrollSnap());
  };

  // Set up slide change listeners
  React.useEffect(() => {
    if (projectsCarouselApi) {
      projectsCarouselApi.on("select", () => updateProjectsSlide(projectsCarouselApi));
    }
    if (demosCarouselApi) {
      demosCarouselApi.on("select", () => updateDemosSlide(demosCarouselApi));
    }
  }, [projectsCarouselApi, demosCarouselApi]);

  return (
    <div className="py-20 space-y-20">
      {/* PROJECTS SECTION */}
      <section id="projects" className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-dark mb-4">Projects</h2>
            <div className="w-24 h-1 bg-primary dark:bg-primary-dark mx-auto"></div>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <motion.button
              onClick={() => setFilter("all")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                filter === "all"
                  ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
              }`}
            >
              All
            </motion.button>
            <motion.button
              onClick={() => setFilter("unity")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
                filter === "unity"
                  ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
              }`}
            >
              <FaGamepad className="mr-1.5" /> Unity
            </motion.button>
            <motion.button
              onClick={() => setFilter("vr")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
                filter === "vr"
                  ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
              }`}
            >
              <FaVrCardboard className="mr-1.5" /> VR
            </motion.button>
            <motion.button
              onClick={() => setFilter("mobile")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
                filter === "mobile"
                  ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
              }`}
            >
              <FaMobileAlt className="mr-1.5" /> Mobile
            </motion.button>
            <motion.button
              onClick={() => setFilter("ar")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
                filter === "ar"
                  ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
              }`}
            >
              <FaCode className="mr-1.5" /> AR
            </motion.button>
            <motion.button
              onClick={() => setFilter("web")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
                filter === "web"
                  ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/80"
              }`}
            >
              <FaLaptopCode className="mr-1.5" /> Web
            </motion.button>
          </div>

          {/* Projects Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="relative"
            >
              <Carousel
                setApi={setProjectsCarouselApi}
                opts={{
                  align: "start",
                  dragFree: true,
                  containScroll: "trimSnaps"
                }}
                className="w-full"
              >
                <CarouselContent>
                  {filteredProjects.map((project) => (
                    <CarouselItem 
                      key={project.id} 
                      className="basis-full sm:basis-1/2 lg:basis-1/3 pl-4 md:pl-6"
                    >
                      <motion.div
                        variants={itemVariants}
                        className="h-full"
                      >
                        <Dialog>
                          <DialogTrigger asChild>
                            <motion.div 
                              className="cursor-pointer h-full min-h-[330px] group"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                              <div className="relative h-full rounded-2xl border border-border p-1 card-glow">
                                <GlowingEffect
                                  spread={40}
                                  glow={true}
                                  disabled={false}
                                  proximity={64}
                                  inactiveZone={0.01}
                                  borderWidth={3}
                                />
                                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                                  {/* Gradient Background */}
                                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}></div>
                                  
                                  {/* Content */}
                                  <div className="relative z-10 flex flex-col justify-between h-full p-6">
                                    <div>
                                      <div className="w-fit rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3 mb-4">
                                        {getCategoryIcon(project.category)}
                                      </div>
                                      <h3 className="text-xl font-semibold text-white mb-3">
                                        {project.title}
                                      </h3>
                                      <p className="text-white/90 line-clamp-3 mb-4">
                                        {project.description}
                                      </p>
                                    </div>
                                    
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                      {project.category.map((cat, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white rounded text-xs"
                                        >
                                          {cat}
                                        </span>
                                      ))}
                                    </div>
                                    
                                    {/* Click Indicator */}
                                    <motion.div 
                                      className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                      animate={{ scale: [1, 1.1, 1] }}
                                      transition={{ 
                                        repeat: Infinity, 
                                        repeatType: "loop",
                                        duration: 2,
                                        ease: "easeInOut"
                                      }}
                                    >
                                      <ArrowRight className="h-4 w-4 text-white" />
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </DialogTrigger>
                          
                          <DialogContent className="sm:max-w-[600px]">
                            <motion.div
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                              <DialogHeader>
                                <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                                <DialogDescription asChild>
                                  <div>
                                    <div className="flex gap-2 mt-2">
                                      {project.category.map((cat, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs"
                                        >
                                          {cat}
                                        </span>
                                      ))}
                                    </div>
                                    <div className="mt-4 text-foreground">{project.description}</div>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="mt-6">
                                <h4 className="text-sm font-semibold mb-2">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech, idx) => (
                                    <motion.span
                                      key={idx}
                                      className="px-3 py-1 bg-muted rounded-full text-sm"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ 
                                        delay: idx * 0.05,
                                        duration: 0.3
                                      }}
                                    >
                                      {tech}
                                    </motion.span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          </DialogContent>
                        </Dialog>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </div>
              </Carousel>

              {/* Carousel Indicators */}
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: filteredProjects.length > 0 ? Math.ceil(filteredProjects.length / 3) : 1 }).map((_, idx) => (
                  <motion.button
                    key={idx}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      currentProjectsSlide === idx ? "bg-primary" : "bg-primary/20"
                    }`}
                    onClick={() => projectsCarouselApi?.scrollTo(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* DEMOS SECTION */}
      {demos.length > 0 && (
        <section id="demos" className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-accent dark:text-accent-dark mb-4">Interactive Demos</h2>
              <div className="w-24 h-1 bg-accent dark:bg-accent-dark mx-auto"></div>
            </motion.div>

            {/* Demos Carousel */}
            <Carousel
              setApi={setDemosCarouselApi}
              opts={{
                align: "start",
                dragFree: true
              }}
              className="w-full"
            >
              <CarouselContent>
                {demos.map((demo) => (
                  <CarouselItem 
                    key={demo.id} 
                    className="basis-full sm:basis-1/2 lg:basis-1/3 pl-4 md:pl-6"
                  >
                    <motion.a 
                      href={demo.tryItLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative h-full min-h-[330px] rounded-2xl border border-border p-1 card-glow">
                        <GlowingEffect
                          spread={40}
                          glow={true}
                          disabled={false}
                          proximity={64}
                          inactiveZone={0.01}
                          borderWidth={3}
                        />
                        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                          {/* Gradient Background */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-80`}></div>
                          
                          {/* Content */}
                          <div className="relative z-10 flex flex-col justify-between h-full p-6">
                            <div>
                              <motion.div 
                                className="w-fit rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3 mb-4"
                                animate={{ 
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 5, 0, -5, 0]
                                }}
                                transition={{ 
                                  repeat: Infinity, 
                                  repeatType: "loop",
                                  duration: 5,
                                  ease: "easeInOut"
                                }}
                              >
                                <FaPlay className="h-5 w-5 text-white" />
                              </motion.div>
                              <h3 className="text-xl font-semibold text-white mb-3">
                                {demo.title}
                              </h3>
                              <p className="text-white/90 line-clamp-3 mb-4">
                                {demo.description}
                              </p>
                            </div>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                              {demo.category.map((cat, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white rounded text-xs"
                                >
                                  {cat}
                                </span>
                              ))}
                            </div>
                            
                            {/* Try It Now button */}
                            <motion.div 
                              className="absolute bottom-6 right-6 bg-white text-accent font-medium rounded-full px-4 py-1.5 flex items-center gap-1.5 opacity-90 transition-all transform"
                              whileHover={{ scale: 1.05, x: 5 }}
                            >
                              Try It Now
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {demos.length > 1 && (
                <>
                  <div className="hidden md:block">
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </div>
                  
                  {/* Carousel Indicators */}
                  <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: Math.ceil(demos.length / 3) }).map((_, idx) => (
                      <motion.button
                        key={idx}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          currentDemosSlide === idx ? "bg-accent" : "bg-accent/20"
                        }`}
                        onClick={() => demosCarouselApi?.scrollTo(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </>
              )}
            </Carousel>
          </div>
        </section>
      )}
    </div>
  );
};

// Helper function to get the icon based on the project category
function getCategoryIcon(categories: string[]): React.ReactNode {
  if (categories.includes('vr')) {
    return <FaVrCardboard className="h-5 w-5 text-white" />;
  } else if (categories.includes('mobile')) {
    return <FaMobileAlt className="h-5 w-5 text-white" />;
  } else if (categories.includes('gaming')) {
    return <FaGamepad className="h-5 w-5 text-white" />;
  } else if (categories.includes('web')) {
    return <FaLaptopCode className="h-5 w-5 text-white" />;
  } else {
    return <FaCode className="h-5 w-5 text-white" />;
  }
}

export default Projects;

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "../lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function ImageSwiper({ images, className, ...props }) {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -10 && imgIndex < images.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= 10 && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className={cn(
        "group relative aspect-video h-full w-full overflow-hidden rounded-lg",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 z-10">
        {imgIndex > 0 && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              className="pointer-events-auto h-8 w-8 rounded-full bg-light/80 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setImgIndex((prev) => prev - 1)}
            >
              <ArrowLeft className="h-4 w-4 text-dark" />
            </Button>
          </div>
        )}
        
        {imgIndex < images.length - 1 && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              className="pointer-events-auto h-8 w-8 rounded-full bg-light/80 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setImgIndex((prev) => prev + 1)}
            >
              <ArrowRight className="h-4 w-4 text-dark" />
            </Button>
          </div>
        )}
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={`dot-${i}`}
              className={`pointer-events-auto h-1.5 rounded-full transition-all ${
                i === imgIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-light/60 hover:bg-light"
              }`}
              onClick={() => setImgIndex(i)}
            />
          ))}
        </div>
      </div>
      
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX, touchAction: "none" }}
        onDragEnd={onDragEnd}
        className="relative h-full w-full"
      >
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{
            transform: `translateX(-${imgIndex * 100}%)`,
          }}
        >
          <div className="flex h-full">
            {images.map((image, i) => (
              <div
                key={`img-${i}`}
                className="h-full w-full flex-shrink-0"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={image}
                  alt={`Project image ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <Card className="overflow-hidden">
      <ImageSwiper images={project.images} className="aspect-video" />
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
          <span className="text-sm text-dark/60">{project.year}</span>
        </div>
        <CardTitle className="mt-2 text-xl text-secondary">{project.title}</CardTitle>
        <CardDescription className="text-dark/70 line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t p-4 text-sm">
        <div className="text-dark/70">{project.location}</div>
        <Button
          variant="ghost"
          className="gap-1 px-2 py-1 text-primary hover:text-primary/90"
        >
          View Details <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProjectsPortfolio({ projects }) {
  const [filter, setFilter] = useState("all");
  
  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-2">Our Portfolio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Explore Our <span className="text-primary">Signature Projects</span>
          </h2>
          <p className="text-dark/70 text-lg mb-8">
            Browse through our diverse portfolio of completed projects, showcasing our expertise,
            quality craftsmanship, and dedication to bringing our clients' visions to life.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="text-sm"
            >
              All Projects
            </Button>
            <Button
              variant={filter === "commercial" ? "default" : "outline"}
              onClick={() => setFilter("commercial")}
              className="text-sm"
            >
              Commercial
            </Button>
            <Button
              variant={filter === "residential" ? "default" : "outline"}
              onClick={() => setFilter("residential")}
              className="text-sm"
            >
              Residential
            </Button>
            <Button
              variant={filter === "industrial" ? "default" : "outline"}
              onClick={() => setFilter("industrial")}
              className="text-sm"
            >
              Industrial
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          <Carousel className="mx-auto">
            <CarouselContent>
              {filteredProjects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <ProjectCard project={project} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-light border border-secondary/20" />
            <CarouselNext className="bg-light border border-secondary/20" />
          </Carousel>
        </div>
        
        <div className="mt-12 text-center">
          <Button className="gap-2">
            View All Projects <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

const Projects = () => {
  const projects = [
    {
      id: "1",
      title: "Modern Office Complex",
      description: "A state-of-the-art commercial office building featuring sustainable design and smart technology integration.",
      category: "commercial",
      location: "Downtown District",
      year: "2023",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&h=800&auto=format&fit=crop"
      ]
    },
    {
      id: "2",
      title: "Luxury Residential Tower",
      description: "Premium high-rise residential development with panoramic views and world-class amenities.",
      category: "residential",
      location: "Riverside Heights",
      year: "2022",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=1200&h=800&auto=format&fit=crop"
      ]
    },
    {
      id: "3",
      title: "Industrial Manufacturing Facility",
      description: "Modern manufacturing plant designed for efficiency, safety, and environmental compliance.",
      category: "industrial",
      location: "Metro Industrial Park",
      year: "2024",
      images: [
        "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529951294979-cb8711f468e1?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1573011029006-ef3d80f0c9ff?q=80&w=1200&h=800&auto=format&fit=crop"
      ]
    },
    {
      id: "4",
      title: "Retail Shopping Center",
      description: "Contemporary shopping destination featuring a mix of retail spaces, dining options, and entertainment venues.",
      category: "commercial",
      location: "East End District",
      year: "2023",
      images: [
        "https://images.unsplash.com/photo-1555529771-122e5d9f2341?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&h=800&auto=format&fit=crop"
      ]
    },
    {
      id: "5",
      title: "Healthcare Medical Center",
      description: "Advanced healthcare facility designed for patient comfort and efficient medical care delivery.",
      category: "commercial",
      location: "North Hills",
      year: "2022",
      images: [
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200&h=800&auto=format&fit=crop"
      ]
    },
    {
      id: "6",
      title: "Waterfront Condominium",
      description: "Luxury waterfront residential development with private marina and resort-style amenities.",
      category: "residential",
      location: "Harbor Bay",
      year: "2021",
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&h=800&auto=format&fit=crop"
      ]
    }
  ];

  return <ProjectsPortfolio projects={projects} />;
};

export default Projects;

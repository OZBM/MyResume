import React from "react";
import { MoveRight, PhoneCall, HardHat } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import constructionBg from '/public/construction-bg.jpg'; // Import the image

function Hero() {
  return (
    <div 
      className={cn(
        "w-full relative min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      )}
      style={{ 
        backgroundImage: `url(${constructionBg})` // Use imported image variable
      }}
    >
      <div className="absolute inset-0 bg-dark/60"></div>
      <div className="container mx-auto relative z-10 px-4">
        <div className="flex flex-col gap-8 items-center text-center max-w-4xl mx-auto">
          <div>
            <Badge variant="outline" className="bg-secondary/20 backdrop-blur-sm text-light border-light/20">
              Professional Construction Services
            </Badge>
          </div>
          <div className="flex gap-6 flex-col">
            <h1 className="text-5xl md:text-7xl tracking-tighter font-bold text-light">
              Building Your Vision, <span className="text-accent">Crafting Excellence</span>
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-light/80 max-w-2xl mx-auto">
              With over 25 years of experience, we deliver exceptional construction services 
              that transform your ideas into reality. From residential to commercial projects, 
              our team of experts ensures quality and precision at every step.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="gap-2" variant="outline">
              Our Projects <MoveRight className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-2 bg-primary text-light hover:bg-primary/90">
              Get a Free Quote <PhoneCall className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

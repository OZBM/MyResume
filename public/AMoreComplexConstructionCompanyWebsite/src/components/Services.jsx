import React from "react";
import { Badge } from "./ui/badge";
import { 
  Hammer, 
  Building2, 
  PaintBucket, 
  Ruler, 
  Wrench, 
  Truck, 
  HardHat, 
  Lightbulb 
} from "lucide-react";
import { useId } from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="relative bg-gradient-to-b from-light to-white p-6 rounded-3xl overflow-hidden group hover:shadow-lg transition-all duration-300">
      <Grid size={20} />
      <div className="flex flex-col items-start gap-4 relative z-20">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-secondary">{title}</h3>
        <p className="text-dark/70 text-base">{description}</p>
        <motion.div 
          className="w-full h-1 bg-primary/20 mt-2 rounded-full overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="h-full bg-primary w-0 group-hover:w-full transition-all duration-700 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "30%" }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export const Grid = ({
  pattern,
  size,
}) => {
  const id = useId();
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div
      style={{
        height: size ? `${size * 8}px` : "160px",
        width: size ? `${size * 8}px` : "160px",
      }}
      className="grid grid-cols-[repeat(10,_1fr)] grid-rows-[repeat(8,_1fr)] absolute -bottom-4 -right-4 -z-10 opacity-[0.06]"
    >
      {p.map(([row, column], index) => (
        <div
          key={`${id}-${index}`}
          className="bg-primary"
          style={{
            gridColumnStart: column,
            gridColumnEnd: `span ${Math.floor(Math.random() * 3) + 2}`,
            gridRowStart: row,
            gridRowEnd: `span ${Math.floor(Math.random() * 2) + 1}`,
          }}
        />
      ))}
    </div>
  );
};

const Services = () => {
  const servicesList = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Commercial Construction",
      description: "Expert construction services for commercial properties including office buildings, retail spaces, and industrial facilities."
    },
    {
      icon: <HardHat className="h-6 w-6" />,
      title: "Residential Building",
      description: "Custom home construction and renovation services designed to bring your dream home to life with precision and quality."
    },
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "Architectural Design",
      description: "Comprehensive architectural design services that blend aesthetics, functionality, and structural integrity."
    },
    {
      icon: <PaintBucket className="h-6 w-6" />,
      title: "Interior Finishing",
      description: "Premium interior finishing services including painting, flooring, cabinetry, and custom woodwork."
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Renovation & Remodeling",
      description: "Transform your existing spaces with our expert renovation and remodeling services for both residential and commercial properties."
    },
    {
      icon: <Hammer className="h-6 w-6" />,
      title: "Custom Carpentry",
      description: "Skilled carpentry services for custom fixtures, furniture, and architectural elements tailored to your specifications."
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Site Development",
      description: "Comprehensive site preparation including excavation, grading, and infrastructure development for construction projects."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Sustainable Building",
      description: "Eco-friendly construction practices and materials that minimize environmental impact while maximizing energy efficiency."
    }
  ];

  return (
    <div id="services" className="bg-light py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge className="mb-4">Our Services</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Comprehensive <span className="text-primary">Construction Solutions</span>
          </h2>
          <p className="text-dark/70 text-lg">
            We offer a wide range of construction services tailored to meet your specific needs.
            Our team of experienced professionals is dedicated to delivering exceptional quality
            and customer satisfaction on every project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <motion.button 
            className="px-6 py-3 bg-primary text-light rounded-lg font-medium hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request a Consultation
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Services;

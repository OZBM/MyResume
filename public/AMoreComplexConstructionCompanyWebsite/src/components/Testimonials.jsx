import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "../lib/utils";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const testimonialData = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "John Carpenter",
    company: "Carpenter & Associates",
    role: "CEO",
    text: "We've partnered with BuildRight Construction on three major commercial projects. Their attention to detail, adherence to timelines, and quality craftsmanship have made them our go-to construction company. I highly recommend their services for any major building project.",
    rating: 5,
    date: "July 15, 2024"
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "Michael Robertson",
    company: "Robertson Properties",
    role: "Property Developer",
    text: "When it comes to residential development, BuildRight Construction has consistently delivered superior results. Their team is professional, their communication is excellent, and they've always completed our projects on budget. A five-star company in every regard.",
    rating: 5,
    date: "June 3, 2024"
  },
  {
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "Sarah Williams",
    company: "Williams Family",
    role: "Homeowner",
    text: "We hired BuildRight for our home renovation, and they transformed our 1980s house into a modern dream home. The team was respectful, clean, and incredibly skilled. Every detail was handled with care, and they were transparent about costs throughout the project.",
    rating: 5,
    date: "March 28, 2024"
  },
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "David Thompson",
    company: "Thompson Healthcare",
    role: "Facilities Director",
    text: "Our medical facility renovation required specialized knowledge and strict adherence to healthcare standards. BuildRight Construction delivered on all fronts, creating a modern, efficient space while minimizing disruption to our operations. Their expertise in healthcare construction is outstanding.",
    rating: 5,
    date: "January 12, 2024"
  },
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "Robert Nelson",
    company: "Industrial Innovations",
    role: "Operations Manager",
    text: "We contracted BuildRight Construction for our manufacturing facility expansion. They understood our specific requirements and delivered a functional, efficient space that has improved our production capabilities significantly. Their industrial construction expertise is evident in every aspect of the project.",
    rating: 4,
    date: "November 5, 2023"
  },
  {
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "Emily Parker",
    company: "Parker Development Corp",
    role: "Project Director",
    text: "We've worked with many construction firms over the years, but BuildRight stands out for their professionalism, quality, and reliability. They've become an integral part of our development projects. I highly recommend their services to anyone seeking top-tier construction work.",
    rating: 5,
    date: "May 12, 2022"
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: "Amanda Garcia",
    company: "Garcia Retail Group",
    role: "Store Planning Manager",
    text: "Our retail renovation had to be completed while maintaining partial store operations. This team worked around our schedule and created minimal disruption to our business. The finished space has increased our sales by 30%. We couldn't be happier with the results.",
    rating: 4,
    date: "April 8, 2022"
  }
];

function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const maxDisplayed = 6;

  const displayedTestimonials = showAll 
    ? testimonialData 
    : testimonialData.slice(0, maxDisplayed);

  return (
    <section id="testimonials" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-12">
          <Badge className="mb-2">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-center text-dark/70 max-w-2xl">
            Don't just take our word for it. Hear what our satisfied clients have to say about 
            our dedication to quality, professionalism, and excellence in construction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTestimonials.map((testimonial, index) => (
            <Card key={index} className="h-full flex flex-col bg-white border-gray-100">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-secondary">{testimonial.name}</h4>
                    <p className="text-sm text-dark/60">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating ? "text-accent fill-accent" : "text-gray-300"
                      )}
                    />
                  ))}
                  {testimonial.date && (
                    <span className="ml-auto text-xs text-dark/50">{testimonial.date}</span>
                  )}
                </div>
                
                <p className="text-dark/80 flex-grow mb-4 italic">"{testimonial.text}"</p>
                
                <div className="h-1 w-16 bg-primary/20 rounded-full mt-auto">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${testimonial.rating * 20}%` }} />
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {testimonialData.length > maxDisplayed && !showAll && (
          <div className="mt-8 text-center">
            <Button 
              onClick={() => setShowAll(true)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All Testimonials
            </Button>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <div className="bg-secondary/5 p-6 rounded-lg inline-block max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Ready to Start Your Project?
            </h3>
            <p className="text-dark/70 mb-6">
              Join our satisfied clients and experience the BuildRight difference on your next construction project.
            </p>
            <Button 
              className="bg-primary text-white px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
              size="lg"
            >
              Get a Free Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

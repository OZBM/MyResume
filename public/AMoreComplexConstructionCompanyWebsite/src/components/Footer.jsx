import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">BUILT</span>RIGHT
            </h3>
            <p className="mb-4 text-light/80">
              Building excellence through quality craftsmanship, innovative solutions, and 
              unwavering commitment to our clients' vision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-light hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-light hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-light hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-light hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-light/80 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-light/80 hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="text-light/80 hover:text-primary transition-colors">Services</a>
              </li>
              <li>
                <a href="#projects" className="text-light/80 hover:text-primary transition-colors">Projects</a>
              </li>
              <li>
                <a href="#testimonials" className="text-light/80 hover:text-primary transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="text-light/80 hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-light/80 hover:text-primary transition-colors">Commercial Construction</a>
              </li>
              <li>
                <a href="#" className="text-light/80 hover:text-primary transition-colors">Residential Building</a>
              </li>
              <li>
                <a href="#" className="text-light/80 hover:text-primary transition-colors">Renovation & Remodeling</a>
              </li>
              <li>
                <a href="#" className="text-light/80 hover:text-primary transition-colors">Interior Finishing</a>
              </li>
              <li>
                <a href="#" className="text-light/80 hover:text-primary transition-colors">Architectural Design</a>
              </li>
              <li>
                <a href="#" className="text-light/80 hover:text-primary transition-colors">Sustainable Building</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-primary" />
                <span className="text-light/80">
                  123 Construction Avenue, Building District, City, State 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <span className="text-light/80">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <span className="text-light/80">info@buildrightconstruction.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-light/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-light/60 text-sm mb-4 md:mb-0">
              &copy; {currentYear} BuildRight Construction. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-light/60 text-sm hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-light/60 text-sm hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-light/60 text-sm hover:text-primary transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

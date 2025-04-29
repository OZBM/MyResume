import React from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const ContactInfoItem = ({ icon, title, details, link, linkText }) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors">
      <div className="p-3 bg-primary/10 text-primary rounded-full h-fit">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-secondary mb-1">{title}</h3>
        <p className="text-dark/70 mb-2">{details}</p>
        {link && (
          <a 
            href={link} 
            className="inline-flex items-center text-primary hover:underline"
          >
            {linkText} <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form handling logic would go here
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-2">Contact Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Get In <span className="text-primary">Touch With Us</span>
          </h2>
          <p className="text-dark/70 text-lg">
            We're here to answer any questions about your construction needs. 
            Reach out to us and we'll respond as soon as possible.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-light p-6 md:p-8 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-bold text-secondary mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark/70 mb-1">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark/70 mb-1">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark/70 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark/70 mb-1">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="quote">Request a Quote</option>
                    <option value="information">General Information</option>
                    <option value="support">Project Support</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark/70 mb-1">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Tell us about your project or inquiry..."
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  id="consent"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-dark/70">
                  I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a> and 
                  consent to being contacted regarding my inquiry.
                </label>
              </div>
              
              <Button 
                type="submit"
                className="w-full sm:w-auto gap-2"
              >
                Send Message <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-2">
              <ContactInfoItem
                icon={<MapPin className="h-5 w-5" />}
                title="Our Location"
                details="123 Construction Avenue, Building District, City, State 12345"
                link="https://maps.google.com"
                linkText="Get Directions"
              />
              
              <ContactInfoItem
                icon={<Phone className="h-5 w-5" />}
                title="Phone Number"
                details="(555) 123-4567"
                link="tel:+15551234567"
                linkText="Call Now"
              />
              
              <ContactInfoItem
                icon={<Mail className="h-5 w-5" />}
                title="Email Address"
                details="info@buildrightconstruction.com"
                link="mailto:info@buildrightconstruction.com"
                linkText="Send Email"
              />
              
              <ContactInfoItem
                icon={<Clock className="h-5 w-5" />}
                title="Business Hours"
                details="Monday - Friday: 8:00 AM - 5:00 PM"
              />
            </div>
            
            <div className="mt-8">
              <div className="bg-secondary/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  Emergency Services
                </h3>
                <p className="text-dark/70 mb-4">
                  Need urgent construction assistance? Our emergency team is available 24/7.
                </p>
                <div className="bg-primary/10 p-3 rounded-md inline-flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">(555) 999-8888</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Map Section - Would be replaced with actual map integration */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gray-200 h-80 w-full rounded-lg flex items-center justify-center">
            <p className="text-dark/50">Interactive Map Would Be Integrated Here</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

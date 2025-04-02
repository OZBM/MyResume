"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa"; // Added FaGlobe
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real implementation, you would send the form data to your backend
    // For now, we'll just simulate a successful submission
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Removed section background, adjusted padding
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16" // Increased margin
        >
          {/* Updated heading, divider, and paragraph styles */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-dark mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary dark:bg-primary-dark mx-auto mb-6"></div>
          <p className="text-foreground/80 dark:text-dark-fg/80 max-w-xl mx-auto">
            Feel free to reach out if you want to collaborate on a project, discuss potential opportunities,
            or just want to say hello.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"> {/* Increased gap */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-visible" // Keep overflow hidden
          >
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
              <div className="relative flex h-full flex-col justify-start gap-6 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm"> {/* Use justify-start */}
                {/* Updated heading color */}
                <h3 className="text-2xl font-semibold text-primary dark:text-primary-dark">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Updated icon, label, link, and description colors */}
                  <div className="flex items-start">
                    <FaEnvelope className="text-primary dark:text-primary-dark mr-4 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-lg text-foreground dark:text-dark-fg">Email</h4>
                      <a
                        href="mailto:contact@hazenstudio.com"
                        className="text-foreground/80 dark:text-dark-fg/80 hover:text-primary dark:hover:text-primary-dark break-all"
                      >
                        contact@hazenstudio.com
                      </a>
                      <p className="text-sm text-muted-foreground dark:text-dark-fg/70 mt-1">
                        Feel free to email me anytime
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaLinkedin className="text-primary dark:text-primary-dark mr-4 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-lg text-foreground dark:text-dark-fg">LinkedIn</h4>
                      <a
                        href="https://www.linkedin.com/in/omar-zakaria-ben"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 dark:text-dark-fg/80 hover:text-primary dark:hover:text-primary-dark break-all"
                      >
                        linkedin.com/in/omar-zakaria-ben
                      </a>
                      <p className="text-sm text-muted-foreground dark:text-dark-fg/70 mt-1">
                        Connect with me professionally
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    {/* Assuming this should be a website icon, using FaGlobe as placeholder */}
                    <FaGlobe className="text-primary dark:text-primary-dark mr-4 text-xl mt-1 flex-shrink-0" /> 
                    <div>
                      <h4 className="font-medium text-lg text-foreground dark:text-dark-fg">Website</h4>
                      <a
                        href="https://hazenstudio.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 dark:text-dark-fg/80 hover:text-primary dark:hover:text-primary-dark break-all"
                      >
                        hazenstudio.com
                      </a>
                      <p className="text-sm text-muted-foreground dark:text-dark-fg/70 mt-1">
                        Visit my company website
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative overflow-visible" // Keep overflow hidden
          >
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
              <div className="relative flex h-full flex-col justify-start gap-6 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm"> {/* Use justify-start */}
                {/* Updated heading color */}
                <h3 className="text-2xl font-semibold text-primary dark:text-primary-dark">
                  Send Me a Message
                </h3>
                
                {/* Updated success message style */}
                {submitStatus === "success" ? (
                  <div className="bg-primary/10 dark:bg-primary-dark/10 border border-primary/30 dark:border-primary-dark/30 p-4 rounded-lg text-primary dark:text-primary-dark">
                    <p>Thank you for your message! I'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4"> {/* Added space-y */}
                    <div> {/* Removed mb-4 */}
                      {/* Updated label color */}
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/90 dark:text-dark-fg/90 mb-1.5">
                        Your Name
                      </label>
                      {/* Updated input styles */}
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-border rounded-md bg-background text-foreground dark:bg-dark-bg dark:text-dark-fg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                      />
                    </div>
                    
                    <div> {/* Removed mb-4 */}
                      {/* Updated label color */}
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/90 dark:text-dark-fg/90 mb-1.5">
                        Your Email
                      </label>
                      {/* Updated input styles */}
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-border rounded-md bg-background text-foreground dark:bg-dark-bg dark:text-dark-fg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                      />
                    </div>
                    
                    <div> {/* Removed mb-4 */}
                      {/* Updated label color */}
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground/90 dark:text-dark-fg/90 mb-1.5">
                        Subject
                      </label>
                      {/* Updated input styles */}
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-border rounded-md bg-background text-foreground dark:bg-dark-bg dark:text-dark-fg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                      />
                    </div>
                    
                    <div> {/* Removed mb-4 */}
                      {/* Updated label color */}
                      <label htmlFor="message" className="block text-sm font-medium text-foreground/90 dark:text-dark-fg/90 mb-1.5">
                        Message
                      </label>
                      {/* Updated textarea styles */}
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-3 border border-border rounded-md bg-background text-foreground dark:bg-dark-bg dark:text-dark-fg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                      ></textarea>
                    </div>
                    
                    {/* Updated error message style */}
                    {submitStatus === "error" && (
                      <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-lg text-destructive dark:text-destructive">
                        <p>There was an error sending your message. Please try again later.</p>
                      </div>
                    )}
                    
                    {/* Updated button styles */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full p-3 rounded-md font-medium transition-colors ${
                        isSubmitting
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-dark dark:text-primary-foreground dark:hover:bg-primary-dark/90"
                      }`}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

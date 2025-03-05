"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
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
    <section id="contact" className="py-16 bg-gray-50 dark:bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-2 mb-8"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Feel free to reach out if you want to collaborate on a project, discuss potential opportunities, 
            or just want to say hello.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden"
          >
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
                <h3 className="text-2xl font-semibold text-secondary dark:text-white mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaEnvelope className="text-primary mr-4 text-xl mt-1" />
                    <div>
                      <h4 className="font-medium text-lg text-secondary dark:text-white">Email</h4>
                      <a 
                        href="mailto:contact@hazenstudio.com" 
                        className="text-gray-600 dark:text-gray-300 hover:text-primary"
                      >
                        contact@hazenstudio.com
                      </a>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Feel free to email me anytime
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaLinkedin className="text-primary mr-4 text-xl mt-1" />
                    <div>
                      <h4 className="font-medium text-lg text-secondary dark:text-white">LinkedIn</h4>
                      <a 
                        href="https://www.linkedin.com/in/omar-zakaria-ben" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary"
                      >
                        linkedin.com/in/omar-zakaria-ben
                      </a>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Connect with me professionally
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaGithub className="text-primary mr-4 text-xl mt-1" />
                    <div>
                      <h4 className="font-medium text-lg text-secondary dark:text-white">Website</h4>
                      <a 
                        href="https://hazenstudio.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary"
                      >
                        hazenstudio.com
                      </a>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
            className="relative overflow-hidden"
          >
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
                <h3 className="text-2xl font-semibold text-secondary dark:text-white mb-6">
                  Send Me a Message
                </h3>
                
                {submitStatus === "success" ? (
                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-green-700 dark:text-green-300">
                    <p>Thank you for your message! I'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>
                    
                    {submitStatus === "error" && (
                      <div className="mb-4 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-red-700 dark:text-red-300">
                        <p>There was an error sending your message. Please try again later.</p>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full p-3 rounded-md font-medium text-white transition-colors ${
                        isSubmitting
                          ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                          : "bg-primary hover:bg-primary/90"
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

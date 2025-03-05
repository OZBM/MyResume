"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const Experience = () => {
  const experiences = [
    {
      title: "Head of Gaming Division",
      company: "Orange Tunisie",
      location: "Tunis, Tunisia Lac 1",
      period: "Oct, 2017 – April, 2022",
      responsibilities: [
        "Project Management: Oversaw video game projects from initial brainstorming to final publication.",
        "Game Development: Skilled in C, C#, Java, as well as using frameworks such as Unity and Unreal Engine.",
        "Game Design: Developing engaging game concepts, levels, and characters.",
        "Game Production: Coordinating budgets, timelines, and development teams effectively.",
        "Game Marketing: Executing marketing and communication strategies for video games.",
        "Developed an online gaming platform for Orange Tunisia, boasting over 300,000 active users.",
        "Successfully launched multiple mobile games, achieving over 1 million downloads.",
        "Organized e-sport events, drawing thousands of participants.",
        "Fostered partnerships with video game studios and independent developers.",
        "Provided training for over 100 game developers in advanced technologies and methods.",
        "Created an augmented reality game to promote tourism in Tunisia."
      ]
    },
    {
      title: "Unity Lead Programmer",
      company: "QuinQ",
      location: "Sidi Bou Said, Tunis",
      period: "Sept, 2015 – July 2017",
      responsibilities: [
        "Project Management: Designed and executed physical rehabilitation video game projects, from brainstorming to publication.",
        "Game Development: Proficient in C, C#, Java, and frameworks like Unity API and Unreal Engine.",
        "Game Design: Created game concepts, levels, and characters tailored to patients' needs. Game Production: Managed budgets, schedules, and development teams.",
        "Motion Capture Integration: Implemented motion capture systems for rehabilitation games. Healthcare Collaboration: Worked with physiotherapists and doctors to ensure the effectiveness and safety of rehabilitation games.",
        "Achievements: Developed a rehabilitation game platform for MindMaze Switzerland) with over 10,000 users.",
        "Launched successful rehabilitation games for stroke, multiple sclerosis, and sports injuries. Collaborated with healthcare institutions to implement video game-based rehabilitation programs and participated in scientific conferences and publications."
      ]
    },
    {
      title: "Software Engineer",
      company: "Ingenium",
      location: "Tunis, Tunisia Montplaisir",
      period: "Oct, 2017 – April, 2022",
      responsibilities: [
        "Project Management: Led software projects from conception to deployment at Ingenium. Software Development: Proficient in Python, Java, C, and frameworks like Django and React.",
        "Virtual Reality VR: Developed VR applications and integrated VR technologies into systems.",
        "Product Design: Designed a VR headset compatible with any smartphone. Entrepreneurship: Founded Hazen, creating a VR app store and universal VR headset.",
        "Achievements: At Ingenium, enhanced software performance and user experience. With Hazen, launched a VR app store platform and designed a universal VR headset.",
        "Managed cross-functional teams and collaborated with stakeholders for product innovation.",
        "Project Examples: Developed a VR educational platform for immersive learning and a VR app for simulating real-world training scenarios."
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 bg-gray-50 dark:bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Professional Experience</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-2 mb-8"></div>
        </motion.div>

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden"
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-primary border-l-4 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-secondary dark:text-white">
                        {exp.title}
                      </h3>
                      <h4 className="text-xl text-primary font-medium mb-2">
                        {exp.company}
                      </h4>
                    </div>
                    <div className="md:text-right">
                      <div className="flex items-center md:justify-end text-gray-600 dark:text-gray-300 mb-1">
                        <FaCalendarAlt className="mr-2" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center md:justify-end text-gray-600 dark:text-gray-300">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

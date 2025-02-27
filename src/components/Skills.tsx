"use client";

import { motion } from "framer-motion";

// Define types for our skill objects
type BasicSkill = {
  name: string;
  level: number;
  description?: undefined;
};

type SkillWithDescription = {
  name: string;
  level: number;
  description: string;
};

// Union type that can be either a basic skill or a skill with description
type Skill = BasicSkill | SkillWithDescription;

// Define type for category
type SkillCategory = {
  category: string;
  skills: Skill[];
};

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      category: "Programming & Development",
      skills: [
        { name: "Unity", level: 90 },
        { name: "C#", level: 85 },
        { name: "Management", level: 80 },
        { name: "LLM fine tuning/integration", level: 75 },
        { name: "Virtual Reality", level: 75 },
        { name: "Android Kotlin", level: 70 },
        { name: "iOS Swift", level: 50 },
        { name: "Unreal Engine", level: 40 }
      ]
    },
    {
      category: "Languages",
      skills: [
        { name: "French", level: 100, description: "Native" },
        { name: "English", level: 90, description: "Fluent" },
        { name: "Arabic", level: 85, description: "Fluent" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-2 mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-2xl font-semibold text-secondary dark:text-white mb-6">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      {skill.description ? (
                        <span className="text-primary font-medium">{skill.description}</span>
                      ) : (
                        <span className="text-primary font-medium">{skill.level}/100</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: 0.1 * skillIndex }}
                        viewport={{ once: true }}
                        className="h-2.5 rounded-full bg-primary"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 card"
        >
          <h3 className="text-2xl font-semibold text-secondary dark:text-white mb-4">
            Additional Skills & Interests
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <h4 className="font-medium text-primary mb-2">Photography</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Passionate about photography, especially film photography. Skilled in color profiles, advanced digital techniques.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <h4 className="font-medium text-primary mb-2">Technology</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Passionate about technology, statistics, electronics. Experience with oscilloscope, Raspberry Pi, and research papers.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <h4 className="font-medium text-primary mb-2">Other Interests</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Music, scuba diving, spearfishing, video games, game mechanics, and more.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
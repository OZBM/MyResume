"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

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

// Photo Gallery component
const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    // Import all photos from the Instagram PICS folder
    const importPhotos = async () => {
      try {
        const photoFiles = [
          '/images/Instagram PICS/11242756_928669347194668_784016389_n_17841502528046031.jpg',
          '/images/Instagram PICS/11254233_467215903439601_1233738469_n_17841946456046031.jpg',
          '/images/Instagram PICS/11287981_1588122558107659_1027456602_n_17841833656046031.jpg',
          '/images/Instagram PICS/11311589_831524820272039_2103592396_n_17841755092046031.jpg',
          '/images/Instagram PICS/11312264_1771058639787243_1716291026_n_17841833902046031.jpg',
          '/images/Instagram PICS/11312396_483346795162706_898454407_n_17841555742046031.jpg',
          '/images/Instagram PICS/11313727_410117469174650_1375066756_n_17841761506046031.jpg',
          '/images/Instagram PICS/11330549_1011485135543431_913053939_n_17841672589046031.jpg',
          '/images/Instagram PICS/11330790_649795088488788_1583999782_n_17841946780046031.jpg',
          '/images/Instagram PICS/11333767_1484791551811534_305982951_n_17841604744046031.jpg',
          '/images/Instagram PICS/11334503_1581231125430783_814906578_n_17841761152046031.jpg',
          '/images/Instagram PICS/11351747_1614372848803653_1003159593_n_17841939106046031.jpg'
        ];
        setPhotos(photoFiles);
      } catch (error) {
        console.error("Error loading photos:", error);
      }
    };
    
    importPhotos();
  }, []);

  const openFullscreen = (photo: string) => {
    setSelectedImage(photo);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when fullscreen is open
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  return (
    <div className="mt-4">
      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="aspect-square relative overflow-hidden rounded cursor-pointer transition-all hover:opacity-90"
            onClick={() => openFullscreen(photo)}
          >
            <Image
              src={photo}
              alt={`Photography sample ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Full size photograph"
              fill
              sizes="100vw"
              className="object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
              onClick={closeFullscreen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
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
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Passionate about photography, especially film photography. Skilled in color profiles, advanced digital techniques.
              </p>
              <PhotoGallery />
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
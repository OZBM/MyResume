"use client";

import Link from "next/link";
import { FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Omar Ben Mustapha</h3>
            <p className="text-gray-300 mb-4">
              Unity, Mobile, AI, LLM and VR Specialist
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/omar-zakaria-ben"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:contact@hazenstudio.com"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={24} />
              </a>
              <a
                href="https://hazenstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Website"
              >
                <FaGlobe size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <p className="text-gray-300 mb-2">
              Based in Tunisia
            </p>
            <p className="text-gray-300 mb-2">
              Available for relocation to France
            </p>
            <p className="text-gray-300 mb-2">
              Open to remote opportunities worldwide
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>
            &copy; {currentYear} Omar Zakaria Ben Mustapha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client";

import Link from "next/link";
import { FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Updated background, text colors, padding
    <footer className="bg-muted dark:bg-dark-card/50 text-muted-foreground py-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Name & Socials */}
          <div>
            {/* Updated heading color */}
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-dark-fg">Omar Ben Mustapha</h3>
            {/* Updated paragraph color */}
            <p className="text-sm mb-4">
              Unity, Mobile, AI, LLM and VR Specialist
            </p>
            {/* Updated icon colors and hover states */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/omar-zakaria-ben"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary dark:hover:text-primary-dark transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} /> {/* Slightly smaller icons */}
              </a>
              <a
                href="mailto:contact@hazenstudio.com"
                className="text-muted-foreground hover:text-primary dark:hover:text-primary-dark transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
              <a
                href="https://hazenstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary dark:hover:text-primary-dark transition-colors"
                aria-label="Website"
              >
                <FaGlobe size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            {/* Updated heading color */}
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-dark-fg">Quick Links</h3>
            <ul className="space-y-2 text-sm"> {/* Added text-sm */}
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary dark:hover:text-primary-dark transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="text-muted-foreground hover:text-primary dark:hover:text-primary-dark transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground hover:text-primary dark:hover:text-primary-dark transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary dark:hover:text-primary-dark transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary dark:hover:text-primary-dark transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Location */}
          <div>
             {/* Updated heading color */}
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-dark-fg">Location</h3>
             {/* Updated paragraph colors */}
            <p className="text-sm mb-2">
              Based in Tunisia
            </p>
            <p className="text-sm mb-2">
              Available for relocation to France
            </p>
            <p className="text-sm mb-2">
              Open to remote opportunities worldwide
            </p>
          </div>
        </div>

        {/* Updated border and text color */}
        <div className="border-t border-border/50 mt-10 pt-6 text-center text-xs text-muted-foreground/80">
          <p>
            &copy; {currentYear} Omar Zakaria Ben Mustapha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

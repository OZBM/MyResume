"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-card/90 dark:bg-dark-card/90 backdrop-blur-sm border-b border-border shadow-sm" // Use card colors, add border
          : "bg-transparent border-b border-transparent" // Transparent border initially
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary dark:text-primary-dark hover:opacity-80 transition-opacity">
            Omar BM
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 dark:text-dark-fg/80 hover:text-primary dark:hover:text-primary-dark transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            {/* Theme Toggle integrated into desktop nav */}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation & Theme Toggle */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              className="ml-3 text-foreground dark:text-dark-fg hover:text-primary dark:hover:text-primary-dark" // Use foreground colors
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-card dark:bg-dark-card border-t border-border shadow-lg" // Use card colors, add border
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground dark:text-dark-fg hover:text-primary dark:hover:text-primary-dark transition-colors duration-200 py-2 text-center" // Use foreground, centered text
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Theme Toggle is already outside this menu */}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;

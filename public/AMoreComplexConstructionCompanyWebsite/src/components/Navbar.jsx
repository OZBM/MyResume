import { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-primary">
              <span className="text-secondary">BUILT</span>RIGHT
            </span>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <a href="#home" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary hover:text-primary">
              Home
            </a>
            <a href="#about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary hover:text-primary">
              About Us
            </a>
            <a href="#services" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary hover:text-primary">
              Services
            </a>
            <a href="#projects" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary hover:text-primary">
              Projects
            </a>
            <a href="#testimonials" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary hover:text-primary">
              Testimonials
            </a>
            <a href="#contact" className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90">
              Contact Us
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <a href="#home" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary hover:text-primary hover:border-primary">
            Home
          </a>
          <a href="#about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary hover:text-primary hover:border-primary">
            About Us
          </a>
          <a href="#services" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary hover:text-primary hover:border-primary">
            Services
          </a>
          <a href="#projects" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary hover:text-primary hover:border-primary">
            Projects
          </a>
          <a href="#testimonials" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary hover:text-primary hover:border-primary">
            Testimonials
          </a>
          <a href="#contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary hover:bg-primary hover:text-white hover:border-primary">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

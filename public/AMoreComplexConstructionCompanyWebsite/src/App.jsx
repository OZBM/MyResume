import React from 'react'
import './index.css'

// Import components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <AboutUs />
        
        <Services />
        
        <Projects />
        
        <Testimonials />
        
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

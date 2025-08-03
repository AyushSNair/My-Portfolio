import React from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import AppShowcase from './sections/ShowcaseSection';
import About from './sections/About';
const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />

      <section className="min-h-screen" id="showcase">
        <AppShowcase />
      </section>

      <section className="min-h-screen" id="showcase">
        <About />
      </section>
      
      {/* Empty sections for spacing or future content */}
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
    </div>
  );
};

export default App;

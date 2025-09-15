import React from 'react';
import logo from '../assets/logo.jpg';

const Hero = () => {
  const scrollToSection = () => {
    document.getElementById('section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <h1>AI Agents decode books</h1>
          <p className="meta mb-4">
            Engaging  Ai conversations, deep dives, takeaways, and coaching around the best business books.
          </p>
          <button className="btn" onClick={scrollToSection}>
            View Library
          </button>
        </div>
        <div className="hero-art">
          <img src="assets/Top-1.jpg" alt="To Infinity cover" className="book-hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
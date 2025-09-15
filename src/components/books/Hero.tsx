import React from 'react';

interface HeroProps {
  title: string;
  subTitle: string;
  imageLink?: string; // Optional, if you want to use a different image
}

const Hero: React.FC<HeroProps> = ({ title, subTitle, imageLink }) => {
  const scrollToSection = () => {
    document.getElementById('section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <h1>{title}</h1>
          <p className="meta">
            {subTitle}
          </p>
          <button className="btn" onClick={scrollToSection}>
            View Catalog
          </button>
        </div>
        <div className="hero-art">
          {imageLink ? (
            <img src={imageLink} alt="Hero Art" className="book-hero" />
          ) : (
            <img src="/images/Top-1.jpg" alt="Default Hero Art" className="book-hero" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
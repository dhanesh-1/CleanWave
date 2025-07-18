import React from 'react';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import Features from '../components/Home/Features';
import Stats from '../components/Home/Stats';
import CTA from '../components/Home/CTA';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Features />
      <Stats />
      <CTA />
    </div>
  );
};

export default Home;
import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import LogoStrip from './LogoStrip';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import FAQ from './FAQ';
import CTABand from './CTABand';
import Footer from './Footer';

export default function PublicSite() {
  return (
    <div id="publicSite">
      <Navbar />
      <Hero />
      <LogoStrip />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTABand />
      <Footer />
    </div>
  );
}

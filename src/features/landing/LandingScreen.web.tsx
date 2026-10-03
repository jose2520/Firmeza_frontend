import React from 'react';
import { WebHeroSection } from './components/web/WebHeroSection';
import { WebServiceCards } from './components/web/WebServiceCards';
import { WebBenefitsSection } from './components/web/WebBenefitsSection';
import { WebLandingFooter } from './components/web/WebLandingFooter';

export function LandingScreen() {
  return (
    <div className="flex-1 w-full bg-brand-bg dark:bg-brand-navy-dark min-h-screen flex flex-col transition-colors duration-300">
      <main className="flex-1 w-full">
        <WebHeroSection />
        <WebServiceCards />
        <WebBenefitsSection />
      </main>
      <WebLandingFooter />
    </div>
  );
}

export default LandingScreen;

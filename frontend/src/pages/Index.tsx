
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        
        <section className="bg-brand-purple py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Pronto para começar?
            </motion.h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Assine agora e receba seu primeiro conjunto de brinquedos em até 3 dias úteis. Cancele quando quiser.
            </p>
            <Button asChild size="lg" className="bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90 text-lg">
              <Link to="/checkout">Assinar Agora</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

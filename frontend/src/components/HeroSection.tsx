
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 toy-pattern">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Brinquedos <span className="text-brand-purple">educativos</span> que crescem com seu filho
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Receba todo mês brinquedos selecionados por especialistas de acordo com a idade e desenvolvimento do seu filho.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" asChild className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                <Link to="/checkout">
                  Começar agora
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#como-funciona">
                  Como funciona
                </a>
              </Button>
            </motion.div>
            <motion.div 
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-white bg-gray-200"></div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-brand-purple">+2.500</span> pais felizes com nossas assinaturas
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto"
            >
              <div className="relative w-full max-w-lg mx-auto">
                <motion.div 
                  className="absolute top-0 -left-4 w-72 h-72 bg-brand-purple rounded-full mix-blend-multiply filter blur-2xl opacity-60"
                  animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 6 }}
                />
                <motion.div 
                  className="absolute top-0 -right-4 w-72 h-72 bg-brand-yellow rounded-full mix-blend-multiply filter blur-2xl opacity-60"
                  animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 8 }}
                />
                <motion.div 
                  className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-teal rounded-full mix-blend-multiply filter blur-2xl opacity-60"
                  animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 7 }}
                />
                
                <div className="relative z-10">
                  <div className="bg-white p-4 rounded-2xl shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1501286353178-1ec871814838?auto=format&fit=crop&w=600&h=500&q=80" 
                      alt="Brinquedos educativos" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  <motion.div 
                    className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                        <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Entrega gratuita</div>
                        <div className="text-xs text-muted-foreground">Em todo o Brasil</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Higienizados</div>
                        <div className="text-xs text-muted-foreground">Processo certificado</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

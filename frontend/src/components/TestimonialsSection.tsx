
import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "Os brinquedos da BrinqueCaixa transformaram a forma como meu filho brinca. Agora, ele está sempre animado para descobrir novos brinquedos a cada mês!",
    name: "Ana Silva",
    title: "Mãe de Lucas, 4 anos",
  },
  {
    quote: "Economizamos dinheiro e espaço em casa, além de sempre termos brinquedos novos e adequados para a idade do nosso filho.",
    name: "Carlos Santos",
    title: "Pai de Mateus, 3 anos",
  },
  {
    quote: "A qualidade dos brinquedos é excelente e o serviço de entrega é super pontual. Minha filha adora e eu também!",
    name: "Juliana Costa",
    title: "Mãe de Sofia, 5 anos",
  },
  {
    quote: "Como educadora, valorizo muito os brinquedos educativos bem selecionados para cada faixa etária. É perfeito para o desenvolvimento infantil.",
    name: "Patrícia Mendes",
    title: "Pedagoga e mãe de 2 crianças",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            O que as famílias estão dizendo
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Veja as experiências de quem já está aproveitando nosso serviço de assinatura.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-4">
                    <div className="bg-gray-50 rounded-xl p-6 h-full">
                      <svg
                        className="h-8 w-8 text-brand-purple mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                      </svg>
                      <blockquote className="mb-4 text-lg">
                        "{testimonial.quote}"
                      </blockquote>
                      <footer>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </footer>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

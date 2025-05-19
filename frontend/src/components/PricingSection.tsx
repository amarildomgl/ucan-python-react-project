
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plans = [
  {
    id: "basic",
    name: "Plano Básico",
    price: "R$ 99,90",
    description: "Ideal para famílias que estão começando",
    features: [
      "3 brinquedos por mês",
      "Troca mensal",
      "Brinquedos para 1 faixa etária",
      "Entrega e retirada gratuitas"
    ],
    popular: false
  },
  {
    id: "standard",
    name: "Plano Padrão",
    price: "R$ 149,90",
    description: "Nosso plano mais escolhido pelas famílias",
    features: [
      "5 brinquedos por mês",
      "Troca mensal",
      "Brinquedos para 2 faixas etárias",
      "Entrega e retirada gratuitas",
      "Acesso ao catálogo premium"
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Plano Premium",
    price: "R$ 199,90",
    description: "Para quem quer a experiência completa",
    features: [
      "8 brinquedos por mês",
      "Troca quinzenal",
      "Brinquedos para 3 faixas etárias",
      "Entrega e retirada prioritárias",
      "Acesso ao catálogo premium",
      "Brinquedos exclusivos"
    ],
    popular: false
  }
];

export const PricingSection = () => {
  return (
    <section id="planos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Escolha o plano ideal
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Planos flexíveis para atender às necessidades do seu filho e da sua família.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className={`relative h-full ${
                plan.popular ? 'border-brand-purple shadow-lg shadow-brand-purple/10' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <div className="bg-brand-yellow text-brand-dark text-xs px-3 py-1 rounded-full font-semibold">
                      Mais Popular
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/mês</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <svg 
                          className="h-5 w-5 mr-2 text-green-500" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-brand-purple hover:bg-brand-purple/90' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <Link to="/checkout">Escolher plano</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            Todos os planos incluem cancelamento flexível. Cancele quando quiser sem multas.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

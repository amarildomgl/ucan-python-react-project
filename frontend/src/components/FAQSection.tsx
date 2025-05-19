
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que acontece se um brinquedo quebrar ou perder peças?",
    answer:
      "Entendemos que acidentes acontecem. Nossa política permite um desgaste natural dos brinquedos. Em caso de dano significativo ou perda de peças essenciais, cobramos apenas uma taxa proporcional ao valor do brinquedo. Pedimos apenas que você nos informe quando isso acontecer.",
  },
  {
    question: "Como os brinquedos são higienizados?",
    answer:
      "Todos os brinquedos passam por um rigoroso processo de higienização com produtos não tóxicos e seguros para crianças. Nosso processo segue padrões hospitalares e é certificado, eliminando 99,9% dos germes e bactérias.",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer:
      "Sim! Não exigimos contratos de longo prazo. Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. Apenas solicitamos que você devolva os brinquedos que estão em sua posse no momento do cancelamento.",
  },
  {
    question: "Como são selecionados os brinquedos para cada faixa etária?",
    answer:
      "Os brinquedos são selecionados por pedagogos e especialistas em desenvolvimento infantil, garantindo que sejam adequados para estimular habilidades específicas em cada fase do desenvolvimento da criança.",
  },
  {
    question: "É possível escolher os brinquedos que quero receber?",
    answer:
      "No plano padrão, a seleção é feita por nossos especialistas com base na idade da criança. Nos planos Premium, você pode personalizar parcialmente sua seleção, escolhendo categorias de brinquedos de sua preferência.",
  },
  {
    question: "Qual o prazo de entrega dos brinquedos?",
    answer:
      "Após a confirmação da assinatura, a primeira remessa é enviada em até 3 dias úteis. As trocas seguintes são agendadas de acordo com seu plano (mensal ou quinzenal) e enviadas automaticamente.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Perguntas frequentes
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Respostas para as dúvidas mais comuns sobre nosso serviço.
          </motion.p>
        </div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

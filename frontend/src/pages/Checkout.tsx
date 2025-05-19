
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const plans = [
  {
    id: "basic",
    name: "Plano Básico",
    price: "R$ 99,90",
    description: "Acesso a 3 brinquedos por mês",
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
    description: "Acesso a 5 brinquedos por mês",
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
    description: "Acesso a 8 brinquedos por mês",
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

const Checkout = () => {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [childAge, setChildAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Assinatura realizada com sucesso!");
      navigate("/profile");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Escolha seu plano de assinatura
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <form onSubmit={handleCheckout}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Detalhes da assinatura</CardTitle>
                      <CardDescription>
                        Escolha o plano que melhor atende às necessidades do seu filho.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Escolha seu plano</Label>
                        <RadioGroup 
                          value={selectedPlan} 
                          onValueChange={setSelectedPlan}
                          className="grid grid-cols-1 gap-4"
                        >
                          {plans.map((plan) => (
                            <div key={plan.id} className="relative">
                              <RadioGroupItem 
                                value={plan.id} 
                                id={plan.id}
                                className="absolute left-4 top-4 peer sr-only"
                              />
                              <Label 
                                htmlFor={plan.id} 
                                className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer ${
                                  selectedPlan === plan.id 
                                    ? "border-brand-purple bg-brand-purple/5" 
                                    : "border-border hover:border-brand-purple/50"
                                }`}
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-bold text-lg">{plan.name}</span>
                                  <span className="font-bold text-brand-purple">{plan.price}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{plan.description}</span>
                                {plan.popular && (
                                  <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-dark text-xs px-2 py-1 rounded-full">
                                    Mais Popular
                                  </span>
                                )}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="child-age">Idade da criança</Label>
                        <Select value={childAge} onValueChange={setChildAge}>
                          <SelectTrigger id="child-age">
                            <SelectValue placeholder="Selecione a idade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-12m">0-12 meses</SelectItem>
                            <SelectItem value="1-2">1-2 anos</SelectItem>
                            <SelectItem value="3-4">3-4 anos</SelectItem>
                            <SelectItem value="5-6">5-6 anos</SelectItem>
                            <SelectItem value="7-8">7-8 anos</SelectItem>
                            <SelectItem value="9-10">9-10 anos</SelectItem>
                            <SelectItem value="11-12">11-12 anos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full bg-brand-purple hover:bg-brand-purple/90"
                        disabled={!childAge || isLoading}
                      >
                        {isLoading ? "Processando..." : "Continuar para pagamento"}
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo da assinatura</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedPlan && (
                      <>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">
                            {plans.find(p => p.id === selectedPlan)?.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {plans.find(p => p.id === selectedPlan)?.description}
                          </p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-medium mb-2">Inclui:</h4>
                          <ul className="space-y-1">
                            {plans.find(p => p.id === selectedPlan)?.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <svg 
                                  className="h-4 w-4 mr-2 text-green-500" 
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
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Mensalidade</span>
                            <span>{plans.find(p => p.id === selectedPlan)?.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxa de entrega</span>
                            <span className="text-green-500">Grátis</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total mensal</span>
                            <span>{plans.find(p => p.id === selectedPlan)?.price}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;

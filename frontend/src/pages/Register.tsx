
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Package, UserPlus } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate registration delay
    setTimeout(() => {
      // This is a mockup - would be replaced with actual registration logic
      if (name && email && password) {
        toast({
          title: "Registro completo!",
          description: "Sua conta foi criada com sucesso.",
        });
        navigate("/profile");
      } else {
        toast({
          title: "Erro no registro",
          description: "Por favor preencha todos os campos corretamente.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <Package className="h-8 w-8 text-brand-purple" />
              <span className="text-2xl font-bold font-display">BrinqueCaixa</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Crie sua conta</h1>
            <p className="text-muted-foreground mt-2">
              Comece sua jornada de aluguel de brinquedos hoje
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input 
                  id="name"
                  type="text" 
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Deve ter pelo menos 8 caracteres com letras e números
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm font-normal">
                Eu concordo com os{" "}
                <Link to="/termos" className="text-brand-purple hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link to="/privacidade" className="text-brand-purple hover:underline">
                  Política de Privacidade
                </Link>
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-brand-purple hover:bg-brand-purple/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Criar conta
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-brand-purple hover:underline font-medium">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-brand-yellow relative overflow-hidden">
        <div className="absolute inset-0 toy-pattern opacity-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl font-bold text-brand-dark">
              Assine e comece a receber brinquedos!
            </h2>
            <p className="text-brand-dark/90 text-lg max-w-md">
              Receba uma caixa de brinquedos novos todo mês e troque 
              quando seu filho quiser por outros incríveis brinquedos.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-12"
          >
            <img 
              src="/placeholder.svg" 
              alt="Brinquedos coloridos" 
              className="max-w-md rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;

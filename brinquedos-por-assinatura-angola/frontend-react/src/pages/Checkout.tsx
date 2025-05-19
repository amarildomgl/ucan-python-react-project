import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard } from "lucide-react";
import { planService } from "@/services";

const checkoutSchema = z.object({
  cardNumber: z.string().min(16, "Número de cartão inválido").max(19, "Número de cartão inválido"),
  cardName: z.string().min(3, "Nome no cartão é obrigatório"),
  expiryDate: z.string().min(5, "Data de expiração inválida").max(5, "Data de expiração inválida"),
  cvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
  address: z.string().min(5, "Endereço é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  postalCode: z.string(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// Map of plan IDs to plan details
const plans = {
  basic: {
    id: 1,
    name: "Básico",
    price: "4.900 Kz",
    description: "2 brinquedos por mês",
    color: "bg-toy-blue"
  },
  standard: {
    id: 2,
    name: "Padrão",
    price: "7.900 Kz",
    description: "4 brinquedos por mês",
    color: "bg-toy-green"
  },
  premium: {
    id: 3,
    name: "Premium",
    price: "11.900 Kz",
    description: "6 brinquedos por mês",
    color: "bg-toy-purple"
  }
};

const Checkout = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Get plan details based on planId
  const plan = planId && plans[planId as keyof typeof plans] 
    ? plans[planId as keyof typeof plans] 
    : plans.standard;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { redirectTo: `/checkout/${planId}` } });
    }
  }, [isLoggedIn, navigate, planId]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsLoading(true);
    try {
      // Call the API to process the checkout
      await planService.checkout(plan.id);
      
      setIsSuccess(true);
      
      toast({
        title: "Pagamento processado com sucesso",
        description: `Subscrição do plano ${plan.name} ativada!`,
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/perfil');
      }, 3000);
    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar o pagamento. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold">Pagamento Confirmado!</h2>
                <p className="text-gray-600">
                  Sua subscrição do plano {plan.name} foi ativada com sucesso.
                </p>
                <p className="text-gray-600">
                  Os brinquedos serão entregues no seu endereço em até 2 dias úteis.
                </p>
                <div className="pt-4">
                  <Button 
                    onClick={() => navigate('/perfil')}
                    className="w-full"
                  >
                    Ir para o perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Pagamento</CardTitle>
                <CardDescription>
                  Insira os dados do seu cartão para completar a subscrição
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center bg-gray-50 p-4 rounded-lg mb-4">
                        <CreditCard className="h-6 w-6 mr-2 text-gray-500" />
                        <span className="font-medium">Detalhes do Cartão</span>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número do Cartão</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="1234 5678 9012 3456" 
                                {...field} 
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome no Cartão</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="NOME COMO ESTÁ NO CARTÃO" 
                                {...field} 
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data de Validade</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="MM/AA" 
                                  {...field} 
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="123" 
                                  {...field} 
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center bg-gray-50 p-4 rounded-lg mb-4">
                        <span className="font-medium">Endereço de Entrega</span>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Rua, número, bairro" 
                                {...field} 
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Luanda" 
                                  {...field} 
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Código Postal (opcional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Código Postal" 
                                  {...field} 
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Processando pagamento..." : "Finalizar Pagamento"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-lg ${plan.color} bg-opacity-10 border border-opacity-20 mb-6`}>
                  <h3 className="font-bold text-lg">Plano {plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                  <p className="text-xl font-bold mt-2">{plan.price}<span className="text-sm font-normal text-gray-500">/mês</span></p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscrição mensal</span>
                    <span>{plan.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de entrega</span>
                    <span>0 Kz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de serviço</span>
                    <span>0 Kz</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{plan.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Cobrado mensalmente</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t px-6 py-4">
                <div className="w-full">
                  <p className="text-sm text-gray-600 mb-2">
                    Cliente: <span className="font-medium">{user?.nome}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: <span className="font-medium">{user?.email}</span>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

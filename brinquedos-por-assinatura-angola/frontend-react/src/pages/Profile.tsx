
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { User, Package, CreditCard, LogOut, CheckCircle, X, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { planService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const profileSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(9, "O telefone deve ter pelo menos 9 dígitos"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [cancellingSubscriptionId, setCancellingSubscriptionId] = useState<number | null>(null);
  const [isCancellingSubscription, setIsCancellingSubscription] = useState(false);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const { data: profile, isLoading: isProfileLoading, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!user) throw new Error('No user logged in');
      return await authService.getProfile();
    },
    enabled: !!user,
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: user?.nome || "",
      email: user?.email || "",
      telefone: user?.telefone || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      // This would be an API call to update the user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Sessão terminada",
      description: "Sessão terminada com sucesso.",
    });
    navigate('/');
  };

  const handleCancelSubscription = async () => {
    if (!cancellingSubscriptionId) return;
    
    setIsCancellingSubscription(true);
    try {
      const result = await planService.cancelSubscription(cancellingSubscriptionId);
      
      if (result.success) {
        toast({
          title: "Subscrição cancelada",
          description: "Sua subscrição foi cancelada com sucesso.",
        });
        // Refetch profile to update subscriptions
        refetch();
      } else {
        toast({
          title: "Erro",
          description: result.message || "Não foi possível cancelar a subscrição. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cancelar a subscrição. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCancellingSubscription(false);
      setCancellingSubscriptionId(null);
    }
  };

  // Use profile data if available, otherwise use mock data
  const activeSubscriptions = profile?.subscricoes || [];
  const hasActiveSubscription = activeSubscriptions.length > 0;

  // Mock order history
  const orderHistory = [
    {
      id: "ORD123456",
      date: "15/05/2024",
      toys: ["Puzzle Alfabeto", "Blocos de Construção", "Kit Ciência Solar", "Jogo de Memória"],
      status: "Entregue"
    },
    {
      id: "ORD123455",
      date: "15/04/2024",
      toys: ["Kit de Artes", "Jogo de Tabuleiro", "Laboratório de Química", "Robô Educativo"],
      status: "Devolvido"
    }
  ];

  if (!user) {
    return null; // Or a loading component
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="flex items-center">
              <User size={18} className="mr-2" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center">
              <CreditCard size={18} className="mr-2" />
              <span>Subscrição</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <Package size={18} className="mr-2" />
              <span>Histórico</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais aqui.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Seu nome completo" 
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="seu.email@exemplo.com" 
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
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+244 923 456 789" 
                              {...field} 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Salvando..." : "Salvar alterações"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/alterar-senha')}
                >
                  Alterar senha
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Terminar sessão</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Minha Subscrição</CardTitle>
                <CardDescription>
                  Gerencie sua subscrição atual.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isProfileLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Carregando informações...</p>
                  </div>
                ) : hasActiveSubscription ? (
                  <div className="space-y-6">
                    {activeSubscriptions.map((sub) => (
                      <div key={sub.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="mr-4 p-2 bg-green-100 rounded-full">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">Plano {sub.plano.nome}</h3>
                            <p className="text-sm text-gray-500">
                              Status: <span className="text-green-600 font-medium">Ativo</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Data de início</p>
                            <p className="font-medium">{sub.data_inicio}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Próximo pagamento</p>
                            <p className="font-medium">{sub.data_fim}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Brinquedos por mês</p>
                            <p className="font-medium">{sub.plano.quantidade_brinquedos}</p>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              className="w-full mt-6"
                              onClick={() => setCancellingSubscriptionId(sub.id)}
                            >
                              <X size={18} className="mr-2" />
                              Cancelar subscrição
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cancelar subscrição</DialogTitle>
                              <DialogDescription>
                                Tem certeza que deseja cancelar sua subscrição? Esta ação não pode ser desfeita.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start">
                              <AlertTriangle className="text-amber-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-amber-800">Atenção</h4>
                                <p className="text-amber-700 text-sm mt-1">
                                  Ao cancelar, você perderá acesso aos brinquedos no final do período atual e deverá devolver todos os brinquedos em sua posse.
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Voltar</Button>
                              </DialogClose>
                              <Button 
                                variant="destructive" 
                                onClick={handleCancelSubscription}
                                disabled={isCancellingSubscription}
                              >
                                {isCancellingSubscription ? "Processando..." : "Confirmar cancelamento"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Sem subscrição ativa</h3>
                    <p className="text-gray-500 mb-6">Você ainda não possui uma subscrição. Escolha um plano e comece a receber brinquedos!</p>
                    <Button 
                      onClick={() => navigate('/planos')}
                    >
                      Ver planos
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Brinquedos</CardTitle>
                <CardDescription>
                  Veja todos os brinquedos que você já recebeu e devolveu.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orderHistory.length > 0 ? (
                  <div className="space-y-6">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                          <div>
                            <span className="font-medium">Pedido #{order.id}</span>
                            <span className="ml-4 text-sm text-gray-500">{order.date}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Entregue" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-medium mb-2">Brinquedos:</p>
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            {order.toys.map((toy, index) => (
                              <li key={index}>{toy}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Você ainda não recebeu nenhum brinquedo.</p>
                    <Button 
                      className="mt-4"
                      onClick={() => navigate('/planos')}
                    >
                      Ver planos
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;

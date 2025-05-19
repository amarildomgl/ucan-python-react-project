
import React from "react";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Navbar } from "@/components/Navbar";
import { toast } from "sonner";
import { Calendar, Package } from "lucide-react";

const mockCurrentToys = [
  { 
    id: 1, 
    name: "Quebra-cabeça da Floresta", 
    image: "https://images.unsplash.com/photo-1501286353178-1ec871814838?auto=format&fit=crop&w=100&h=100&q=80",
    age: "3-4 anos",
    category: "Educativo",
    returnDate: "15/06/2025"
  },
  { 
    id: 2, 
    name: "Blocos de Construção", 
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=100&h=100&q=80", 
    age: "3-4 anos",
    category: "Criativo",
    returnDate: "15/06/2025"
  },
  { 
    id: 3, 
    name: "Kit de Médico", 
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=100&h=100&q=80", 
    age: "3-4 anos",
    category: "Faz de conta",
    returnDate: "15/06/2025"
  }
];

const mockPastToys = [
  { 
    id: 4, 
    name: "Jogo da Memória", 
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=100&h=100&q=80", 
    age: "3-4 anos",
    category: "Educativo",
    returnDate: "15/05/2025"
  },
  { 
    id: 5, 
    name: "Boneco de Ação", 
    image: "https://images.unsplash.com/photo-1501286353178-1ec871814838?auto=format&fit=crop&w=100&h=100&q=80", 
    age: "3-4 anos",
    category: "Diversão",
    returnDate: "15/05/2025"
  }
];

const mockUpcomingToys = [
  { 
    id: 6, 
    name: "Conjunto de Cozinha", 
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=100&h=100&q=80", 
    age: "3-4 anos",
    category: "Faz de conta",
    arrivalDate: "15/07/2025"
  },
  { 
    id: 7, 
    name: "Jogo de Tabuleiro", 
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=100&h=100&q=80", 
    age: "3-4 anos",
    category: "Educativo",
    arrivalDate: "15/07/2025"
  }
];

const Profile = () => {
  const handleCancelSubscription = () => {
    toast.success("Solicitação recebida! Entraremos em contato para confirmar o cancelamento.");
  };

  const handleExtendSubscription = () => {
    toast.success("Assinatura estendida por mais um mês!");
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
            className="max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-brand-purple text-white text-xl">MP</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Olá, Maria!</h1>
                  <p className="text-muted-foreground">maria@email.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className="bg-brand-purple hover:bg-brand-purple">Plano Padrão</Badge>
                <Badge variant="outline" className="border-brand-yellow text-brand-yellow">
                  Próxima renovação: 15/06/2025
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Brinquedos atuais</CardTitle>
                  <CardDescription>Brinquedos que estão com você</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-bold text-3xl text-brand-purple">{mockCurrentToys.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Próxima troca</CardTitle>
                  <CardDescription>Data da próxima remessa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-bold text-3xl flex items-center gap-2">
                    <Calendar className="text-brand-yellow h-6 w-6" />
                    <span>15/06/2025</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Status do envio</CardTitle>
                  <CardDescription>Situação da próxima remessa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-bold text-xl flex items-center gap-2">
                    <Package className="text-green-500 h-6 w-6" />
                    <span>Agendado</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="current" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="current">Atuais</TabsTrigger>
                    <TabsTrigger value="upcoming">Próximos</TabsTrigger>
                    <TabsTrigger value="past">Anteriores</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="current" className="space-y-4">
                    <h3 className="text-lg font-semibold">Brinquedos atuais</h3>
                    {mockCurrentToys.map((toy) => (
                      <Card key={toy.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-md overflow-hidden">
                              <img 
                                src={toy.image} 
                                alt={toy.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{toy.name}</h4>
                              <div className="flex gap-2 text-sm text-muted-foreground">
                                <span>{toy.age}</span>
                                <span>•</span>
                                <span>{toy.category}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">Devolução</div>
                              <div className="text-sm text-muted-foreground">{toy.returnDate}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="upcoming" className="space-y-4">
                    <h3 className="text-lg font-semibold">Próximos brinquedos</h3>
                    {mockUpcomingToys.map((toy) => (
                      <Card key={toy.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-md overflow-hidden">
                              <img 
                                src={toy.image} 
                                alt={toy.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{toy.name}</h4>
                              <div className="flex gap-2 text-sm text-muted-foreground">
                                <span>{toy.age}</span>
                                <span>•</span>
                                <span>{toy.category}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">Chegada</div>
                              <div className="text-sm text-muted-foreground">{toy.arrivalDate}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="past" className="space-y-4">
                    <h3 className="text-lg font-semibold">Brinquedos anteriores</h3>
                    {mockPastToys.map((toy) => (
                      <Card key={toy.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-md overflow-hidden">
                              <img 
                                src={toy.image} 
                                alt={toy.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{toy.name}</h4>
                              <div className="flex gap-2 text-sm text-muted-foreground">
                                <span>{toy.age}</span>
                                <span>•</span>
                                <span>{toy.category}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">Devolvido</div>
                              <div className="text-sm text-muted-foreground">{toy.returnDate}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Detalhes da assinatura</CardTitle>
                    <CardDescription>Seu plano atual e próximas renovações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plano</span>
                        <span className="font-medium">Plano Padrão</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Preço</span>
                        <span className="font-medium">R$ 149,90/mês</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Brinquedos</span>
                        <span className="font-medium">5 por mês</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Próxima renovação</span>
                        <span className="font-medium">15/06/2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium text-green-500">Ativo</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Idade da criança</span>
                        <Badge variant="outline">3-4 anos</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cliente desde</span>
                        <span className="font-medium">15/01/2025</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleExtendSubscription}
                    >
                      Estender assinatura
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full text-destructive hover:text-destructive border-destructive hover:border-destructive hover:bg-destructive/10"
                      onClick={handleCancelSubscription}
                    >
                      Cancelar assinatura
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

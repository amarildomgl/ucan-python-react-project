
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, ArrowLeft } from "lucide-react";
import { toyService } from "@/services";
import { Toy } from "@/services/toy-service";
import { useToast } from "@/hooks/use-toast";

const ToyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: toy, isLoading, error } = useQuery({
    queryKey: ['toy', id],
    queryFn: () => toyService.getToyById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/brinquedos')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos brinquedos
          </Button>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
            <div className="w-full md:w-1/2">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/3 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Erro ao carregar brinquedo</h2>
          <p className="mb-6 text-gray-600">Não conseguimos encontrar o brinquedo solicitado.</p>
          <Button onClick={() => navigate('/brinquedos')}>
            Ver todos os brinquedos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/brinquedos')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos brinquedos
        </Button>

        {toy && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="rounded-lg overflow-hidden border bg-white">
                <img 
                  src={toy.imagem_url || "https://images.unsplash.com/photo-1560421741-50d9c0b6c42c"} 
                  alt={toy.nome} 
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{toy.nome}</h1>
              
              <div className="flex gap-2 mb-6">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {toy.categoria}
                </Badge>
                <Badge variant="outline" className="bg-accent/10 text-accent-foreground">
                  {toy.idade_recomendada}
                </Badge>
              </div>
              
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Descrição
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{toy.descricao}</p>
                </CardContent>
              </Card>
              
              <Button 
                onClick={() => {
                  toast({
                    title: "Brinquedo adicionado à lista de desejos",
                    description: "Faça uma subscrição para receber este brinquedo"
                  });
                  navigate('/planos');
                }}
                className="w-full md:w-auto"
              >
                Quero este brinquedo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToyDetails;

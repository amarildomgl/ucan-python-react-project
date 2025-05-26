import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Toy, toyService } from "@/services/toy-service";
import publicImageService from "@/services/public-image-service";

const categories = [
  "Todos",
  "Bonecas",
  "Carrinhos",
  "Blocos de Montar",
  "Pelúcias",
  "Quebra-Cabeças",
  "Brinquedos de Faz de Conta",
  "Eletrônicos Educativos",
  "Educativos",
  "Clássicos",
  "Esportes"
];


const ageRanges = [
  "Todos",
  "0-2 anos",
  "3-5 anos",
  "6-8 anos",
  "9-12 anos"
];


const Toys = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedAgeRange, setSelectedAgeRange] = useState("Todos");

  const { data: toys = [], isLoading } = useQuery({
    queryKey: ['toys'],
    queryFn: () => toyService.getToys(),
  });

  const filteredToys = toys.filter(toy => {
    const matchesSearch = toy.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      toy.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || toy.categoria === selectedCategory;
    const matchesAgeRange = selectedAgeRange === "Todos" || toy.idade_recomendada.includes(selectedAgeRange);

    return matchesSearch && matchesCategory && matchesAgeRange;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Nossos Brinquedos</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Procurar brinquedos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <select
                className="bg-white border rounded-md px-3 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                className="bg-white border rounded-md px-3 py-2"
                value={selectedAgeRange}
                onChange={(e) => setSelectedAgeRange(e.target.value)}
              >
                {ageRanges.map(ageRange => (
                  <option key={ageRange} value={ageRange}>
                    {ageRange}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>


        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Carregando brinquedos...</p>
          </div>
        ) : filteredToys.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredToys.map(toy => (
              <div key={toy.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      toy.imagem_url
                        ? publicImageService.getImageUrl(toy.imagem_url)
                        : `/img/menina-com-papel-pintado-no-tapete-de-jogo-no-estudio.jpg`
                    }
                    alt={toy.nome}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-2">{toy.nome}</h3>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-primary bg-opacity-10 text-primary text-xs px-2 py-1 rounded-full">
                      {toy.categoria}
                    </span>
                    <span className="bg-accent bg-opacity-10 text-accent-foreground text-xs px-2 py-1 rounded-full">
                      {toy.idade_recomendada}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{toy.descricao}</p>
                  <Button
                    variant="outline"
                    className="mt-auto w-full"
                    onClick={() => navigate(`/brinquedos/${toy.id}`)}
                  >
                    Ver detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600 mb-4">
              Nenhum brinquedo encontrado.
            </h3>
            <p className="text-gray-500 mb-6">
              Tente mudar os filtros ou a busca.
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Todos");
              setSelectedAgeRange("Todos");
            }}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toys;

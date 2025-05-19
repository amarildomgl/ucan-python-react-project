
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Plans = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const subscriptionPlans = [
    {
      id: "basic",
      name: "Básico",
      price: "4.900 Kz",
      description: "Ideal para bebés e crianças até 3 anos",
      features: [
        "2 brinquedos por mês",
        "Trocas a cada 30 dias",
        "Brinquedos para desenvolvimento motor",
        "Higienização garantida",
        "Entrega gratuita em Luanda"
      ],
      limitations: [
        "Sem brinquedos avançados",
        "Sem acesso a brinquedos exclusivos"
      ],
      colorClass: "basic",
      highlightColor: "bg-toy-blue",
      btnColor: "bg-toy-blue hover:bg-toy-blue/90 text-white"
    },
    {
      id: "standard",
      name: "Padrão",
      price: "7.900 Kz",
      description: "Perfeito para crianças de 3 a 6 anos",
      features: [
        "4 brinquedos por mês",
        "Trocas a cada 30 dias",
        "Brinquedos educativos",
        "Jogos de desenvolvimento cognitivo",
        "Higienização garantida",
        "Entrega gratuita em Angola"
      ],
      limitations: [
        "Sem acesso a brinquedos exclusivos"
      ],
      colorClass: "standard",
      highlightColor: "bg-toy-green",
      btnColor: "bg-toy-green hover:bg-toy-green/90 text-white",
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      price: "11.900 Kz",
      description: "Completo para crianças de 6 a 12 anos",
      features: [
        "6 brinquedos por mês",
        "Trocas a cada 30 dias",
        "Jogos educativos avançados",
        "Kits de ciência e experimentos",
        "Brinquedos de alta qualidade",
        "Acesso a brinquedos exclusivos importados",
        "Higienização garantida",
        "Entrega prioritária em toda Angola"
      ],
      limitations: [],
      colorClass: "premium",
      highlightColor: "bg-toy-purple",
      btnColor: "bg-toy-purple hover:bg-toy-purple/90 text-white"
    }
  ];

  const handleSubscribe = (planId: string) => {
    if (isLoggedIn) {
      navigate(`/checkout/${planId}`);
    } else {
      navigate('/registar', { state: { redirectTo: `/checkout/${planId}` } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Nossos Planos</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha o plano de subscrição ideal para a idade e interesses da sua criança. 
            Todos os planos incluem entrega, higienização e troca mensal de brinquedos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {subscriptionPlans.map(plan => (
            <div 
              key={plan.id} 
              className={`subscription-card ${plan.colorClass} relative ${plan.popular ? 'transform lg:-translate-y-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-toy-green text-white py-1 px-4 rounded-full text-sm font-medium">
                  Mais Popular
                </div>
              )}
              
              <div className={`w-16 h-1 ${plan.highlightColor} mb-6 rounded-full`}></div>
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-4">
                {plan.price}
                <span className="text-sm font-normal text-gray-500 ml-1">/mês</span>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-gray-700">O que está incluído:</h4>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-medium mb-3 text-gray-700">Limitações:</h4>
                    <ul className="mb-6 space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <Button 
                className={`w-full ${plan.btnColor}`}
                onClick={() => handleSubscribe(plan.id)}
              >
                Escolher este plano
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-50 p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Perguntas Frequentes</h2>
            <p className="text-gray-600">Tudo o que você precisa saber sobre nossos planos de subscrição</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold mb-2">Como funcionam as trocas de brinquedos?</h3>
              <p className="text-gray-600">As trocas são realizadas a cada 30 dias. Nossa equipe retira os brinquedos antigos e entrega novos no mesmo dia, sem custo adicional.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold mb-2">E se algum brinquedo for danificado?</h3>
              <p className="text-gray-600">Nossos planos incluem seguro contra danos acidentais. Apenas danos intencionais ou perda total do brinquedo podem gerar custos adicionais.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold mb-2">Posso mudar de plano a qualquer momento?</h3>
              <p className="text-gray-600">Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento, e as alterações entram em vigor no próximo ciclo de faturamento.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold mb-2">Os brinquedos são higienizados?</h3>
              <p className="text-gray-600">Sim, todos os brinquedos passam por um rigoroso processo de higienização e desinfecção antes de serem enviados para uma nova criança.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;


import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Landing = () => {
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
        "Higienização garantida"
      ],
      colorClass: "basic",
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
        "Higienização garantida"
      ],
      colorClass: "standard",
      btnColor: "bg-toy-green hover:bg-toy-green/90 text-white"
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
        "Higienização garantida"
      ],
      colorClass: "premium",
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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                Brinque, Aprenda e Devolva!
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                A primeira subscrição de brinquedos em Angola. Receba brinquedos educativos de alta qualidade, use-os por um mês, e depois troque por novos!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="btn-primary text-lg"
                  onClick={() => navigate('/planos')}
                >
                  Ver planos
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg"
                  onClick={() => navigate('/brinquedos')}
                >
                  Explorar brinquedos
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full opacity-40"></div>
                <img
                  src="/img/menina-com-papel-pintado-no-tapete-de-jogo-no-estudio.jpg"
                  alt="Menina com papel pintado no tapete de jogo no estúdio"
                  className="rounded-2xl shadow-lg w-full animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Brincar nunca foi tão simples, económico e sustentável
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-toy-blue text-white flex items-center justify-center text-4xl font-bold mb-6">1</div>
              <h3 className="text-xl font-bold mb-3">Escolha um Plano</h3>
              <p className="text-gray-600">
                Selecione um plano de subscrição mensal que atenda às necessidades da sua criança.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-toy-green text-white flex items-center justify-center text-4xl font-bold mb-6">2</div>
              <h3 className="text-xl font-bold mb-3">Receba os Brinquedos</h3>
              <p className="text-gray-600">
                Entregamos brinquedos educativos e de alta qualidade diretamente em sua casa.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-toy-purple text-white flex items-center justify-center text-4xl font-bold mb-6">3</div>
              <h3 className="text-xl font-bold mb-3">Troque Mensalmente</h3>
              <p className="text-gray-600">
                Depois de um mês, devolvemos os brinquedos e enviamos novos para novas aventuras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos de Subscrição</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para a idade e interesses da sua criança
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map(plan => (
              <div key={plan.id} className={`subscription-card ${plan.colorClass}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-500 ml-1">/mês</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="mb-8 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.btnColor}`}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  Subscrever
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Dizem as Famílias</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja o que os nossos clientes dizem sobre a BrincaJá
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Margarida Silva</h4>
                  <p className="text-sm text-gray-500">Mãe de 2 filhos</p>
                </div>
              </div>
              <p className="text-gray-700">
                "A BrincaJá mudou a forma como nossos filhos brincam. Com novos brinquedos todos os meses, eles estão sempre estimulados e aprendendo coisas novas. Recomendo muito!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">João Domingos</h4>
                  <p className="text-sm text-gray-500">Pai de uma menina</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Economizo dinheiro e espaço em casa graças à BrincaJá. Minha filha sempre tem brinquedos novos e educativos, sem que eu precise comprar e acumular."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Ana Marta</h4>
                  <p className="text-sm text-gray-500">Mãe de 3 filhos</p>
                </div>
              </div>
              <p className="text-gray-700">
                "A qualidade dos brinquedos é impressionante e o serviço é impecável. Meus filhos adoram o 'dia de brinquedos novos' e eu amo a conveniência e economia."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Começar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de famílias em Angola que estão economizando dinheiro e oferecendo mais diversão aos seus filhos.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 text-lg"
            onClick={() => navigate('/registar')}
          >
            Comece sua subscrição hoje
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;

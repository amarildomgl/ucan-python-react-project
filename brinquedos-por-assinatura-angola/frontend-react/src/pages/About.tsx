
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Sobre a BrincaJá</h1>
            <p className="text-lg text-gray-700 mb-8">
              Somos a primeira plataforma de subscrição de brinquedos em Angola,
              dedicada a trazer diversão educativa e sustentável para as crianças de todo o país.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src="/img/menina-com-papel-pintado-no-tapete-de-jogo-no-estudio.jpg" alt="Crianças brincando"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
              <p className="text-gray-700 mb-4">
                A BrincaJá nasceu em 2023 com uma missão: transformar a maneira como as famílias angolanas
                consomem brinquedos. Fundada por um grupo de pais e educadores, nossa empresa surgiu da
                observação de que as crianças se cansam rapidamente dos brinquedos, enquanto os pais
                enfrentam desafios económicos e de espaço em casa.
              </p>
              <p className="text-gray-700 mb-4">
                Inspirados em modelos internacionais de sucesso, trouxemos para Angola o conceito de
                subscrição de brinquedos - uma solução económica, prática e sustentável que permite
                que as crianças tenham acesso constante a novos estímulos educativos, sem a necessidade
                de compras frequentes.
              </p>
              <p className="text-gray-700">
                Hoje, atendemos centenas de famílias em todo o país, com um catálogo de mais de 1.000
                brinquedos educativos, cuidadosamente selecionados para diferentes idades e estágios
                de desenvolvimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
            <p className="text-lg text-gray-700 mb-8">
              Promover o acesso a brinquedos educativos de qualidade para todas as crianças angolanas,
              contribuindo para seu desenvolvimento integral enquanto incentivamos o consumo consciente e sustentável.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-16 h-16 bg-toy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Qualidade</h3>
                <p className="text-gray-600 text-center">
                  Selecionamos criteriosamente os melhores brinquedos educativos do mercado.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-16 h-16 bg-toy-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Acessibilidade</h3>
                <p className="text-gray-600 text-center">
                  Tornamos brinquedos educativos acessíveis a todas as famílias angolanas.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-16 h-16 bg-toy-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Sustentabilidade</h3>
                <p className="text-gray-600 text-center">
                  Promovemos o consumo consciente e reduzimos o desperdício.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Por Que Escolher a BrincaJá?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-toy-blue bg-opacity-10 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-toy-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Economize tempo e dinheiro</h3>
                  <p className="text-gray-600">
                    Sem necessidade de compras frequentes ou preocupações com armazenamento de brinquedos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-toy-green bg-opacity-10 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-toy-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Higienização garantida</h3>
                  <p className="text-gray-600">
                    Todos os brinquedos passam por um rigoroso processo de limpeza e desinfecção.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-toy-yellow bg-opacity-10 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-toy-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Renovação constante</h3>
                  <p className="text-gray-600">
                    A cada 30 dias, seu filho recebe novos brinquedos para explorar e aprender.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-toy-purple bg-opacity-10 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-toy-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Entrega em todo Angola</h3>
                  <p className="text-gray-600">
                    Levamos os brinquedos até sua casa, onde quer que você esteja no país.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para começar?</h2>
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

export default About;

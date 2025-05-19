
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">BrincaJá</h3>
            <p className="text-gray-600">
              Brinque, aprenda e cresça com a nossa subscrição de brinquedos premium para crianças em Angola.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/brinquedos" className="text-gray-600 hover:text-primary transition-colors">
                  Brinquedos
                </Link>
              </li>
              <li>
                <Link to="/planos" className="text-gray-600 hover:text-primary transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-600 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/termos" className="text-gray-600 hover:text-primary transition-colors">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-600 hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/devolucoes" className="text-gray-600 hover:text-primary transition-colors">
                  Política de Devoluções
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="block">Email: info@brincaja.co.ao</span>
              </li>
              <li className="text-gray-600">
                <span className="block">Telefone: +244 923 456 789</span>
              </li>
              <li className="text-gray-600">
                <span className="block">Av. Comandante Valódia, Luanda</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BrincaJá. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

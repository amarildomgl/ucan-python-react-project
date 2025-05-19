
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Sessão terminada",
      description: "Sessão terminada com sucesso.",
    });
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">BrincaJá</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Início
          </Link>
          <Link to="/brinquedos" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Brinquedos
          </Link>
          <Link to="/planos" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Planos
          </Link>
          <Link to="/sobre" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Sobre Nós
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2"
                onClick={() => navigate('/perfil')}
              >
                <User size={18} />
                <span>Perfil</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Sair</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
              >
                Iniciar Sessão
              </Button>
              <Button 
                onClick={() => navigate('/registar')}
              >
                Registar
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="p-2 text-gray-700 rounded-md outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-6 space-y-4 border-t mt-4">
          <Link 
            to="/" 
            className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link 
            to="/brinquedos" 
            className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Brinquedos
          </Link>
          <Link 
            to="/planos" 
            className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Planos
          </Link>
          <Link 
            to="/sobre" 
            className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre Nós
          </Link>
          
          {isLoggedIn ? (
            <div className="space-y-2 pt-2 border-t">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  navigate('/perfil');
                  setIsMenuOpen(false);
                }}
              >
                <User size={18} className="mr-2" />
                <span>Perfil</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut size={18} className="mr-2" />
                <span>Sair</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-2 pt-2 border-t">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                Iniciar Sessão
              </Button>
              <Button 
                className="w-full"
                onClick={() => {
                  navigate('/registar');
                  setIsMenuOpen(false);
                }}
              >
                Registar
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

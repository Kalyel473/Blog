import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Shield } from "lucide-react";
import SearchBar from "./SearchBar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <Link href="/" className="font-sans font-bold text-xl md:text-2xl text-white">
              Cyber<span className="text-accent-green">Guarda</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className={`font-sans font-medium ${isActive('/') ? 'text-primary' : 'hover:text-primary transition-colors'}`}>
              Home
            </Link>
            <Link href="/category/seguranca-de-dados" className={`font-sans font-medium ${isActive('/category/seguranca-de-dados') ? 'text-primary' : 'hover:text-primary transition-colors'}`}>
              Segurança
            </Link>
            <Link href="/category/privacidade-online" className={`font-sans font-medium ${isActive('/category/privacidade-online') ? 'text-primary' : 'hover:text-primary transition-colors'}`}>
              Privacidade
            </Link>
            <Link href="/category/ameacas-e-vulnerabilidades" className={`font-sans font-medium ${isActive('/category/ameacas-e-vulnerabilidades') ? 'text-primary' : 'hover:text-primary transition-colors'}`}>
              Ameaças
            </Link>
            <Link href="/category/protecao-empresarial" className={`font-sans font-medium ${isActive('/category/protecao-empresarial') ? 'text-primary' : 'hover:text-primary transition-colors'}`}>
              Empresas
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center gap-4">
            <button className="md:hidden text-foreground" onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Search button for desktop */}
            <div className="hidden md:block">
              <SearchBar />
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="font-sans font-medium hover:text-primary transition-colors py-2 border-b border-gray-800">
                Home
              </Link>
              <Link href="/category/seguranca-de-dados" className="font-sans font-medium hover:text-primary transition-colors py-2 border-b border-gray-800">
                Segurança
              </Link>
              <Link href="/category/privacidade-online" className="font-sans font-medium hover:text-primary transition-colors py-2 border-b border-gray-800">
                Privacidade
              </Link>
              <Link href="/category/ameacas-e-vulnerabilidades" className="font-sans font-medium hover:text-primary transition-colors py-2 border-b border-gray-800">
                Ameaças
              </Link>
              <Link href="/category/protecao-empresarial" className="font-sans font-medium hover:text-primary transition-colors py-2 border-b border-gray-800">
                Empresas
              </Link>
              <div className="mt-2">
                <SearchBar />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category } from "@shared/schema";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/articles?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-secondary border-b border-gray-700">
      <nav className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <div className="text-accent text-3xl">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h1 className="text-2xl font-bold text-white font-sans">
                <span className="text-accent">Ciber</span>Proteção
              </h1>
            </a>
          </Link>
        </div>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center">
          <form onSubmit={handleSearch} className="relative w-full md:w-64 mb-4 md:mb-0 md:mr-4">
            <Input
              type="search"
              placeholder="Buscar artigos..."
              className="search-input w-full py-2 px-4 bg-primary border border-gray-700 rounded-lg text-white focus:outline-none focus:border-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="absolute right-3 top-2 text-gray-400 hover:text-white"
            >
              <i className="fas fa-search"></i>
            </Button>
          </form>
          
          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </Button>
          </div>
          
          {/* Desktop Navigation */}
          <div className={`md:flex space-x-1 md:space-x-4 ${isMobileMenuOpen ? 'flex flex-col space-y-2 w-full' : 'hidden'}`}>
            <Link href="/">
              <a className={`py-2 px-3 hover:text-accent font-medium transition duration-200 ${location === '/' ? 'text-accent' : 'text-white'}`}>
                Início
              </a>
            </Link>
            <Link href="/articles">
              <a className={`py-2 px-3 hover:text-accent font-medium transition duration-200 ${location === '/articles' ? 'text-accent' : 'text-white'}`}>
                Artigos
              </a>
            </Link>
            <Link href="/about">
              <a className={`py-2 px-3 hover:text-accent font-medium transition duration-200 ${location === '/about' ? 'text-accent' : 'text-white'}`}>
                Sobre
              </a>
            </Link>
            <Link href="/contact">
              <a className={`py-2 px-3 hover:text-accent font-medium transition duration-200 ${location === '/contact' ? 'text-accent' : 'text-white'}`}>
                Contato
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

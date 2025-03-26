import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const subscribeFooterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/subscribe", { name: "Assinante", email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Assinatura concluída",
        description: "Você foi inscrito na nossa newsletter com sucesso!",
      });
      setEmail("");
    },
    onError: (error) => {
      toast({
        title: "Erro na assinatura",
        description: error.message || "Ocorreu um erro ao tentar assinar a newsletter.",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeFooterMutation.mutate(email);
    }
  };

  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/">
              <a className="flex items-center space-x-2 mb-6">
                <div className="text-accent text-2xl">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h2 className="text-xl font-bold font-sans">
                  <span className="text-accent">Ciber</span>Proteção
                </h2>
              </a>
            </Link>
            <p className="text-gray-300 mb-6">
              Informações confiáveis e atualizadas sobre cibersegurança e privacidade digital.
            </p>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 font-sans">Navegação Rápida</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-accent transition">Página Inicial</a>
                </Link>
              </li>
              <li>
                <Link href="/articles">
                  <a className="text-gray-300 hover:text-accent transition">Artigos Recentes</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-accent transition">Sobre Nós</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-accent transition">Contato</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 font-sans">Categorias</h3>
            <ul className="space-y-3">
              {categories?.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`}>
                    <a className="text-gray-300 hover:text-accent transition">{category.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 font-sans">Contato</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <i className="fas fa-envelope text-accent mt-1 mr-3"></i>
                <span>contato@ciberprotecao.com.br</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-accent mt-1 mr-3"></i>
                <span>São Paulo, Brasil</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <h4 className="font-bold mb-3 text-white">Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <Input
                  type="email"
                  placeholder="Seu email"
                  className="bg-primary border border-gray-700 rounded-l-lg py-2 px-4 focus:outline-none focus:border-accent text-white flex-grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="default" 
                  className="bg-accent hover:bg-blue-600 text-white px-4 rounded-r-lg transition"
                  disabled={subscribeFooterMutation.isPending}
                >
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CiberProteção. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

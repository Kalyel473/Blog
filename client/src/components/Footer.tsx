import { Link } from "wouter";
import { Shield } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-2 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-sans font-bold text-xl text-white">
                Cyber<span className="text-accent-green">Guarda</span>
              </h3>
            </div>
            <p className="font-sans text-muted-foreground text-sm mb-4">
              Blog especializado em cibersegurança e privacidade online, com dicas e informações para proteger seus dados e sistemas contra ataques.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-semibold text-lg text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="font-sans text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/category/seguranca-de-dados" className="font-sans text-muted-foreground hover:text-primary transition-colors">Artigos Recentes</Link></li>
              <li><Link href="/category/privacidade-online" className="font-sans text-muted-foreground hover:text-primary transition-colors">Categorias</Link></li>
              <li><Link href="/about" className="font-sans text-muted-foreground hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contact" className="font-sans text-muted-foreground hover:text-primary transition-colors">Contato</Link></li>
              <li><Link href="/privacy-policy" className="font-sans text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-sans font-semibold text-lg text-white mb-4">Categorias</h3>
            <ul className="space-y-3">
              <li><Link href="/category/seguranca-de-dados" className="font-sans text-muted-foreground hover:text-primary transition-colors">Segurança de Dados</Link></li>
              <li><Link href="/category/privacidade-online" className="font-sans text-muted-foreground hover:text-primary transition-colors">Privacidade Online</Link></li>
              <li><Link href="/category/ameacas-e-vulnerabilidades" className="font-sans text-muted-foreground hover:text-primary transition-colors">Ameaças e Vulnerabilidades</Link></li>
              <li><Link href="/category/protecao-empresarial" className="font-sans text-muted-foreground hover:text-primary transition-colors">Proteção Empresarial</Link></li>
              <li><Link href="/category/seguranca-mobile" className="font-sans text-muted-foreground hover:text-primary transition-colors">Segurança Mobile</Link></li>
              <li><Link href="/category/ferramentas-e-reviews" className="font-sans text-muted-foreground hover:text-primary transition-colors">Ferramentas e Reviews</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-sans font-semibold text-lg text-white mb-4">Newsletter</h3>
            <p className="font-sans text-muted-foreground text-sm mb-4">Inscreva-se para receber as últimas dicas de segurança diretamente no seu email.</p>
            <NewsletterForm id="footer-newsletter-form" />
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-sans text-muted-foreground text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} CyberGuarda. Todos os direitos reservados.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="font-sans text-muted-foreground hover:text-primary text-sm transition-colors">Termos de Uso</Link>
              <Link href="/privacy-policy" className="font-sans text-muted-foreground hover:text-primary text-sm transition-colors">Política de Privacidade</Link>
              <Link href="/cookies" className="font-sans text-muted-foreground hover:text-primary text-sm transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

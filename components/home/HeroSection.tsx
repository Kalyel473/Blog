import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative bg-secondary py-12 md:py-24 border-b border-gray-700">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
            Proteja sua <span className="text-accent">presença digital</span> contra ameaças
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 font-body">
            Informações atualizadas sobre cibersegurança, privacidade online e proteção de dados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#featured">
              <a className="bg-accent hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition duration-300 text-center">
                Artigos Recentes
              </a>
            </Link>
            <Link href="#newsletter">
              <a className="bg-transparent border border-accent text-accent hover:bg-accent/10 font-medium py-3 px-6 rounded-lg transition duration-300 text-center">
                Assinar Newsletter
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent opacity-70"></div>
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/5 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Conceito de cibersegurança" 
          className="object-cover h-full w-full opacity-20 md:opacity-40"
        />
      </div>
    </section>
  );
};

export default HeroSection;

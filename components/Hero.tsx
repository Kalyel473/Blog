import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const trendingTopics = [
  { title: "Ransomware Proteção", slug: "/tag/ransomware" },
  { title: "Zero Trust Security", slug: "/tag/zero-trust" },
  { title: "Autenticação MFA", slug: "/tag/2fa" },
  { title: "Privacidade Online", slug: "/tag/vpn" },
  { title: "Segurança IoT", slug: "/tag/iot" },
];

const Hero = () => {
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });

  return (
    <section className="relative">
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b" 
          alt="Cybersecurity visualization" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/0"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="font-sans font-bold text-3xl md:text-5xl text-white mb-4">Proteja sua presença digital</h1>
              <p className="font-sans text-lg md:text-xl mb-8 text-gray-200">
                Informações e dicas essenciais sobre cibersegurança e privacidade para manter seus dados seguros no mundo digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link href="/category/seguranca-de-dados" className="bg-primary hover:bg-primary/90 text-white font-sans font-medium py-3 px-6 rounded-lg transition-colors text-center">
                  Artigos Recentes
                </Link>
                <Link href="#newsletter" className="bg-transparent border border-white hover:border-accent-green hover:text-accent-green text-white font-sans font-medium py-3 px-6 rounded-lg transition-colors text-center">
                  Receber Atualizações
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trending Topics */}
      <div className="bg-card py-3 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center overflow-x-auto whitespace-nowrap pb-2">
            <span className="font-sans font-semibold text-accent-green mr-4">Em Alta:</span>
            {trendingTopics.map((topic, index) => (
              <Link 
                key={index} 
                href={topic.slug} 
                className="inline-block mr-6 text-sm hover:text-primary transition-colors"
              >
                {topic.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

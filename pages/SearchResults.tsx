import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Link } from "wouter";
import Sidebar from "@/components/Sidebar";
import CTASection from "@/components/CTASection";

const SearchResults = () => {
  const [location] = useLocation();
  
  // Get search query from URL
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const query = searchParams.get('q') || '';
  
  // Execute search query
  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: [`/api/search?q=${encodeURIComponent(query)}`],
    enabled: query.length > 0,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-full max-w-xl" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card mb-6 rounded-xl overflow-hidden shadow-lg p-6">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <div className="flex items-center mt-4">
                  <Skeleton className="h-8 w-8 rounded-full mr-2" />
                  <Skeleton className="h-3 w-24 mr-4" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <Skeleton className="h-[600px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Empty query state
  if (!query) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-card p-8 rounded-lg border border-muted text-center max-w-3xl mx-auto">
          <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Busca</h1>
          <p className="text-muted-foreground mb-6">Digite um termo de busca para encontrar artigos relacionados.</p>
          <Link href="/" className="bg-primary hover:bg-primary/90 text-white font-sans font-medium py-2 px-6 rounded-lg transition-colors text-center inline-block">
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-card p-6 rounded-lg border border-destructive">
          <h2 className="text-lg font-semibold text-destructive mb-2">Erro na busca</h2>
          <p className="text-muted-foreground">Ocorreu um problema ao realizar a busca. Por favor, tente novamente mais tarde.</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  // No results state
  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-white mb-2">
            Resultados para: <span className="text-primary">"{query}"</span>
          </h1>
          <p className="text-muted-foreground">Nenhum resultado encontrado para sua busca.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card p-8 rounded-lg border border-muted flex flex-col items-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Sem resultados</h2>
              <p className="text-muted-foreground text-center mb-4">
                Não encontramos artigos correspondentes ao termo "{query}".
                <br />Tente buscar por termos diferentes ou navegue pelas categorias.
              </p>
              <div className="flex flex-wrap gap-3 mt-2 justify-center">
                <Link href="/category/seguranca-de-dados" className="bg-primary/10 hover:bg-primary/20 text-primary py-1.5 px-4 rounded-full text-sm transition-colors">
                  Segurança de Dados
                </Link>
                <Link href="/category/privacidade-online" className="bg-primary/10 hover:bg-primary/20 text-primary py-1.5 px-4 rounded-full text-sm transition-colors">
                  Privacidade Online
                </Link>
                <Link href="/category/ameacas-e-vulnerabilidades" className="bg-primary/10 hover:bg-primary/20 text-primary py-1.5 px-4 rounded-full text-sm transition-colors">
                  Ameaças
                </Link>
              </div>
            </div>
          </div>
          
          <Sidebar />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-white mb-2">
            Resultados para: <span className="text-primary">"{query}"</span>
          </h1>
          <p className="text-muted-foreground">
            Encontramos {searchResults.length} {searchResults.length === 1 ? 'resultado' : 'resultados'} para sua busca.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {searchResults.map((post) => (
              <article key={post.id} className="bg-card rounded-xl overflow-hidden shadow-lg p-6">
                <Link href={`/article/${post.slug}`}>
                  <h2 className="font-sans font-semibold text-xl mb-3 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="font-sans text-muted-foreground mb-4">{post.excerpt}</p>
                
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center">
                    <img 
                      src={post.authorImageUrl} 
                      alt={post.author} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm text-muted-foreground">{post.author}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.publishedDate).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    
                    <Link 
                      href={`/article/${post.slug}`} 
                      className="text-primary text-sm hover:underline"
                    >
                      Ler artigo <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
      
      {/* Newsletter CTA */}
      <CTASection />
    </>
  );
};

export default SearchResults;

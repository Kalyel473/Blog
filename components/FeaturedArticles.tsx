import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ArticleCard from "./ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedArticles = () => {
  const { data: featuredPosts, isLoading, error } = useQuery({
    queryKey: ['/api/posts/featured'],
  });

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex justify-between items-baseline">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-32 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden shadow-lg">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-5" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded-full mr-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-card p-6 rounded-lg border border-destructive">
            <h2 className="text-lg font-semibold text-destructive mb-2">Erro ao carregar artigos em destaque</h2>
            <p className="text-muted-foreground">Ocorreu um problema ao buscar os artigos. Por favor, tente novamente mais tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!featuredPosts || featuredPosts.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-white mb-8">Artigos em Destaque</h2>
          <div className="bg-card p-6 rounded-lg border border-muted">
            <p className="text-center text-muted-foreground">Nenhum artigo em destaque disponível no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex justify-between items-baseline">
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-white">Artigos em Destaque</h2>
          <Link href="/articles" className="text-primary hover:underline font-sans font-medium hidden md:block">
            Ver todos <span aria-hidden="true">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/articles" className="text-primary hover:underline font-sans font-medium">
            Ver todos os artigos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;

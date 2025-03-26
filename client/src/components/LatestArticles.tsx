import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import Sidebar from "./Sidebar";

const LatestArticles = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['/api/posts'],
  });

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-6 w-full max-w-xl" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {[1, 2, 3].map((i) => (
                <article key={i} className="bg-card rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
                  <div className="md:w-2/5">
                    <Skeleton className="h-48 md:h-full w-full" />
                  </div>
                  <div className="md:w-3/5 p-5">
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
                </article>
              ))}
            </div>
            
            <div>
              <Skeleton className="h-[600px] w-full rounded-xl" />
            </div>
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
            <h2 className="text-lg font-semibold text-destructive mb-2">Erro ao carregar artigos</h2>
            <p className="text-muted-foreground">Ocorreu um problema ao buscar os artigos. Por favor, tente novamente mais tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  // Filter out featured posts to avoid repetition
  const latestPosts = posts ? posts.filter(post => !post.isFeatured).slice(0, 3) : [];

  // Empty state
  if (latestPosts.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-white mb-8">Artigos Recentes</h2>
          <div className="bg-card p-6 rounded-lg border border-muted">
            <p className="text-center text-muted-foreground">Nenhum artigo disponível no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-white">Artigos Recentes</h2>
          <p className="font-sans text-muted-foreground mt-2">Mantenha-se atualizado com as últimas novidades em cibersegurança</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {latestPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col md:flex-row"
              >
                <div className="md:w-2/5 relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`bg-primary text-white text-xs py-1 px-2 rounded-full font-sans font-medium`}>
                      {post.categoryId === 1 ? "Segurança" : 
                       post.categoryId === 2 ? "Privacidade" : 
                       post.categoryId === 3 ? "Ameaças" : "Proteção"}
                    </span>
                  </div>
                </div>
                <div className="md:w-3/5 p-5">
                  <Link href={`/article/${post.slug}`}>
                    <h3 className="font-sans font-semibold text-xl mb-3 hover:text-primary transition-colors">{post.title}</h3>
                  </Link>
                  <p className="font-sans text-muted-foreground text-sm mb-5">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={post.authorImageUrl} 
                        alt={post.author} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.publishedDate).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
            
            <div className="text-center mt-10">
              <Link 
                href="/articles" 
                className="bg-card hover:bg-card/90 text-white font-sans font-medium py-3 px-6 rounded-lg transition-colors inline-block border border-gray-700"
              >
                Carregar mais artigos
              </Link>
            </div>
          </div>
          
          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;

import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import AdSection from "@/components/AdSection";
import CTASection from "@/components/CTASection";

const CategoryPage = () => {
  const { slug } = useParams();
  
  // Get category information
  const { data: category, isLoading: categoryLoading, error: categoryError } = useQuery({
    queryKey: [`/api/categories/${slug}`],
  });

  // Get posts for this category
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: [`/api/categories/${slug}/posts`],
    enabled: !!category,
  });

  const isLoading = categoryLoading || postsLoading;
  const error = categoryError || postsError;

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
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
          
          <div>
            <Skeleton className="h-[600px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-card p-6 rounded-lg border border-destructive">
          <h2 className="text-lg font-semibold text-destructive mb-2">Categoria não encontrada</h2>
          <p className="text-muted-foreground">A categoria que você está procurando não existe ou foi removida.</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div 
              className="inline-block text-4xl mb-6"
              style={{ color: category.color }}
            >
              {renderCategoryIcon(category.icon)}
            </div>
            <h1 className="font-sans font-bold text-3xl md:text-4xl text-white mb-4">
              {category.name}
            </h1>
            <p className="font-sans text-xl text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-card p-6 rounded-lg border border-muted text-center">
                <p className="text-muted-foreground">Nenhum artigo disponível nesta categoria.</p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
      
      {/* AdSense banner */}
      <div className="mt-8">
        <AdSection />
      </div>
      
      {/* Newsletter CTA */}
      <CTASection />
    </>
  );
};

// Helper function to render category icons
const renderCategoryIcon = (iconName: string) => {
  const icons = {
    "fa-lock": (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    "fa-user-secret": (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0112 21.35c-3.753-1.487-6.95-4.348-8.78-8.135m9.703-9.441a9.002 9.002 0 014.716 1.125m-6.947 4.76a19.945 19.945 0 015.872-2.256" />
      </svg>
    ),
    "fa-bug": (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    "fa-shield-alt": (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };
  
  return icons[iconName as keyof typeof icons] || (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export default CategoryPage;

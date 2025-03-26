import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySection = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['/api/categories'],
  });

  // Get icon component based on icon name
  const renderIcon = (iconName: string) => {
    const icons = {
      "fa-lock": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      "fa-user-secret": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0112 21.35c-3.753-1.487-6.95-4.348-8.78-8.135m9.703-9.441a9.002 9.002 0 014.716 1.125m-6.947 4.76a19.945 19.945 0 015.872-2.256" />
        </svg>
      ),
      "fa-bug": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      "fa-shield-alt": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    };
    
    // Default icon if the specified one doesn't exist
    return icons[iconName as keyof typeof icons] || (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-14 bg-card">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-10" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-background border border-gray-800 rounded-xl p-6">
                <Skeleton className="h-16 w-16 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
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
      <section className="py-14 bg-card">
        <div className="container mx-auto px-4">
          <div className="bg-card p-6 rounded-lg border border-destructive">
            <h2 className="text-lg font-semibold text-destructive mb-2">Erro ao carregar categorias</h2>
            <p className="text-muted-foreground">Ocorreu um problema ao buscar as categorias. Por favor, tente novamente mais tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!categories || categories.length === 0) {
    return (
      <section className="py-14 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-white mb-10 text-center">Explore por Categoria</h2>
          <div className="bg-background p-6 rounded-lg border border-muted">
            <p className="text-center text-muted-foreground">Nenhuma categoria disponível no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="font-sans font-bold text-2xl md:text-3xl text-white mb-10 text-center">Explore por Categoria</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`}
              className="bg-background border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary group"
            >
              <div 
                className="text-primary mb-4 group-hover:scale-110 transition-transform"
                style={{ color: category.color }}
              >
                {renderIcon(category.icon)}
              </div>
              <h3 className="font-sans font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="font-sans text-muted-foreground text-sm">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

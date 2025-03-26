import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SearchBar from "./SearchBar";
import NewsletterForm from "./NewsletterForm";
import AdSection from "./AdSection";

const Sidebar = () => {
  const { data: tags } = useQuery({
    queryKey: ['/api/tags'],
  });

  const popularTags = tags || [];

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-card rounded-xl p-5 border border-gray-800">
        <h3 className="font-sans font-semibold text-lg mb-4">Buscar</h3>
        <SearchBar />
      </div>
      
      {/* Popular Tags */}
      <div className="bg-card rounded-xl p-5 border border-gray-800">
        <h3 className="font-sans font-semibold text-lg mb-4">Tags Populares</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link 
              key={tag.id} 
              href={`/tag/${tag.slug}`} 
              className="bg-background hover:bg-primary hover:text-white text-sm py-1.5 px-3 rounded-full transition-colors"
            >
              {tag.name}
            </Link>
          ))}

          {/* If no tags, show empty state */}
          {popularTags.length === 0 && (
            <p className="text-muted-foreground text-sm">Nenhuma tag disponível.</p>
          )}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-card rounded-xl p-5 border border-gray-800">
        <h3 className="font-sans font-semibold text-lg mb-2">Receba Atualizações</h3>
        <p className="font-sans text-muted-foreground text-sm mb-4">
          Inscreva-se para receber as últimas dicas de segurança diretamente no seu email.
        </p>
        <NewsletterForm id="sidebar-newsletter-form" />
      </div>
      
      {/* Ad Space */}
      <AdSection placement="sidebar" />
    </aside>
  );
};

export default Sidebar;

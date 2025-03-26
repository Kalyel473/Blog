import { Link } from "wouter";
import { Post } from "@shared/schema";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ArticleCardProps {
  post: Post & { categoryName?: string };
}

const ArticleCard = ({ post }: ArticleCardProps) => {
  const formattedDate = format(new Date(post.createdAt), 'd MMM yyyy', { locale: ptBR });
  
  const getCategoryColor = (categoryName?: string) => {
    if (!categoryName) return "bg-accent";
    
    const colorMap: Record<string, string> = {
      "Segurança de Dados": "bg-highlight",
      "Privacidade Online": "bg-warning",
      "Hacking Ético": "bg-accent",
      "Proteção de Identidade": "bg-danger",
      "Notícias": "bg-purple-500",
    };
    
    return colorMap[categoryName] || "bg-accent";
  };

  return (
    <article className="article-card bg-secondary rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`${getCategoryColor(post.categoryName)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {post.categoryName || "Categoria"}
          </span>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-3 font-sans">{post.title}</h3>
        <p className="text-gray-300 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center text-sm text-gray-400 mt-auto pt-4">
          <span className="mr-4"><i className="far fa-calendar-alt mr-1"></i> {formattedDate}</span>
          <span><i className="far fa-clock mr-1"></i> {post.readTime} min leitura</span>
        </div>
      </div>
      <Link href={`/posts/${post.slug}`}>
        <a className="block p-4 text-accent text-center border-t border-gray-700 font-medium hover:bg-primary/30 transition">
          Continuar Lendo <i className="fas fa-arrow-right ml-1"></i>
        </a>
      </Link>
    </article>
  );
};

export default ArticleCard;

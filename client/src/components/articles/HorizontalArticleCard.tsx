import { Link } from "wouter";
import { Post } from "@shared/schema";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HorizontalArticleCardProps {
  post: Post & { categoryName?: string };
}

const HorizontalArticleCard = ({ post }: HorizontalArticleCardProps) => {
  const formattedDate = format(new Date(post.createdAt), 'd MMM yyyy', { locale: ptBR });
  
  const getCategoryColor = (categoryName?: string) => {
    if (!categoryName) return "bg-accent";
    
    const colorMap: Record<string, string> = {
      "Segurança de Dados": "bg-highlight",
      "Privacidade Online": "bg-warning",
      "Hacking Ético": "bg-accent",
      "Proteção de Identidade": "bg-danger",
      "Notícias": "bg-purple-500",
      "Ameaças": "bg-danger",
      "Guia Prático": "bg-highlight",
      "Privacidade": "bg-warning",
    };
    
    return colorMap[categoryName] || "bg-accent";
  };

  return (
    <article className="mb-8 bg-secondary rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row">
      <div className="md:w-1/3 h-48 md:h-auto relative">
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
      <div className="p-6 md:w-2/3">
        <h3 className="text-xl font-bold mb-3 font-sans">{post.title}</h3>
        <p className="text-gray-300 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <span className="mr-4"><i className="far fa-calendar-alt mr-1"></i> {formattedDate}</span>
          <span className="mr-4"><i className="far fa-clock mr-1"></i> {post.readTime} min leitura</span>
          <span><i className="far fa-eye mr-1"></i> {post.views} visualizações</span>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <a className="text-accent font-medium hover:underline">
            Continuar Lendo <i className="fas fa-arrow-right ml-1"></i>
          </a>
        </Link>
      </div>
    </article>
  );
};

export default HorizontalArticleCard;

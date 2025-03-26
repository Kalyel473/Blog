import { Link } from "wouter";

type ArticleCardProps = {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    imageUrl: string;
    categoryId: number;
    author: string;
    authorImageUrl: string;
    publishedDate: string;
  };
};

const ArticleCard = ({ post }: ArticleCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span 
            className={`text-white text-xs py-1 px-2 rounded-full font-sans font-medium ${
              post.categoryId === 1 ? "bg-primary" : 
              post.categoryId === 2 ? "bg-accent-green" : 
              post.categoryId === 3 ? "bg-orange-500" : 
              "bg-primary"
            }`}
          >
            {post.categoryId === 1 ? "Segurança" : 
             post.categoryId === 2 ? "Privacidade" : 
             post.categoryId === 3 ? "Ameaças" : 
             "Proteção"}
          </span>
        </div>
      </div>
      <div className="p-5">
        <Link href={`/article/${post.slug}`}>
          <h3 className="font-sans font-semibold text-xl mb-3 hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="font-sans text-muted-foreground text-sm mb-5">
          {post.excerpt}
        </p>
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
    </div>
  );
};

export default ArticleCard;

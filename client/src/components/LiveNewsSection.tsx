import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NewsSource {
  name: string;
}

interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: NewsSource;
}

const LiveNewsSection = () => {
  // Estado para controlar a exibição do carregamento durante atualização manual
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Buscar as notícias de cibersegurança
  const { 
    data: newsData, 
    isLoading, 
    error, 
    refetch 
  } = useQuery<NewsArticle[]>({
    queryKey: ['/api/news/cyber'],
  });
  
  // Garantir que news seja sempre um array
  const news = Array.isArray(newsData) ? newsData : [];
  
  // Função para atualizar as notícias manualmente
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // Estado de carregamento
  if (isLoading || isRefreshing) {
    return (
      <div className="bg-card/40 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-3" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-28 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className="bg-card/40 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="text-destructive">Erro ao carregar notícias</span>
        </h2>
        <p className="text-muted-foreground mb-3">
          Não foi possível carregar as últimas notícias de cibersegurança.
        </p>
        <Button 
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="mt-2"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Tentar novamente
        </Button>
      </div>
    );
  }

  // Sem resultados
  if (!news || news.length === 0) {
    return (
      <div className="bg-card/40 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span>Notícias de Cibersegurança</span>
        </h2>
        <p className="text-muted-foreground mb-3">
          Nenhuma notícia disponível no momento.
        </p>
        <Button 
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="mt-2"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card/40 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          <span className="mr-2">Notícias de Cibersegurança</span>
          <Badge variant="outline" className="text-xs">Ao vivo</Badge>
        </h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="rounded-full h-9 w-9"
          title="Atualizar notícias"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {news.map((article: NewsArticle, index: number) => (
          <div key={index} className="border border-border hover:border-primary hover:bg-card/60 rounded-lg p-4 transition-colors">
            <h3 className="font-bold text-sm mb-2 line-clamp-2">
              {article.title}
            </h3>
            
            {article.description && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {article.description}
              </p>
            )}
            
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center">
                <span className="text-muted-foreground">
                  {article.source.name} • {formatDistanceToNow(new Date(article.publishedAt), { locale: ptBR, addSuffix: true })}
                </span>
              </div>
              
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline"
              >
                Ler mais
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveNewsSection;
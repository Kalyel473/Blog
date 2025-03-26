import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Sidebar from "@/components/Sidebar";
import AdSection from "@/components/AdSection";
import CTASection from "@/components/CTASection";
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ArticlePage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const { data: postData, isLoading, error } = useQuery({
    queryKey: [`/api/posts/${slug}`],
  });

  // Related posts query based on category
  const { data: categoryPosts } = useQuery({
    queryKey: ['/api/categories', postData?.category?.id, 'posts'],
    enabled: !!postData?.category?.id,
  });

  const relatedPosts = categoryPosts 
    ? categoryPosts
        .filter((post: any) => post.id !== postData?.id) // Exclude current post
        .slice(0, 3) // Limit to 3 posts
    : [];

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Share functions
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = postData?.title || 'CyberGuarda - Blog de Cybersegurança';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link copiado!",
      description: "O link do artigo foi copiado para a área de transferência.",
    });
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl overflow-hidden">
              <Skeleton className="h-[400px] w-full" />
              <div className="p-8">
                <Skeleton className="h-12 w-3/4 mb-4" />
                <div className="flex items-center mb-6">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-3/4 mb-8" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <Skeleton className="h-[600px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !postData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-card p-6 rounded-lg border border-destructive">
          <h2 className="text-lg font-semibold text-destructive mb-2">Artigo não encontrado</h2>
          <p className="text-muted-foreground">O artigo que você está procurando não existe ou foi removido.</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  // Format published date
  const publishedDate = new Date(postData.publishedDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Convert markdown content to HTML
  // In a real implementation, you would use a markdown parser like react-markdown
  // But for simplicity, we'll just display it with pre-formatted white-space
  const formatContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>;
      } else if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{paragraph.substring(3)}</h2>;
      } else if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold mt-5 mb-2">{paragraph.substring(4)}</h3>;
      } else if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').map((item, i) => (
          <li key={i} className="ml-6 mb-1">{item.substring(2)}</li>
        ));
        return <ul key={index} className="list-disc my-4">{items}</ul>;
      } else {
        return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
      }
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-card rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-[400px]">
                <img 
                  src={postData.imageUrl} 
                  alt={postData.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Link 
                    href={`/category/${postData.category?.slug}`}
                    className={`text-white text-sm py-1.5 px-3 rounded-full font-sans font-medium`}
                    style={{ backgroundColor: postData.category?.color || '#0077B6' }}
                  >
                    {postData.category?.name || 'Categoria'}
                  </Link>
                </div>
              </div>
              
              <div className="p-8">
                <h1 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-6">
                  {postData.title}
                </h1>
                
                <div className="flex items-center mb-8">
                  <img 
                    src={postData.authorImageUrl} 
                    alt={postData.author} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-sans font-medium text-foreground">{postData.author}</p>
                    <p className="text-sm text-muted-foreground">{publishedDate}</p>
                  </div>
                </div>
                
                {/* Social sharing */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <div className="text-muted-foreground flex items-center mr-2">
                    <Share2 className="w-4 h-4 mr-1" />
                    <span className="text-sm">Compartilhar:</span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full px-3 py-1 h-8 text-xs"
                    onClick={handleFacebookShare}
                  >
                    <Facebook className="w-4 h-4 mr-1" />
                    Facebook
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full px-3 py-1 h-8 text-xs"
                    onClick={handleTwitterShare}
                  >
                    <Twitter className="w-4 h-4 mr-1" />
                    Twitter
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full px-3 py-1 h-8 text-xs"
                    onClick={handleLinkedInShare}
                  >
                    <Linkedin className="w-4 h-4 mr-1" />
                    LinkedIn
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full px-3 py-1 h-8 text-xs"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copiar link
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Article content */}
                <div className="prose prose-invert max-w-none">
                  {formatContent(postData.content)}
                </div>
                
                {/* Tags */}
                {postData.tags && postData.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-gray-800">
                    <h4 className="font-sans font-medium mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {postData.tags.map((tag: any) => (
                        <Link 
                          key={tag.id} 
                          href={`/tag/${tag.slug}`}
                          className="bg-muted hover:bg-primary hover:text-white text-sm py-1.5 px-3 rounded-full transition-colors"
                        >
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
            
            {/* AdSense banner */}
            <div className="mt-8">
              <AdSection />
            </div>
            
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h3 className="font-sans font-bold text-2xl mb-6">Artigos Relacionados</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((post: any) => (
                    <Link key={post.id} href={`/article/${post.slug}`}>
                      <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-sans font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {new Date(post.publishedDate).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
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

export default ArticlePage;

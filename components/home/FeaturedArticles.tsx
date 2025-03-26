import { useQuery } from "@tanstack/react-query";
import { Post, Category } from "@shared/schema";
import ArticleCard from "@/components/articles/ArticleCard";
import { useState, useEffect } from "react";

const FeaturedArticles = () => {
  const { data: featuredPosts, isLoading: isLoadingPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts/featured", 3],
    queryFn: async ({ queryKey }) => {
      const [url, limit] = queryKey;
      const res = await fetch(`${url}?limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch featured posts");
      return res.json();
    },
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const [postsWithCategories, setPostsWithCategories] = useState<(Post & { categoryName: string })[]>([]);

  useEffect(() => {
    if (featuredPosts && categories) {
      const enrichedPosts = featuredPosts.map(post => {
        const category = categories.find(cat => cat.id === post.categoryId);
        return {
          ...post,
          categoryName: category ? category.name : 'Categoria Desconhecida'
        };
      });
      setPostsWithCategories(enrichedPosts);
    }
  }, [featuredPosts, categories]);

  const isLoading = isLoadingPosts || isLoadingCategories;

  return (
    <section id="featured" className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 font-sans text-center">
          Artigos <span className="text-accent">Em Destaque</span>
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-secondary rounded-xl overflow-hidden shadow-lg h-full">
                <div className="h-48 bg-gray-700 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-7 bg-gray-700 rounded animate-pulse mb-3"></div>
                  <div className="h-16 bg-gray-700 rounded animate-pulse mb-4"></div>
                  <div className="h-5 bg-gray-700 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsWithCategories.map(post => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArticles;

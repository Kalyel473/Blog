import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Post, Category } from "@shared/schema";
import HorizontalArticleCard from "@/components/articles/HorizontalArticleCard";
import AboutSection from "@/components/sidebar/AboutSection";
import Newsletter from "@/components/sidebar/Newsletter";
import PopularTags from "@/components/sidebar/PopularTags";
import AdSense from "@/components/sidebar/AdSense";
import PopularPosts from "@/components/sidebar/PopularPosts";
import { useState, useEffect } from "react";

const MainContent = () => {
  const [location] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState("newest");
  const postsPerPage = 3;

  const { data: posts, isLoading: isLoadingPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts", postsPerPage, (currentPage - 1) * postsPerPage, sorting],
    queryFn: async ({ queryKey }) => {
      const [url, limit, offset] = queryKey;
      const res = await fetch(`${url}?limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: totalPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
    enabled: false, // Don't fetch all posts, just for total count
  });

  const [postsWithCategories, setPostsWithCategories] = useState<(Post & { categoryName: string })[]>([]);

  useEffect(() => {
    if (posts && categories) {
      const enrichedPosts = posts.map(post => {
        const category = categories.find(cat => cat.id === post.categoryId);
        return {
          ...post,
          categoryName: category ? category.name : 'Categoria Desconhecida'
        };
      });
      setPostsWithCategories(enrichedPosts);
    }
  }, [posts, categories]);

  const isLoading = isLoadingPosts || isLoadingCategories;
  const totalPages = totalPosts ? Math.ceil(totalPosts.length / postsPerPage) : 5; // Default to 5 pages if we don't know

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Articles Column */}
          <div className="w-full lg:w-2/3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold font-sans">Artigos <span className="text-accent">Recentes</span></h2>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Ordenar por:</span>
                <select 
                  className="bg-secondary text-white rounded-lg border border-gray-700 py-1 px-3"
                  value={sorting}
                  onChange={(e) => setSorting(e.target.value)}
                >
                  <option value="newest">Mais recentes</option>
                  <option value="popular">Mais populares</option>
                  <option value="relevant">Mais relevantes</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-8">
                {Array(3).fill(0).map((_, index) => (
                  <div key={index} className="mb-8 bg-secondary rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 bg-gray-700 animate-pulse"></div>
                    <div className="p-6 md:w-2/3">
                      <div className="h-7 bg-gray-700 rounded animate-pulse mb-3"></div>
                      <div className="h-16 bg-gray-700 rounded animate-pulse mb-4"></div>
                      <div className="h-5 bg-gray-700 rounded animate-pulse w-1/2 mb-4"></div>
                      <div className="h-5 bg-gray-700 rounded animate-pulse w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {postsWithCategories.map(post => (
                  <HorizontalArticleCard key={post.id} post={post} />
                ))}
              </>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex space-x-2" aria-label="Pagination">
                <Button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-accent transition duration-200"
                >
                  Anterior
                </Button>
                
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <Button
                      key={i}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === pageNumber 
                          ? 'bg-accent text-white font-medium' 
                          : 'bg-secondary text-white hover:bg-accent transition duration-200'
                      }`}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                
                {totalPages > 5 && <span className="px-4 py-2 text-gray-500">...</span>}
                
                {totalPages > 5 && (
                  <Button
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages 
                        ? 'bg-accent text-white font-medium' 
                        : 'bg-secondary text-white hover:bg-accent transition duration-200'
                    }`}
                  >
                    {totalPages}
                  </Button>
                )}
                
                <Button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-accent transition duration-200"
                >
                  Próxima
                </Button>
              </nav>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="w-full lg:w-1/3">
            <AboutSection />
            <Newsletter />
            <PopularTags />
            <AdSense />
            <PopularPosts />
          </div>
        </div>
      </div>
    </section>
  );
};

const Button = ({ 
  children, 
  onClick, 
  disabled, 
  className 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  disabled?: boolean; 
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

export default MainContent;

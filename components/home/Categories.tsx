import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category } from "@shared/schema";

const Categories = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="w-28 h-10 bg-secondary/50 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/articles">
            <a className="category-badge px-6 py-3 rounded-full bg-secondary text-white hover:bg-accent transition duration-300">
              Todos os Artigos
            </a>
          </Link>
          
          {categories?.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <a className="category-badge px-6 py-3 rounded-full bg-secondary text-white hover:bg-accent transition duration-300">
                {category.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

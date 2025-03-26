import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Tag } from "@shared/schema";

const PopularTags = () => {
  const { data: tags, isLoading } = useQuery<Tag[]>({
    queryKey: ["/api/tags"],
  });

  if (isLoading) {
    return (
      <div className="bg-secondary rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 font-sans">Tags Populares</h3>
        <div className="flex flex-wrap gap-2">
          {Array(10).fill(0).map((_, index) => (
            <div key={index} className="bg-primary/50 w-20 h-6 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 font-sans">Tags Populares</h3>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <Link key={tag.id} href={`/tag/${tag.slug}`}>
            <a className="bg-primary px-3 py-1 rounded-full text-sm hover:bg-accent transition duration-200">
              #{tag.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;

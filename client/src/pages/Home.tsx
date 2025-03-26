import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import CategorySection from "@/components/CategorySection";
import AdSection from "@/components/AdSection";
import LatestArticles from "@/components/LatestArticles";
import CTASection from "@/components/CTASection";
import LiveNewsSection from "@/components/LiveNewsSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedArticles />
      
      {/* Seção de notícias em tempo real */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="font-sans font-bold text-2xl md:text-3xl text-white mb-8">
          Notícias em Tempo Real
        </h2>
        <LiveNewsSection />
      </div>
      
      <CategorySection />
      <AdSection />
      <LatestArticles />
      <CTASection />
    </div>
  );
};

export default Home;

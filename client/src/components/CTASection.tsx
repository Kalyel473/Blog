import NewsletterForm from "./NewsletterForm";

const CTASection = () => {
  return (
    <section className="py-16 bg-card" id="newsletter">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-accent-green rounded-xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-48 h-48 absolute top-1/2 right-10 transform -translate-y-1/2"
            >
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="max-w-2xl relative z-10">
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-white mb-4">
              Mantenha-se atualizado sobre ameaças emergentes
            </h2>
            <p className="font-sans text-gray-200 mb-8">
              Receba alertas e dicas de segurança diretamente no seu email e seja o primeiro a saber sobre as novas vulnerabilidades e como se proteger.
            </p>
            <NewsletterForm id="cta-form" variant="cta" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import { Link } from "wouter";

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-secondary to-primary border border-gray-700 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <h2 className="text-3xl font-bold font-sans mb-4">Proteja-se com <span className="text-accent">Conhecimento</span></h2>
            <p className="text-xl text-gray-300 mb-8">
              Nossos especialistas compartilham dicas, guias e análises para mantê-lo seguro no mundo digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/articles">
                <a className="bg-accent hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-lg transition duration-300 text-center">
                  Explorar Artigos
                </a>
              </Link>
              <Link href="#newsletter">
                <a className="bg-transparent border border-gray-600 hover:border-accent text-white hover:text-accent font-medium py-3 px-8 rounded-lg transition duration-300 text-center">
                  Assinar Newsletter
                </a>
              </Link>
            </div>
          </div>
          
          <div className="absolute right-0 bottom-0 opacity-10 text-[300px] -mr-10 -mb-16">
            <i className="fas fa-shield-alt"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

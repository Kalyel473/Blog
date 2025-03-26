import { Link } from "wouter";

const AboutSection = () => {
  return (
    <div className="bg-secondary rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 font-sans">Sobre o Blog</h3>
      <p className="text-gray-300 mb-4">
        CiberProteção é seu destino para informações atualizadas sobre segurança cibernética e proteção da privacidade online. Nosso objetivo é tornar o conhecimento sobre segurança acessível a todos.
      </p>
      <div className="flex space-x-3 mt-4">
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition">
          <i className="fab fa-twitter fa-lg"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition">
          <i className="fab fa-facebook fa-lg"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition">
          <i className="fab fa-linkedin fa-lg"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition">
          <i className="fab fa-youtube fa-lg"></i>
        </a>
      </div>
    </div>
  );
};

export default AboutSection;

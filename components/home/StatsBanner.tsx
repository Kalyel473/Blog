const StatsBanner = () => {
  return (
    <section className="bg-secondary py-16 border-t border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-sans mb-4">Por Que a <span className="text-accent">Cibersegurança</span> Importa</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Os ataques cibernéticos estão aumentando em frequência e sofisticação. Confira alguns dados alarmantes:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-primary rounded-xl">
            <div className="text-4xl font-bold text-accent mb-2">+300%</div>
            <p className="text-gray-300">Aumento nos ataques de ransomware nos últimos 3 anos</p>
          </div>
          
          <div className="text-center p-6 bg-primary rounded-xl">
            <div className="text-4xl font-bold text-accent mb-2">$6tri</div>
            <p className="text-gray-300">Custo global estimado de crimes cibernéticos até 2025</p>
          </div>
          
          <div className="text-center p-6 bg-primary rounded-xl">
            <div className="text-4xl font-bold text-accent mb-2">43%</div>
            <p className="text-gray-300">Dos ataques visam pequenas empresas e indivíduos</p>
          </div>
          
          <div className="text-center p-6 bg-primary rounded-xl">
            <div className="text-4xl font-bold text-accent mb-2">95%</div>
            <p className="text-gray-300">Das violações de dados são causadas por erro humano</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;

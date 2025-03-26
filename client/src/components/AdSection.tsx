const AdSection = ({ placement = "horizontal" }: { placement?: "horizontal" | "sidebar" }) => {
  return (
    <section className={`${placement === "horizontal" ? "py-10" : ""}`}>
      <div className={`${placement === "horizontal" ? "container mx-auto px-4" : ""}`}>
        <div className={`bg-card rounded-xl p-6 border border-gray-800 text-center`}>
          <div className={`${placement === "horizontal" ? "max-w-4xl mx-auto" : ""}`}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">ANÚNCIO PATROCINADO</p>
            <div 
              className={`bg-muted py-${placement === "horizontal" ? "20" : "16"} rounded-lg flex items-center justify-center`}
              id={`ad-container-${placement}`}
            >
              {/* AdSense will be inserted here by script */}
              <p className="text-muted-foreground">Espaço reservado para anúncios</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdSection;

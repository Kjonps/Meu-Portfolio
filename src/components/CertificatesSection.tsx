import { Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const certificates = [
  { title: "Trilha Digital/ Coders 2024/ Dev Ops", titleEn: "Example Certification 1", issuer: "Ada Tech", year: "2024" },
  { title: "Inglês - Nível Avançado/ Book W4 - W12 (Equivalente a C1 no Quadro Comum Europeu) ", titleEn: "Example Certification 2", issuer: "Wizard Idiomas", year: "2016 - 2021" }, 
];

const CertificatesSection = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="certificados" className="section-padding border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">{t("cert.label")}</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-16">
          {t("cert.title")}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <div
              key={i}
              className="group p-6 bg-card border border-border rounded-sm hover:border-primary/40 transition-all duration-300"
            >
              <Award className="w-8 h-8 text-primary/60 mb-4 group-hover:text-primary transition-colors" />
              <h3 className="text-foreground font-body font-semibold mb-1">
                {lang === "en" ? cert.titleEn : cert.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm">{cert.issuer}</p>
              <p className="text-primary/60 font-body text-xs mt-2">{cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;

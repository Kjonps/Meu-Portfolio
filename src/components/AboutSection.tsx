import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { number: "+2", label: t("about.stat1") },
    { number: "+6", label: t("about.stat2") },
    { number: "+2", label: t("about.stat3") },
    { number: "+4", label: t("about.stat4") },
  ];

  return (
    <section id="sobre" className="section-padding border-t border-border">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">{t("about.label")}</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            {t("about.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-sm bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <p className="text-3xl font-display font-bold text-gradient mb-1">{stat.number}</p>
              <p className="text-muted-foreground text-sm font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

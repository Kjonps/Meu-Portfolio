import { useLanguage } from "@/contexts/LanguageContext";

const ExperienceSection = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      type: t("exp.professional"),
      items: [
        { period: "2022 — Present", role: t("exp.role1"), company: t("exp.company1"), description: t("exp.desc1") },
        { period: "2020 — 2022", role: t("exp.role2"), company: t("exp.company2"), description: t("exp.desc2") },
      ],
    },
    {
      type: t("exp.academic"),
      items: [
        { period: "2018 — 2022", role: t("exp.role3"), company: t("exp.company3"), description: t("exp.desc3") },
        { period: "2023", role: t("exp.role4"), company: t("exp.company4"), description: t("exp.desc4") },
      ],
    },
  ];

  return (
    <section id="experiencia" className="section-padding border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">{t("exp.label")}</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-16">
          {t("exp.title")}
        </h2>

        <div className="space-y-16">
          {experiences.map((group) => (
            <div key={group.type}>
              <h3 className="text-primary font-display text-xl font-semibold mb-8 pb-2 border-b border-primary/20 inline-block">
                {group.type}
              </h3>
              <div className="space-y-0">
                {group.items.map((item, i) => (
                  <div
                    key={i}
                    className="group grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-8 border-b border-border last:border-b-0 hover:bg-card/50 transition-colors -mx-4 px-4 rounded-sm"
                  >
                    <p className="text-muted-foreground font-body text-sm pt-1">{item.period}</p>
                    <div>
                      <h4 className="text-foreground font-body font-semibold text-lg group-hover:text-primary transition-colors">
                        {item.role}
                      </h4>
                      <p className="text-primary/80 font-body text-sm mb-2">{item.company}</p>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

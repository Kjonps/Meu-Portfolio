import { Mail, Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contato" className="section-padding border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">{t("contact.label")}</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
          {t("contact.title")}
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-10 max-w-lg mx-auto">
          {t("contact.desc")}
        </p>

        <div className="flex justify-center gap-6 mb-16 flex-wrap">
          {[
            { icon: Mail, label: "Email", href: "mailto:jonasrmartins17@gmail.com" },
            { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/jonas-martins-158544178" },
            { icon: Github, label: "GitHub", href: "https://github.com/Kjonps" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors font-body text-sm"
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mb-16 pt-8 border-t border-border">
          <ContactForm />
        </div>
      </div>

      <div className="border-t border-border pt-8 text-center">
        <p className="text-muted-foreground/50 font-body text-xs">
          © {new Date().getFullYear()} — {t("contact.footer")}
        </p>
      </div>
    </section>
  );
};

export default ContactSection;

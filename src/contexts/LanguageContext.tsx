import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "pt" | "en";

const translations = {
  pt: {
    // Navbar
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.projects": "Projetos",
    "nav.certificates": "Certificados",
    "nav.contact": "Contato",
    // Hero
    "hero.subtitle": "Portfólio Profissional",
    "hero.name": "Jonas",
    "hero.highlight": "Martins",
    "hero.description": "Sou estudante de Engenharia de Software e estou no 5º período, construindo minha experiência principalmente por meio de projetos práticos. Já desenvolvi sistemas web, trabalhei com banco de dados, participei de iniciativas usando metodologias ágeis e tive contato com IA em pesquisa acadêmica. Minha trajetória profissional começou antes da área de tecnologia, passando por tradução e ensino, o que me ajudou a desenvolver comunicação, responsabilidade e adaptação. Acredito que posso ajudar unindo essa base técnica com facilidade para aprender e trabalhar em equipe, contribuindo de forma consistente nas atividades do dia a dia e apoiando o time com organização, comprometimento e visão prática dos problemas.",
    "hero.cta": "Entre em contato",
    "hero.cta2": "Saiba mais",
    // About
    "about.label": "Sobre mim",
    "about.title": "Conheça minha trajetória",
    "about.p1": "Estudante de Engenharia de Software na PUC Minas, com foco em desenvolvimento e dados. Atuo com front-end (HTML, CSS, JavaScript, React, REST, JSON) e possuo sólida base em lógica de programação, além de experiência com C, C++, Python, Java e C#. Tenho experiência na criação de dashboards e análises com Power BI, aplicando visualização de dados para suporte à tomada de decisão, e boa compreensão dos fundamentos da Engenharia de Software e seus processos. Possuo inglês avançado, com certificação pela Wizard Idiomas, sendo capaz de ler, escrever e me comunicar profissionalmente em ambientes técnicos e internacionais. Busco um estágio onde possa contribuir tecnicamente, evoluir na prática e agregar valor ao time.",
    "about.p2": " ",
    "about.stat1": "Anos de experiência",
    "about.stat2": "Projetos realizados",
    "about.stat3": "Certificações",
    "about.stat4": "Áreas de atuação",
    // Experience
    "exp.label": "Experiência",
    "exp.title": "Minha jornada",
    "exp.professional": "Profissional",
    "exp.academic": "Acadêmica",
    "exp.role1": "Pixelp Soluções Digitais",
    "exp.company1": "Tradutor de textos escritos",
    "exp.desc1": "Tradução de textos para o inglês, para o atendimento de clientes no mercado internacional. ",
    "exp.role2": "Highbrown Technology",
    "exp.company2": "Podcast Representative",
    "exp.desc2": "Atuação como representante de podcast, engajando em discussões em inglês sobre temas gerais e conversas naturais.",
    "exp.role3": "Engenharia de Software",
    "exp.company3": "Pontifícia Universidade Católica de Minas Gerais",
    "exp.desc3": "Graduação voltada ao desenvolvimento de software e fundamentos da computação, com estudos em programação, estruturas de dados, banco de dados, engenharia de requisitos, desenvolvimento de sistemas e boas práticas de desenvolvimento. Também inclui experiência com projetos acadêmicos e trabalho em equipe para construção de soluções tecnológicas.",
    "exp.role4": "Técnico em Eletrônica",
    "exp.company4": "SENAI Alvimar Caneiro Rezende",
    "exp.desc4": "Formação em eletrônica analógica e digital, com conhecimentos em montagem, manutenção e análise de circuitos eletrônicos, leitura e interpretação de esquemas elétricos, utilização de instrumentos de medição (multímetro e osciloscópio), soldagem de componentes e identificação de falhas em equipamentos eletrônicos. Também inclui noções de automação e lógica digital.",
    // Projects
    "proj.label": "Projetos",
    "proj.title": "Trabalhos selecionados",
    "proj.imgPlaceholder": "Imagem do projeto",
    "proj.viewProject": "Ver projeto",
    "proj.code": "Código",
    "proj.proj1.title": "iSmart - Sistema de Gerenciamento de Estoque",
    "proj.proj1.desc": " Software desenvolvido para otimizar a gestão de estoque, onde além de desenvolvedor, também atuei como PO. Destacado como Trabalho Destaque 2024.1 pela PUC Minas. Tecnologias: HTML, CSS, Node.js, React, Firebase SQL, Bootstrap, Figma. ",
    "proj.proj2.title": "MasterCar - Sistemas de Vendas para Concessionárias",
    "proj.proj2.desc": "Sistema de Vendas para concessonária: Simula processos internos de uma concessionária, incluindo vendas e financiamento.",
    "proj.proj3.title": "Java Parking - Software de Estacionamento",
    "proj.proj3.desc": "Plataforma para registrar, adicionar e retirar veículos de um estacionamento, seguindo o padrão MVC. ",
    "proj.proj4.title": "HelpClass - Sistema de Agendamento de Aulas Particulares",
    "proj.proj4.desc": "Sistema de agendamento e monitoramento de aulas com relatórios, dashboards e gameficação. Atuei como PO e desenvolvedor back-end.",
    // Certificates
    "cert.label": "Certificados",
    "cert.title": "Qualificações",
    // Contact
    "contact.label": "Contato",
    "contact.title": "Vamos conversar?",
    "contact.desc": "Estou disponível para novas oportunidades e colaborações. Entre em contato!",
    "contact.footer": "Todos os direitos reservados",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.message": "Mensagem",
    "contact.form.placeholder.name": "Seu nome",
    "contact.form.placeholder.email": "seu@email.com",
    "contact.form.placeholder.message": "Digite sua mensagem aqui...",
    "contact.form.submit": "Enviar Mensagem",
    "contact.form.sending": "Enviando...",
    "contact.form.success": "Mensagem enviada com sucesso!",
    "contact.form.error": "Erro ao enviar mensagem. Tente novamente.",
    "contact.form.required": "Este campo é obrigatório",
    "contact.form.invalid_email": "Email inválido",
    // Game
    "game.label": "Mini Game",
    "game.title": "Snake 🐍",
    "game.desc": "Uma pausa divertida! Use as setas do teclado ou deslize na tela para jogar.",
    "game.score": "Pontos",
    "game.highscore": "Recorde",
    "game.play": "Jogar",
    "game.controls": "Use ↑ ↓ ← → ou W A S D",
    "game.points": "pontos",
    "game.retry": "Jogar novamente",
  },
  en: {
    // Navbar
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",
    // Hero
    "hero.subtitle": "Professional Portfolio",
    "hero.name": "Jonas",
    "hero.highlight": "Martins",
    "hero.description": "I am a Software Engineering student in my fifth semester, gaining experience primarily through hands-on projects. I have developed web systems, worked with databases, participated in initiatives using agile methodologies, and gained exposure to AI through academic research. My professional journey began outside the tech field, in translation and teaching, which helped me develop communication skills, a sense of responsibility, and adaptability. I believe I can contribute by combining this technical foundation with my ability to learn quickly and work effectively in a team, consistently contributing to day-to-day activities and supporting the team with organization, commitment, and a practical approach to problem-solving.",
    "hero.cta": "Get in touch",
    "hero.cta2": "Learn more",
    // About
    "about.label": "About me",
    "about.title": "Get to know my journey",
    "about.p1": "I am a Software Engineering student at PUC Minas, specializing in development and data. I work with front-end technologies (HTML, CSS, JavaScript, React, REST, JSON) and have a solid foundation in programming logic, as well as experience with C, C++, Python, Java, and C#. I have experience creating dashboards and analyses with Power BI, applying data visualization to support decision-making, and a strong understanding of the fundamentals of Software Engineering and its processes. I have advanced English proficiency, certified by Wizard Idiomas, and am able to read, write, and communicate professionally in technical and international settings. I am seeking an internship where I can contribute technically, gain practical experience, and add value to the team.",
    "about.p2": " ",
    "about.stat1": "Years of experience",
    "about.stat2": "Projects completed",
    "about.stat3": "Certifications",
    "about.stat4": "Areas of expertise",
    // Experience
    "exp.label": "Experience",
    "exp.title": "My journey",
    "exp.professional": "Professional",
    "exp.academic": "Academic",
    "exp.role1": "Current Position",
    "exp.company1": "Pixelp Soluções Digitais",
    "exp.desc1": "Description of your responsibilities and achievements in this role.",
    "exp.role2": "Previous Position",
    "exp.company2": "Company Y",
    "exp.desc2": "Description of your responsibilities and achievements in this role.",
    "exp.role3": "Degree in Your Field",
    "exp.company3": "University Z",
    "exp.desc3": "Details about your academic education and highlights.",
    "exp.role4": "Postgraduate / Course",
    "exp.company4": "Institution W",
    "exp.desc4": "Details about specializations or complementary courses.",
    // Projects
    "proj.label": "Projects",
    "proj.title": "Selected works",
    "proj.imgPlaceholder": "Project image",
    "proj.viewProject": "View project",
    "proj.code": "Code",
    "proj.proj1.title": "Project Name 1",
    "proj.proj1.desc": "Brief description of the project, technologies used and your role in development.",
    "proj.proj2.title": "Project Name 2",
    "proj.proj2.desc": "Brief description of the project, technologies used and your role in development.",
    "proj.proj3.title": "Project Name 3",
    "proj.proj3.desc": "Brief description of the project, technologies used and your role in development.",
    "proj.proj4.title": "Project Name 4",
    "proj.proj4.desc": "Brief description of the project, technologies used and your role in development.",
    // Certificates
    "cert.label": "Certificates",
    "cert.title": "Qualifications",
    // Contact
    "contact.label": "Contact",
    "contact.title": "Let's talk?",
    "contact.desc": "I'm available for new opportunities and collaborations. Get in touch!",
    "contact.footer": "All rights reserved",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.placeholder.name": "Your name",
    "contact.form.placeholder.email": "your@email.com",
    "contact.form.placeholder.message": "Type your message here...",
    "contact.form.submit": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.success": "Message sent successfully!",
    "contact.form.error": "Error sending message. Try again.",
    "contact.form.required": "This field is required",
    "contact.form.invalid_email": "Invalid email",
    // Game
    "game.label": "Mini Game",
    "game.title": "Snake 🐍",
    "game.desc": "A fun break! Use arrow keys or swipe on screen to play.",
    "game.score": "Score",
    "game.highscore": "High Score",
    "game.play": "Play",
    "game.controls": "Use ↑ ↓ ← → or W A S D",
    "game.points": "points",
    "game.retry": "Play again",
  },
};

type Translations = typeof translations.pt;

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("pt");

  const toggleLang = () => setLang((prev) => (prev === "pt" ? "en" : "pt"));

  const t = (key: keyof Translations) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

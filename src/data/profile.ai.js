export const profileAI = {
  shortName: "Omnia",
  lastNameStylized: "ALI...",
  roleLine: "AI Engineer (Student) • LLM Evaluation & NLP",
  subRoleLine: "AI Training • Evaluation • Prompt Engineering • Secure LLM Tools",

  email: "omniaali80087@gmail.com",
  phone: "+20 115 981 2405",

  socials: [
    { label: "GitHub", href: "https://github.com/Omnia9789" },
    { label: "LinkedIn", href: "https://bit.ly/4ppIS6i" },
    { label: "Facebook", href: "https://www.facebook.com/share/1Jjuz8CJTw/" },
  ],

  images: {
    hero: "/portfolio/images/me/hero.jpg",
    about: "/portfolio/images/me/about.jpg",
    edu: "/portfolio/images/me/edu.png",
    exp: "/portfolio/images/me/exp.jpg",
  },

  aboutText:
    "Omnia Ali — an AI-focused Computer Science student (AI major) at Cairo University (FCAI). I’m passionate about building reliable, secure, and production-ready AI systems, especially in LLM evaluation, model alignment, NLP, and applied machine learning.\n\nI have hands-on experience with LLM systems including prompt engineering, output constraint enforcement, injection resistance, and rubric-based evaluation workflows. I designed and implemented a secure CLI-based AI developer tool that generates deterministic pytest unit tests using an LLM API with strict validation and scope enforcement.\n\nAlongside AI, I have strong software engineering foundations across Python, REST APIs, CLI development, environment variables (.env), Git/GitHub, and backend development. I also worked with ASP.NET Core MVC/Razor Pages/Web API, Entity Framework Core, API integration, and cloud deployment basics using Microsoft Azure.\n\nI also have real-world experience in AI model evaluation and bilingual data annotation (Arabic–English), including hallucination detection, bias identification, and writing high-quality Golden Responses under strict guidelines. I’m detail-oriented, consistent, and comfortable working with iterative feedback and quality-focused workflows.",
  aboutBadges: [
    "Bilingual (Arabic/English)",
    "LLM Evaluation",
    "Prompt Engineering",
    "Secure LLM Apps",
    "Fast learner",
  ],

  education: [
    {
      school: "Faculty of Computers and Artificial Intelligence (FCAI)",
      university: "Cairo University",
      period: "Sep 2023 - Present",
      coursework:
        "Artificial Intelligence, Machine Learning foundations, NLP concepts, Data Structures, Algorithms, Discrete Mathematics, Statistics.",
    },
    {
      school: "Red Sea STEM School (STEM Track) — High School Diploma",
      university: "Egypt STEM Schools Program",
      period: "2020 - 2023",
      coursework:
        "Advanced STEM curriculum focused on analytical thinking, research-based learning, and interdisciplinary problem solving.",
    },
  ],

  experience: [
    {
      role: "LLM Evaluation & Alignment Contributor",
      company: "Freelance / Remote",
      period: "Ongoing",
      bullets: [
        "Evaluated LLM outputs for instruction-following, factual accuracy, safety, and bias.",
        "Performed structured side-by-side comparisons using rubric-based scoring frameworks.",
        "Designed edge-case prompts to test ambiguity handling and model robustness.",
        "Identified hallucinations and unsafe outputs in Arabic and English responses.",
        "Contributed to alignment-focused evaluation workflows for model refinement.",
      ],
    },
    {
      role: "AI Data Annotation & Model Evaluation Specialist",
      company: "Freelance / Remote",
      period: "Ongoing",
      bullets: [
        "Worked on AI data annotation and LLM evaluation projects to refine advanced language models.",
        "Designed and evaluated prompts across instruction-following, ambiguity, safety boundaries, and factual accuracy.",
        "Scored side-by-side model outputs using predefined rubrics and quality standards.",
        "Identified hallucinations, bias, incorrect assumptions, and culturally inappropriate outputs (Arabic/English).",
        "Wrote high-quality Golden Responses that correctly follow instructions and resolve ambiguity.",
      ],
    },
    {
      role: "AI Data Annotation — Mercor Bilingual Project (Arabic–English)",
      company: "Remote",
      period: "Jan 2026 - Feb 2026",
      bullets: [
        "Contributed to a U.S.-based bilingual AI training project for Arabic–English alignment.",
        "Evaluated responses for linguistic correctness, clarity, and cultural appropriateness in both languages.",
        "Flagged inconsistencies between source documents and model outputs for quality control.",
        "Ensured proper handling of dialectal Arabic vs Modern Standard Arabic based on task requirements.",
      ],
    },
    {
      role: ".NET & Cloud Development Intern",
      company: "Infinity Tech Company",
      period: "Summer 2024",
      bullets: [
        "Contributed to full-stack web development using ASP.NET Core MVC, Razor Pages, and Web API.",
        "Implemented RESTful services and handled API integration between frontend and backend layers.",
        "Worked with Entity Framework Core for database management and data persistence.",
        "Participated in cloud deployment and service configuration using Microsoft Azure.",
        "Followed clean architecture principles and documentation practices.",
      ],
    },
    {
      role: "Technical Intern",
      company: "NTI",
      period: "Summer 2024",
      bullets: [
        "Worked in structured task execution and quality-checking workflows within team environments.",
        "Collaborated with peers while maintaining attention to detail and consistent delivery.",
      ],
    },
  ],

  projects: [
    {
      title: "AI Unit Test Generator CLI",
      description:
        "Secure CLI tool that generates deterministic pytest unit tests for a single Python function using an LLM API, with strict scope validation, sanitization, and injection resistance.",
      tags: [
        "Python",
        "CLI",
        "LLM",
        "Prompt Engineering",
        "Deterministic Output",
        "Security",
      ],
      github: "https://github.com/Omnia9789/ai-unit-test-generator-cli",
      demo: "",
      featured: true,
    },
    {
      title: "Neural Network From Scratch vs Keras",
      description:
        "Implemented a neural network from scratch and compared it with a Keras model to understand backpropagation, gradient updates, and framework vs manual training trade-offs.",
      tags: ["Deep Learning", "Python", "Keras", "Backpropagation"],
      github: "https://github.com/Omnia9789/nn_from_scratch_vs_keras.py",
      demo: "",
      featured: true,
    },
    {
      title: "Recipe Finder Django API",
      description:
        "RESTful backend API built with Django featuring clean API structure, database integration, and practical backend patterns.",
      tags: ["Django", "REST API", "Python", "Backend"],
      github: "https://github.com/Omnia9789/recipe-finder-django-api",
      demo: "",
      featured: false,
    },
    {
      title: "E-commerce ASP.NET Core MVC",
      description:
        "Full-stack e-commerce application using ASP.NET Core MVC with Entity Framework Core and backend integration patterns.",
      tags: ["ASP.NET Core", "MVC", "Entity Framework", "Full-Stack"],
      github: "https://github.com/Omnia9789/ecommerce-mvc-aspnetcore",
      demo: "",
      featured: false,
    },
    {
      title: "CityInfo Versioned API",
      description:
        "Backend API demonstrating clean REST practices and API versioning patterns for maintainable services.",
      tags: ["ASP.NET Core", "Web API", "Versioning", "REST"],
      github: "https://github.com/Omnia9789/CityInfo.VersionedAPI",
      demo: "",
      featured: false,
    },
    {
      title: "WiredBrain Coffee Admin Dashboard",
      description:
        "Admin dashboard built with ASP.NET Core Razor Pages showcasing backend management UI patterns.",
      tags: ["ASP.NET Core", "Razor Pages", "Admin Dashboard"],
      github:
        "https://github.com/Omnia9789/WiredBrain-Coffee-ASP.NET-Core-Razor-Pages-Admin-Dashboard",
      demo: "",
      featured: false,
    },
    {
      title: "Bethany's Pie Shop (ASP.NET Core)",
      description:
        "ASP.NET Core project demonstrating MVC fundamentals, routing, views, and backend integration.",
      tags: ["ASP.NET Core", "MVC", "Web Development"],
      github: "https://github.com/Omnia9789/aspnetcore-bethany-pie-shop",
      demo: "",
      featured: false,
    },
  ],

  certificates: [
    {
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "DeepLearning.AI / Stanford Online (Coursera)",
      date: "Jan 24, 2025",
      image: "/portfolio/images/certs/coursera-supervised-ml.png",
    },
    {
      title: "Advanced Learning Algorithms",
      issuer: "DeepLearning.AI / Stanford Online (Coursera)",
      date: "Apr 21, 2025",
      image: "/portfolio/images/certs/coursera-advanced-learning-algorithms.png",
    },
    {
      title:
        "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
      issuer: "DeepLearning.AI (Coursera)",
      date: "Jun 3, 2024",
      image: "/portfolio/images/certs/coursera-improving-deep-nn.png",
    },
    {
      title: "Google Data Analytics (Professional Certificate)",
      issuer: "Google (Coursera)",
      date: "Feb 2, 2026",
      image: "/portfolio/images/certs/google-data-analytics.png",
    },
    {
      title: "Data Science & Analytics",
      issuer: "HP LIFE / HP Foundation",
      date: "Feb 10, 2026",
      image: "/portfolio/images/certs/hp-life-data-science-analytics.png",
    },
    {
      title: "Hugging Face Agents Course (Certificate of Excellence)",
      issuer: "Hugging Face",
      date: "Apr 27, 2025",
      image: "/portfolio/images/certs/huggingface-agents.png",
    },
    {
      title: "IEEE Xtreme 18.0 Programming Competition (Participation)",
      issuer: "IEEE",
      date: "Oct 26, 2024",
      image: "/portfolio/images/certs/ieee-xtreme-18.png",
    },
    {
      title: "Databases (Manara Learning Path)",
      issuer: "Manara",
      date: "Feb 10, 2026",
      image: "/portfolio/images/certs/manara-databases.png",
    },
    {
  title: "Solving Problems with Critical and Creative Thinking",
  issuer: "IBM SkillsBuild for Students",
  date: "Sep 7, 2021",
  image: "/portfolio/images/certs/ibm-critical-creative-thinking.png",
},
{
  title: "Focus Entrepreneurial",
  issuer: "IBM SkillsBuild for Students",
  date: "Jul 25, 2021",
  image: "/portfolio/images/certs/ibm-focus-entrepreneurial.png",
},
{
  title: "Introduction to Emerging Technologies",
  issuer: "IBM SkillsBuild for Students",
  date: "Jul 23, 2021",
  image: "/portfolio/images/certs/ibm-introduction-emerging-technologies.png",
},
{
  title: "Preparing to Manage Human Resources",
  issuer: "University of Minnesota (Coursera)",
  date: "Sep 6, 2021",
  image: "/portfolio/images/certs/university-minnesota-preparing-manage-hr.png",
},
  ],
};
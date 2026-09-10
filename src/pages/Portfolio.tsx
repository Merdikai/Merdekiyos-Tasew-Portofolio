import React, { useEffect, useState, useRef, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThreeBackground from "../components/ThreeBackground";
import TiltCard from "../components/TiltCard";
import TerminalDrawer from "../components/TerminalDrawer";
import ProjectModal, { type ProjectDetail } from "../components/ProjectModal";
import { ReviewModal, type ClientReviewSubmission } from "../components/ReviewModal";
import ContactForm from "../components/ContactForm";
import { sounds } from "../utils/soundEffects";
import "./Portfolio.css";

/* ── Types ── */
interface Certificate {
  title: string;
  issuer: string;
  date: string;
  verificationUrl: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
  github?: string;
  demo?: string;
}

interface Skill {
  category: string;
  percentage: number;
  color: string;
  tools: string[];
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  verifiedProject: string;
  platform: string;
  rating: number;
  content: string;
  date: string;
  location?: string;
  highlightTags: string[];
  isVerified: boolean;
}

/* ── Rich Project Data with Specs ── */
const projectsData: ProjectDetail[] = [
  {
    id: "clinic-management-system",
    title: "Clinic Management System",
    category: "Full-Stack & SaaS",
    description:
      "Enterprise healthcare management platform architected with Clean Architecture, ASP.NET Core, and Entity Framework Core, featuring clinical appointments, patient medical histories, and doctor schedules.",
    longDescription:
      "A comprehensive healthcare administration ecosystem engineered with Clean Architecture principles and ASP.NET Core. Features modular separation of Domain, Application, Infrastructure, and API layers, automated appointment scheduling, patient records encryption, and prescription management.",
    technologies: ["C#", "ASP.NET Core", "Clean Architecture", "EF Core", "PostgreSQL", "REST APIs", "JWT", "Swagger", "Angular"],
    githubUrl: "https://github.com/Merdikai/ClinicManagementSystem",
    featured: true,
    highlights: [
      "Designed modular Clean Architecture separating Domain, Application, and Infrastructure concerns",
      "Implemented robust Entity Framework Core data models with LINQ queries and audit trails",
      "Engineered role-based access control protecting confidential patient medical histories",
      "Built secure RESTful API endpoints with Swagger documentation and comprehensive validations",
    ],
    images: [
      "/images/projects/clinic-management-system/screenshot-1.png",
      "/images/projects/clinic-management-system/screenshot-2.png",
      "/images/projects/clinic-management-system/screenshot-3.png",
      "/images/projects/clinic-management-system/screenshot-4.png",
    ],
  },
  {
    id: "church-management-system",
    title: "Church Management System",
    category: "Full-Stack",
    description:
      "Enterprise-grade church management platform featuring role-based dashboards, bilingual English/Amharic UI, prayer requests, event timelines, and a dynamic public portal.",
    longDescription:
      "A complete digital management ecosystem designed and implemented for modern faith organizations. Features multi-role dashboards (Admin, Team Leader, Member), bilingual Amharic/English internationalization, prayer request workflows, and dynamic CMS controls for public site content.",
    technologies: ["React", "TypeScript", "Supabase", "Vite", "i18next", "CSS3", "Vercel"],
    githubUrl: "https://github.com/Merdikai/church-management",
    liveUrl: "https://church-management-wqyb.vercel.app",
    featured: true,
    highlights: [
      "Architected 25+ responsive pages serving 3 distinct user roles with Supabase Row Level Security (RLS)",
      "Implemented persistent English & Amharic internationalization with 100+ translation keys",
      "Engineered dynamic CMS module allowing non-technical leaders to manage announcements, events, and sermon archives",
      "Integrated secure cloud storage and real-time database subscription hooks",
    ],
    images: [
      "/images/projects/church-management-system/screenshot-1.png",
      "/images/projects/church-management-system/screenshot-2.png",
      "/images/projects/church-management-system/screenshot-3.png",
      "/images/projects/church-management-system/screenshot-4.png",
    ],
  },
  {
    id: "nail-booking-app",
    title: "Nail Booking App",
    category: "Full-Stack & SaaS",
    description:
      "Multi-tenant SaaS booking platform engineered for beauty salons with real-time scheduling, client management, and automated loyalty program workflows.",
    longDescription:
      "A commercial-grade multi-tenant salon management software. Allows individual beauty salons to operate under isolated tenant IDs with custom service menus, real-time booking slots, customer loyalty point calculations, and employee shift tracking.",
    technologies: ["React", "TypeScript", "Supabase", "Vite", "Bootstrap", "Vercel"],
    githubUrl: "https://github.com/Merdikai/nail-booking-app",
    liveUrl: "https://nail-booking-app-alpha.vercel.app/",
    featured: true,
    highlights: [
      "Built multi-tenant isolation ensuring customer and appointment data confidentiality across salons",
      "Real-time booking calendar preventing double bookings with instant status synchronization",
      "Developed tiered loyalty reward system calculating customer lifetime value and redemption perks",
      "Designed mobile-first glassmorphism interface optimized for high touch-screen velocity",
    ],
    images: [
      "/images/projects/nail-booking-app/screenshot-1.png",
      "/images/projects/nail-booking-app/screenshot-2.png",
      "/images/projects/nail-booking-app/screenshot-3.png",
      "/images/projects/nail-booking-app/screenshot-4.png",
    ],
  },
  {
    id: "hids",
    title: "HIDS — Hospital Information Dissemination System",
    category: "Backend & APIs",
    description:
      "Secure multi-role healthcare communication platform connecting Admins, Medical Directors, Doctors, and Patients with rigorous data protection protocols.",
    longDescription:
      "Developed to streamline urgent healthcare communications and clinical dispatch in high-volume environments. Connects medical staff with prioritized alert feeds, secure lab result dissemination, and auditable doctor-to-patient advisories.",
    technologies: ["PHP", "MySQL", "Security", "REST APIs", "XAMPP"],
    githubUrl: "https://github.com/Merdikai/HIDS",
    featured: false,
    highlights: [
      "Engineered role-based access control (RBAC) preventing unauthorized clinical records viewing",
      "Optimized relational MySQL schema with parameterized queries preventing SQL injection vulnerabilities",
      "Built tamper-evident audit logging for patient records access compliance",
      "Created responsive doctor dashboard with emergency notification priority alerts",
    ],
    images: [
      "/images/projects/hids/screenshot-1.jpg",
      "/images/projects/hids/screenshot-2.jpg",
      "/images/projects/hids/screenshot-3.jpg",
      "/images/projects/hids/screenshot-4.jpg",
    ],
  },
  {
    id: "training-management-system",
    title: "Training Management System (TMS)",
    category: "Full-Stack & SaaS",
    description:
      "Full-stack enterprise education and training management platform featuring an ASP.NET Core Web API backend with Clean Architecture and an Angular TypeScript client.",
    longDescription:
      "An enterprise-scale training and institutional curriculum management platform. Architected with an ASP.NET Core Web API backend and an Angular TypeScript frontend, enabling organizations to manage courses, track student performance, coordinate instructor schedules, and automate certification workflows.",
    technologies: ["C#", "ASP.NET Core", "Angular", "TypeScript", "PostgreSQL", "REST APIs"],
    githubUrl: "https://github.com/Merdikai/TmsApi",
    featured: true,
    highlights: [
      "Architected decoupled full-stack architecture with ASP.NET Core Web API and Angular client",
      "Developed interactive Angular dashboard with reactive forms, RxJS observables, and modular routing",
      "Engineered trainee enrollment, assessment grading, and automated completion certification pipelines",
      "Implemented secure JWT authentication and granular permissions for Admins, Instructors, and Students",
    ],
    images: [
      "/images/projects/training-management-system/screenshot-1.png",
      "/images/projects/training-management-system/screenshot-2.png",
      "/images/projects/training-management-system/screenshot-3.png",
      "/images/projects/training-management-system/screenshot-4.png",
    ],
  },
  {
    id: "civic-ai",
    title: "CivicAI — Intelligent Civic Intelligence Platform",
    category: "Full-Stack",
    description:
      "Enterprise civic technology and community engagement ecosystem leveraging LLM agents, automated natural language grievance routing, and real-time municipal analytics.",
    longDescription:
      "An advanced civic technology platform engineered to bridge communication between citizens and public institutions through artificial intelligence. Features an intelligent conversational assistant for municipal service navigation, semantic grievance classification, multilingual public policy interpretation, and executive analytics dashboards for city administrators.",
    technologies: ["React", "TypeScript", "Vite", "OpenAI / LLMs", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/Merdikai/CivicAI",
    liveUrl: "https://civic-ai-ethiopia.vercel.app/",
    featured: true,
    highlights: [
      "Engineered conversational AI assistant navigating complex municipal regulations and public service forms",
      "Implemented automated semantic classification pipeline routing citizen tickets to appropriate departments",
      "Architected interactive administrative dashboard with real-time community metrics and resolution tracking",
      "Designed accessible, mobile-first interface supporting multilingual input and voice-assisted civic reporting",
    ],
    images: [
      "/images/projects/civic-ai/screenshot-1.png",
      "/images/projects/civic-ai/screenshot-2.png",
      "/images/projects/civic-ai/screenshot-3.png",
      "/images/projects/civic-ai/screenshot-4.png",
    ],
  },
];

const certificates: Certificate[] = [
  {
    title: "Programming Fundamentals Nanodegree",
    issuer: "Udacity",
    date: "March 2026",
    verificationUrl: "https://www.udacity.com/certificate/e/e4923d28-1e3f-11f1-9565-cfb6fd9b9a45",
  },
  {
    title: "Fundamentals of DevOps On AWS",
    issuer: "Simplilearn",
    date: "July 14, 2026",
    verificationUrl: "https://simpli-web.app.link/e/2AGyGEzu74b",
  },
  {
    title: "Global Chapters — Ethiopia — Data Fundamentals",
    issuer: "Udacity",
    date: "March 20, 2026",
    verificationUrl: "https://confirm.udacity.com/lp/2ccb661e-544e-41ee-a9d1-4aff6e8ef986",
  },
];

const experiences: Experience[] = [
  {
    role: "Full Stack Developer & SaaS Developer",
    company: "Ezer Nail Salon",
    period: "2025 — 2026",
    location: "Remote",
    description:
      "Architected and built a multi-tenant nail salon booking SaaS platform, handling everything from database schema design to automated deployment.",
    technologies: ["React", "TypeScript", "Supabase", "Vite", "Bootstrap", "Vercel"],
    achievements: [
      "Engineered multi-tenant SaaS architecture supporting isolated salon records with zero cross-tenant data leakage.",
      "Implemented role-based authentication separating Super Admins, Salon Owners, and End Customers.",
      "Crafted responsive glassmorphism UI with custom CSS animations and mobile-first design.",
      "Integrated Supabase real-time database, auth, and secure cloud storage.",
    ],
    github: "https://github.com/Merdikai/nail-booking-app",
    demo: "https://nail-booking-app-alpha.vercel.app",
  },
  {
    role: "Full Stack Developer",
    company: "Bethel Anfo EECMY Church",
    period: "2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "Designed and developed a comprehensive church management web application with role-based dashboards, team management, and bilingual support.",
    technologies: ["React", "TypeScript", "Supabase", "Vite", "i18next", "CSS3", "Vercel"],
    achievements: [
      "Built a full-featured church management platform with 25+ pages serving 3 user roles.",
      "Implemented semi-bilingual support (English/Amharic) with persistent language preference and 100+ translation keys.",
      "Created prayer request system with public/private visibility, announcement feeds, and event timelines.",
      "Deployed on Vercel with CI/CD pipeline, environment variables, and production-grade error handling.",
    ],
    github: "https://github.com/Merdikai/church-management",
    demo: "https://church-management-wqyb.vercel.app",
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2025 — Present",
    location: "Remote",
    description:
      "Delivered custom websites for businesses and clients, handling end-to-end design, secure backend development, and performance optimization.",
    technologies: ["React", "PHP", "MySQL", "TypeScript", "Supabase", "Vercel"],
    achievements: [
      "Built responsive, accessible web applications increasing client conversion rates.",
      "Implemented robust database encryption and password hashing standards.",
    ],
    github: "https://github.com/Merdikai",
  },
  {
    role: "Software Engineering Intern",
    company: "PEDS — Professional Electronic Data Systems PLC",
    period: "06/2025 — 01/2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "Supported enterprise client projects, focusing on modernizing legacy systems, database tuning, and third-party API integration.",
    technologies: ["Java", "MySQL", "REST APIs"],
    achievements: [
      "Supported enterprise business process modernization and data migration initiatives.",
      "Contributed to software implementation, testing, and system integration tasks.",
      "Delivered technical support and troubleshooting assistance for client teams.",
    ],
    github: "https://github.com/Merdikai",
  },
];

const skills: Skill[] = [
  {
    category: "Frontend Engineering",
    percentage: 88,
    color: "#c4a369",
    tools: ["React", "TypeScript", "Angular", "Vite", "Bootstrap", "Tailwind CSS", "HTML5", "Next.js (exploring)"],
  },
  {
    category: "Backend & Systems",
    percentage: 80,
    color: "#c97a7a",
    tools: ["Node.js", "C#", ".NET Core", "PostgreSQL", "Supabase", "PHP", "Java", "MySQL", "REST APIs"],
  },
  {
    category: "Mobile Application Development",
    percentage: 70,
    color: "#7a9c8a",
    tools: ["Flutter (learning)", "Android Basics"],
  },
  {
    category: "DevOps & Cloud Architecture",
    percentage: 65,
    color: "#a369c4",
    tools: ["Git & GitHub Actions", "Supabase Cloud", "Vercel", "AWS (learning)"],
  },
];

const initialTestimonials: Testimonial[] = [
  {
    id: "rev-1",
    name: "Mesfin Kifle",
    role: "Board Secretary",
    organization: "Bethel Anfo EECMY Church",
    avatar: "/images/avatars/avatar_mesfin.jpg",
    verifiedProject: "Church Management System",
    platform: "Direct Institutional Contract",
    rating: 5,
    date: "Feb 2026",
    location: "Addis Ababa, Ethiopia",
    content:
      "Merdekiyos engineered our complete church management portal from the ground up. His implementation of role-based dashboards, bilingual Amharic/English workflows, and secure member directories exceeded all our expectations. An exceptionally skilled and reliable engineer.",
    highlightTags: ["Full-Stack Architecture", "Bilingual UI", "Database Security"],
    isVerified: true,
  },
  {
    id: "rev-2",
    name: "Tsinat Begashew",
    role: "Founder & Operations Director",
    organization: "Ezer Nail Salon & Spa",
    avatar: "/images/avatars/avatar_sara.jpg",
    verifiedProject: "Ezer Nail Salon Booking",
    platform: "Direct Client Engagement",
    rating: 5,
    date: "March 2026",
    location: "Addis Ababa, Ethiopia",
    content:
      "Working with Merdekiyos transformed our daily salon operations. The custom multi-tenant booking system and automated scheduling eliminated booking conflicts completely. His attention to UX speed and mobile responsiveness was world-class.",
    highlightTags: ["SaaS Platform", "High Reliability", "Responsive Design"],
    isVerified: true,
  },
];

const contactItems = [
  {
    type: "Email",
    title: "Direct Email",
    value: "merdekiyostasew@gmail.com",
    subtitle: "Primary channel for project discussions, contracts, and job opportunities.",
    action: "mailto:merdekiyostasew@gmail.com?subject=Project%20Inquiry",
    actionLabel: "Send Email",
    secondaryAction: "https://mail.google.com/mail/?view=cm&fs=1&to=merdekiyostasew@gmail.com&su=Project%20Inquiry",
    secondaryLabel: "Web Gmail",
    color: "#4f46e5",
    tag: "Primary Channel",
  },
  {
    type: "Phone",
    title: "Voice & WhatsApp",
    value: "+251 953 913 418",
    subtitle: "Direct phone line and WhatsApp for real-time calls and instant mobile chat.",
    action: "tel:+251953913418",
    actionLabel: "Call Now",
    secondaryAction: "https://wa.me/251953913418",
    secondaryLabel: "WhatsApp",
    color: "#10b981",
    tag: "Mon – Sat · EAT",
  },
  {
    type: "Telegram",
    title: "Telegram Direct",
    value: "@Merdi27",
    subtitle: "Fastest response time for instant messaging, developer sync, and quick chats.",
    action: "https://t.me/Merdi27",
    actionLabel: "Open Chat",
    secondaryAction: undefined,
    secondaryLabel: undefined,
    color: "#0284c7",
    tag: "Fastest Reply",
  },
  {
    type: "Location",
    title: "Current Base",
    value: "Addis Ababa, Ethiopia",
    subtitle: "Available for on-site local roles as well as worldwide remote full-time contracts.",
    action: "https://maps.google.com/?q=Addis+Ababa,+Ethiopia",
    actionLabel: "View Location",
    secondaryAction: undefined,
    secondaryLabel: undefined,
    color: "#f59e0b",
    tag: "UTC+3 (EAT)",
  },
];

const Portfolio: React.FC = () => {
  const [animateSkills, setAnimateSkills] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Load reviews from localStorage + verified defaults
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem("merdekiyos_user_reviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Exclude any previously cached reviews for Dr. Almaz Kebede, mock entries, or duplicates
          const userOnly = parsed.filter(
            (r: Testimonial) =>
              r.name !== "Dr. Dawit Haile" &&
              r.name !== "Michael Tadesse" &&
              r.name !== "Dr. Almaz Kebede" &&
              !r.name?.toLowerCase().includes("almaz") &&
              r.id !== "rev-3" &&
              r.id !== "rev-4" &&
              r.id !== "rev-1" &&
              r.id !== "rev-2"
          );
          return [...userOnly, ...initialTestimonials];
        }
      }
    } catch {
      // ignore
    }
    return initialTestimonials;
  });

  // Clean any stale mock reviews (including Dr. Almaz Kebede) from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("merdekiyos_user_reviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(
            (r: any) =>
              r.name !== "Dr. Dawit Haile" &&
              r.name !== "Michael Tadesse" &&
              r.name !== "Dr. Almaz Kebede" &&
              !r.name?.toLowerCase().includes("almaz") &&
              r.id !== "rev-3" &&
              r.id !== "rev-4"
          );
          if (cleaned.length !== parsed.length) {
            localStorage.setItem("merdekiyos_user_reviews", JSON.stringify(cleaned));
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleNewReview = (newReview: ClientReviewSubmission) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      const savedRaw = localStorage.getItem("merdekiyos_user_reviews");
      const userSaved = savedRaw ? JSON.parse(savedRaw) : [];
      localStorage.setItem("merdekiyos_user_reviews", JSON.stringify([newReview, ...userSaved]));
    } catch {
      // ignore
    }
  };

  // Project filtering & search states
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Project Hover & Glass Gallery Modal states
  const [hoveredPhotoProject, setHoveredPhotoProject] = useState<string | null>(null);
  const [activeGalleryModal, setActiveGalleryModal] = useState<{ project: ProjectDetail } | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{ images: string[]; index: number; title: string } | null>(null);

  // Prevent body scroll when Glass Gallery Modal is open
  useEffect(() => {
    if (activeGalleryModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeGalleryModal]);

  // Keyboard navigation for Glass Gallery modal & Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeLightbox) setActiveLightbox(null);
        else if (activeGalleryModal) setActiveGalleryModal(null);
      } else if (activeLightbox) {
        if (e.key === "ArrowRight") {
          setActiveLightbox((prev) =>
            prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null
          );
        } else if (e.key === "ArrowLeft") {
          setActiveLightbox((prev) =>
            prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox, activeGalleryModal]);

  const availableProjectTitles = useMemo(() => {
    return projectsData.map((p) => p.title);
  }, []);

  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    profile: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    testimonials: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    certs: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        }),
      { threshold: 0.1 }
    );
    Object.values(sectionRefs).forEach((r) => r.current && observer.observe(r.current));
    return () =>
      Object.values(sectionRefs).forEach((r) => r.current && observer.unobserve(r.current));
  }, []);

  useEffect(() => {
    if (!sectionRefs.skills.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setAnimateSkills(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRefs.skills.current);
    return () => {
      if (sectionRefs.skills.current) obs.unobserve(sectionRefs.skills.current);
    };
  }, []);

  const handleCopy = (text: string, key: string) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  // Filtered projects computation
  const filteredProjects = useMemo(() => {
    return projectsData.filter((proj) => {
      const matchesCategory =
        activeCategory === "All" || proj.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        proj.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="portfolio">
      {/* ── Three.js 3D Interactive WebGL Engine Background ── */}
      <ThreeBackground initialMode="nebula" showControls={true} />

      {/* ── Header with Audio & Terminal Integration ── */}
      <Header
        logoText="MT"
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      <main className="main-content">
        {/* ── HERO SECTION ── */}
        <section ref={sectionRefs.hero} id="home" className="hero-section reveal">
          <div className="hero-inner">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span>Available for Hire &amp; High-Impact Projects</span>
            </div>

            <h1 className="hero-name">
              Merdekiyos<br />
              <span className="hero-name-em">Tasew</span>
            </h1>

            <div className="hero-subtitle-row">
              <div className="hero-subtitle-line" />
              <span className="hero-subtitle">Full-Stack &amp; Software Engineer</span>
            </div>

            <p className="hero-description">
              Engineering secure, high-performance web applications, scalable SaaS platforms, and
              resilient backend architectures with modern technologies.
            </p>

            <div className="hero-stats">
              <div className="hero-stat-box">
                <span className="hero-stat-num">1</span>
                <span className="hero-stat-label">Years Exp.</span>
              </div>
              <div className="hero-stat-sep" />
              <div className="hero-stat-box">
                <span className="hero-stat-num">5+</span>
                <span className="hero-stat-label">Production Apps</span>
              </div>
              <div className="hero-stat-sep" />
              <div className="hero-stat-box">
                <span className="hero-stat-num">3+</span>
                <span className="hero-stat-label">Certifications</span>
              </div>
            </div>

            <div className="hero-actions">
              <a
                href="#projects"
                className="hero-btn-primary"
                onClick={(e) => {
                  sounds.playClick();
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Explore Projects</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <button
                onClick={() => {
                  sounds.playClick();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hero-btn-outline"
              >
                <span>Get In Touch</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsTerminalOpen(true);
                }}
                className="hero-btn-terminal"
                title="Open Interactive Shell"
              >
                <span>&gt;_ Open CLI</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── PROFILE SECTION ── */}
        <section ref={sectionRefs.profile} id="profile" className="section reveal">
          <div className="section-header">
            <span className="section-label">Engineering Philosophy</span>
            <h2 className="section-title">Developer <em>Profile</em></h2>
            <div className="section-rule" />
          </div>

          <TiltCard maxTilt={8} scale={1.01} className="profile-tilt-wrap">
            <div className="profile-glass">
              <span className="profile-quote-mark">"</span>
              <p className="profile-text">
                I am a <strong>Full Stack &amp; Software Engineer</strong> driven by architecting
                bulletproof, scalable web and mobile software. My approach focuses on rigorous
                data security, modular architectures, performance tuning, and delivering
                solutions that solve real-world operational problems.
              </p>
              <div className="profile-tags">
                {[
                  "Security-First Architecture",
                  "SaaS Multi-Tenancy",
                  "Clean Code & SOLID",
                  "API Design & Integration",
                  "Relational & Real-Time Databases",
                ].map((tag) => (
                  <span key={tag} className="profile-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </section>

        {/* ── SERVICES SECTION ── */}
        <section ref={sectionRefs.services} id="services" className="section reveal">
          <div className="section-header">
            <span className="section-label">Specializations</span>
            <h2 className="section-title">My <em>Services</em></h2>
            <div className="section-rule" />
          </div>

          <div className="services-grid">
            {[
              {
                num: "01",
                title: "Full-Stack Web Engineering",
                desc: "Developing fast, responsive, modern web applications utilizing React, TypeScript, Vite, Supabase, and Next-level architectures.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: "Multi-Tenant SaaS Systems",
                desc: "Architecting cloud-native SaaS platforms with strict tenant data isolation, billing workflows, and automated onboarding.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: "Secure Backend & APIs",
                desc: "Building resilient RESTful endpoints, SQL database design, Row Level Security (RLS), and authentication pipelines.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
              {
                num: "04",
                title: "Cross-Platform Mobile Apps",
                desc: "Building accessible mobile experiences for Android and iOS using React Native, component reusability, and offline syncing.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                ),
              },
            ].map((srv, idx) => (
              <TiltCard key={idx} maxTilt={10} scale={1.02} className="service-card-tilt">
                <div className="service-card">
                  <div className="service-icon-box">{srv.icon}</div>
                  <h3 className="service-title">{srv.title}</h3>
                  <p className="service-desc">{srv.desc}</p>
                  <div className="service-number">{srv.num}</div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── TECHNICAL SKILLS SECTION ── */}
        <section ref={sectionRefs.skills} id="skills" className="section reveal">
          <div className="section-header">
            <span className="section-label">Core Capabilities</span>
            <h2 className="section-title">Technical <em>Stack</em></h2>
            <div className="section-rule" />
          </div>

          <div className="skills-grid">
            {skills.map((skill, i) => (
              <TiltCard key={i} maxTilt={8} scale={1.015} className="skill-card-tilt">
                <div className="skill-card" style={{ "--skill-color": skill.color } as React.CSSProperties}>
                  <div className="skill-header">
                    <div className="skill-icon-wrap">
                      <svg viewBox="0 0 24 24" fill="none" stroke={skill.color} strokeWidth="1.8" width="20" height="20">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <h3 className="skill-name">{skill.category}</h3>
                  </div>

                  <div className="skill-progress-row">
                    <div className="skill-bar-bg">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: animateSkills ? `${skill.percentage}%` : "0%",
                          background: skill.color,
                          transitionDelay: `${i * 0.12}s`,
                        }}
                      />
                    </div>
                    <span className="skill-pct">{skill.percentage}%</span>
                  </div>

                  <div className="skill-tools">
                    {skill.tools.map((tool, j) => (
                      <span key={j} className="skill-tool-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── PROFESSIONAL PROJECTS SECTION ── */}
        <section ref={sectionRefs.projects} id="projects" className="section reveal">
          <div className="section-header">
            <span className="section-label">Portfolio Portfolio</span>
            <h2 className="section-title">Selected <em>Projects</em></h2>
            <div className="section-rule" />
          </div>

          {/* Filter & Search Bar */}
          <div className="projects-controls">
            <div className="project-category-pills">
              {["All", "Full-Stack & SaaS", "Backend & APIs", "Web & Mobile"].map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    sounds.playClick();
                    setActiveCategory(cat);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="project-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by tech or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="project-search-input"
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Project Grid */}
          <div className="projects-grid">
            {filteredProjects.map((proj, i) => {
              const projId = proj.id || `project-${i}`;
              const images = proj.images || [];

              return (
                <TiltCard key={i} maxTilt={10} scale={1.02} className="project-card-tilt">
                  <div className="project-card">
                    {/* Header Badges: Featured + Photos Hover Preview & Trigger */}
                    <div className="project-card-badges">
                      {proj.featured && <span className="project-featured-badge">⭐ Featured</span>}

                      <div className="project-photos-btn-wrap">
                        <button
                          type="button"
                          className="project-photos-btn"
                          onMouseEnter={() => setHoveredPhotoProject(projId)}
                          onMouseLeave={() => setHoveredPhotoProject(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            sounds.playWhoosh();
                            setActiveGalleryModal({ project: proj });
                          }}
                          title="Click to view & scroll screenshots in full screen"
                          aria-label={`View ${proj.title} screenshots`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span>Photos ({images.length})</span>
                        </button>

                        {/* Floating Hover Preview Tooltip: Appears on hover, disappears when cursor leaves */}
                        {images.length > 0 && (
                          <div
                            className={`project-photo-hover-card ${hoveredPhotoProject === projId ? "is-visible" : ""}`}
                            aria-hidden={hoveredPhotoProject !== projId}
                          >
                            <div className="hover-card-thumb">
                              <img src={images[0]} alt={`${proj.title} preview`} loading="lazy" />
                              <span className="hover-card-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
                                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                  <circle cx="8.5" cy="8.5" r="1.5" />
                                  <polyline points="21 15 16 10 5 21" />
                                </svg>
                                {images.length} Screenshots
                              </span>
                            </div>
                            <div className="hover-card-caption">
                              <span className="hover-card-sub">Quick Preview</span>
                              <span className="hover-card-action">Click to scroll all →</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="project-number">0{i + 1}</span>

                    <div className="project-card-top">
                      <span className="project-category-tag">{proj.category}</span>
                      <h3 className="project-title">{proj.title}</h3>
                    </div>

                    <p className="project-desc">{proj.description}</p>

                    <div className="project-tech">
                      {proj.technologies.map((tech, j) => (
                        <span key={j} className="project-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-card-bottom">
                      <button
                        className="project-inspect-btn"
                        onClick={() => {
                          sounds.playClick();
                          setSelectedProject(proj);
                        }}
                      >
                        <span>Inspect Specs</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                      </button>

                      <div className="project-links">
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          title="GitHub Repository"
                          onClick={() => sounds.playClick()}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                          Code
                        </a>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link live"
                            title="Launch Live App"
                            onClick={() => sounds.playClick()}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ── CLIENT TESTIMONIALS SECTION ── */}
        <section ref={sectionRefs.testimonials} id="testimonials" className="section reveal">
          <div className="section-header-flex">
            <div className="section-header">
              <span className="section-label">Verified Proof</span>
              <h2 className="section-title">Client <em>Reviews</em></h2>
              <div className="section-rule" />
            </div>

            <div className="reviews-header-actions">
              <button
                className="btn-leave-review"
                onClick={() => {
                  sounds.playClick();
                  setIsReviewModalOpen(true);
                }}
              >
                <span className="btn-star-icon">★</span> Leave a Review
              </button>
            </div>
          </div>

          {/* Credibility & Trust Metrics Bar */}
          <div className="reviews-stats-bar">
            <div className="review-stat-item">
              <span className="review-stat-num">5.0 / 5.0</span>
              <div className="review-stat-meta">
                <span className="review-stars-gold">★★★★★</span>
                <span className="review-stat-label">Average Client Rating</span>
              </div>
            </div>
            <div className="review-stat-divider" />
            <div className="review-stat-item">
              <span className="review-stat-num">100%</span>
              <div className="review-stat-meta">
                <span className="review-stat-pill">Verified Positive</span>
                <span className="review-stat-label">Recommendation Rate</span>
              </div>
            </div>
            <div className="review-stat-divider" />
            <div className="review-stat-item">
              <span className="review-stat-num">{reviews.length}+</span>
              <div className="review-stat-meta">
                <span className="review-stat-pill verified-pill">✓ Production Live</span>
                <span className="review-stat-label">Verified Deliveries</span>
              </div>
            </div>
            <div className="review-stat-divider" />
            <div className="review-stat-item">
              <span className="review-stat-num">0%</span>
              <div className="review-stat-meta">
                <span className="review-stat-pill">Zero Conflict</span>
                <span className="review-stat-label">Dispute / Delay Rate</span>
              </div>
            </div>
          </div>

          <div className="testimonials-grid">
            {reviews.map((t) => (
              <TiltCard key={t.id} maxTilt={6} scale={1.012} className="testimonial-card-tilt">
                <div className="testimonial-card">
                  {/* Card Header: Stars, Date, Platform */}
                  <div className="testimonial-card-top">
                    <div className="testimonial-stars">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <span key={s} className="star-icon">★</span>
                      ))}
                    </div>
                    <div className="testimonial-meta-badge">
                      <span className="verification-check">✓</span>
                      <span>{t.platform}</span>
                      <span className="testimonial-date">· {t.date}</span>
                    </div>
                  </div>

                  {/* Associated Project Pill */}
                  {t.verifiedProject && (
                    <div className="testimonial-project-pill">
                      <span className="project-pill-icon">📦</span>
                      <span className="project-pill-label">Project:</span>
                      <span className="project-pill-title">{t.verifiedProject}</span>
                    </div>
                  )}

                  {/* Quote content */}
                  <p className="testimonial-content">"{t.content}"</p>

                  {/* Highlight Tags */}
                  {t.highlightTags && t.highlightTags.length > 0 && (
                    <div className="testimonial-tags">
                      {t.highlightTags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="testimonial-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Author footer with real photo portrait */}
                  <div className="testimonial-author">
                    <div className="author-avatar-wrap">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="author-avatar-img"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                          const parent = (e.target as HTMLElement).parentElement;
                          if (parent) {
                            parent.classList.add("avatar-fallback");
                            parent.innerText = t.name.charAt(0);
                          }
                        }}
                      />
                      <span className="author-verified-badge" title="Verified Client">✓</span>
                    </div>
                    <div className="author-details">
                      <h4 className="author-name">{t.name}</h4>
                      <p className="author-role">{t.role}</p>
                      <p className="author-org">{t.organization}{t.location ? ` · ${t.location}` : ""}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── PROFESSIONAL EXPERIENCE TIMELINE ── */}
        <section ref={sectionRefs.experience} id="experience" className="section reveal">
          <div className="section-header">
            <span className="section-label">Track Record</span>
            <h2 className="section-title">Professional <em>Experience</em></h2>
            <div className="section-rule" />
          </div>

          <div className="timeline">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot" />
                </div>
                <div className="timeline-body">
                  <div className="timeline-top">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <p className="timeline-company">{exp.company} · {exp.location}</p>
                    </div>
                    <span className="timeline-period">{exp.period}</span>
                  </div>

                  <p className="timeline-desc">{exp.description}</p>

                  <div className="timeline-tech">
                    {exp.technologies.map((tech, j) => (
                      <span key={j} className="tech-pill">{tech}</span>
                    ))}
                  </div>

                  <ul className="timeline-achievements">
                    {exp.achievements.map((ach, j) => (
                      <li key={j}>{ach}</li>
                    ))}
                  </ul>

                  <div className="timeline-links">
                    {exp.github && (
                      <a
                        href={exp.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="timeline-link"
                        onClick={() => sounds.playClick()}
                      >
                        Source Code
                      </a>
                    )}
                    {exp.demo && (
                      <a
                        href={exp.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="timeline-link demo"
                        onClick={() => sounds.playClick()}
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION SECTION ── */}
        <section ref={sectionRefs.education} id="education" className="section reveal">
          <div className="section-header">
            <span className="section-label">Academic Foundations</span>
            <h2 className="section-title">Education</h2>
            <div className="section-rule" />
          </div>

          <div className="education-grid">
            <TiltCard maxTilt={8} scale={1.01} className="education-card-tilt">
              <div className="education-card">
                <div className="education-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="education-degree">Bachelor of Science in Computer Science</h3>
                  <p className="education-school">St. Mary's University College</p>
                  <div className="education-meta">
                    <span>2022 — 2026</span>
                    <span>Addis Ababa, Ethiopia</span>
                  </div>
                  <p className="education-note">
                    Focused on core algorithms, object-oriented software engineering, database systems,
                    network security, and scalable software design.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} scale={1.01} className="education-card-tilt">
              <div className="education-card">
                <div className="education-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="education-degree">Advanced Full-Stack Engineering</h3>
                  <p className="education-school">Addis Ababa University (Qiyas)</p>
                  <div className="education-meta">
                    <span>2026 — Present</span>
                    <span>Addis Ababa, Ethiopia</span>
                  </div>
                  <p className="education-note">
                    Advanced practical curriculum concentrating on production software architectures,
                    cloud scalability, and modern engineering design patterns.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* ── CERTIFICATES SECTION ── */}
        <section ref={sectionRefs.certs} id="certificates" className="section reveal">
          <div className="section-header">
            <span className="section-label">Verified Credentials</span>
            <h2 className="section-title">Certifications</h2>
            <div className="section-rule" />
          </div>

          <div className="certs-grid">
            {certificates.map((cert, i) => (
              <TiltCard key={i} maxTilt={10} scale={1.02} className="cert-card-tilt">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card"
                  onClick={() => sounds.playClick()}
                >
                  <div className="cert-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <p className="cert-date">{cert.date}</p>
                  </div>
                  <span className="cert-arrow">→</span>
                </a>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── CONTACT & DIRECT MESSAGE SECTION ── */}
        <section ref={sectionRefs.contact} id="contact" className="section reveal">
          <div className="section-header">
            <span className="section-label">Let's Connect</span>
            <h2 className="section-title">Get In <em>Touch</em></h2>
            <div className="section-rule" />
          </div>

          {/* Interactive Direct Message Form */}
          <ContactForm />

          {/* Quick Contact Channel Cards */}
          <div className="contact-grid">
            {contactItems.map((item, i) => (
              <div key={i} className="contact-card">
                <div className="contact-card-top">
                  <div
                    className="contact-card-icon"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      borderColor: `${item.color}35`,
                    }}
                  >
                    {item.type === "Email" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    )}
                    {item.type === "Phone" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    )}
                    {item.type === "Telegram" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                    )}
                    {item.type === "Location" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    )}
                  </div>
                  <div
                    className="contact-badge-pill"
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}12`,
                      borderColor: `${item.color}30`,
                    }}
                  >
                    <span className="badge-dot-small" style={{ backgroundColor: item.color }} />
                    <span>{item.tag}</span>
                  </div>
                </div>

                <div className="contact-info">
                  <span className="contact-title">{item.title}</span>
                  <span className="contact-value">{item.value}</span>
                  <p className="contact-desc">{item.subtitle}</p>
                </div>

                <div className="contact-actions">
                  {item.action && item.actionLabel && (
                    <a
                      href={item.action}
                      target={item.type === "Telegram" || item.type === "Location" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="contact-act-link primary-link"
                      onClick={() => sounds.playClick()}
                    >
                      {item.actionLabel}
                    </a>
                  )}
                  {item.secondaryAction && item.secondaryLabel && (
                    <a
                      href={item.secondaryAction}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-act-link secondary-link"
                      onClick={() => sounds.playClick()}
                    >
                      {item.secondaryLabel}
                    </a>
                  )}
                  {item.type !== "Location" && (
                    <button
                      className="contact-copy-btn"
                      onClick={() => handleCopy(item.value, item.type)}
                      title={`Copy ${item.type}`}
                    >
                      {copied === item.type ? "✓ Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Interactive Project Detail Modal ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* ── Submit Client Review Modal ── */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleNewReview}
        availableProjects={availableProjectTitles}
      />

      {/* ── Developer Terminal CLI Drawer ── */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* ── GLASS GALLERY POP-UP MODAL (Scrollable Screenshots with Glass Backdrop) ── */}
      {activeGalleryModal && (
        <div
          className="glass-gallery-modal-overlay"
          onClick={() => {
            sounds.playClick();
            setActiveGalleryModal(null);
          }}
        >
          <div
            className="glass-gallery-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="glass-gallery-header">
              <div className="glass-gallery-title-area">
                <span className="glass-gallery-cat">
                  {activeGalleryModal.project.category}
                </span>
                <h3 className="glass-gallery-title">
                  {activeGalleryModal.project.title}
                </h3>
              </div>

              <div className="glass-gallery-actions">
                <span className="glass-gallery-pill">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  {(activeGalleryModal.project.images || []).length} Full-Res Screenshots
                </span>
                <span className="glass-gallery-scroll-hint">
                  🖱️ Scroll to explore
                </span>
                <button
                  type="button"
                  className="glass-gallery-close-btn"
                  onClick={() => {
                    sounds.playClick();
                    setActiveGalleryModal(null);
                  }}
                  aria-label="Close Gallery"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Quick Jump Navigation Bar */}
            <div className="glass-gallery-jump-strip">
              <span className="glass-jump-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                Quick Jump:
              </span>
              {activeGalleryModal.project.images?.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="glass-jump-btn"
                  onClick={() => {
                    sounds.playClick();
                    const el = document.getElementById(`screenshot-card-${idx}`);
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Shot 0{idx + 1}
                </button>
              ))}
            </div>

            {/* Scrollable Gallery Body */}
            <div className="glass-gallery-scroll-feed">
              {activeGalleryModal.project.images && activeGalleryModal.project.images.length > 0 ? (
                activeGalleryModal.project.images.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    id={`screenshot-card-${idx}`}
                    className="glass-screenshot-item"
                  >
                    <div className="glass-screenshot-meta">
                      <div className="glass-screenshot-title-group">
                        <span className="glass-screenshot-badge">0{idx + 1}</span>
                        <span className="glass-screenshot-label">
                          {activeGalleryModal.project.title} — Screenshot {idx + 1} of{" "}
                          {activeGalleryModal.project.images!.length}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="glass-screenshot-zoom-btn"
                        onClick={() => {
                          sounds.playClick();
                          setActiveLightbox({
                            images: activeGalleryModal.project.images!,
                            index: idx,
                            title: activeGalleryModal.project.title,
                          });
                        }}
                      >
                        🔍 Expand View
                      </button>
                    </div>

                    <div
                      className="glass-screenshot-frame"
                      onClick={() => {
                        sounds.playClick();
                        setActiveLightbox({
                          images: activeGalleryModal.project.images!,
                          index: idx,
                          title: activeGalleryModal.project.title,
                        });
                      }}
                      title="Click to zoom in fullscreen"
                    >
                      <img
                        src={imgUrl}
                        alt={`${activeGalleryModal.project.title} screenshot ${idx + 1}`}
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-gallery-empty-state">
                  <p>No screenshots available for this project yet.</p>
                </div>
              )}
            </div>

            {/* Modal Footer with quick links */}
            <div className="glass-gallery-footer">
              <div className="glass-footer-links">
                <a
                  href={activeGalleryModal.project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-footer-link"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>View Source Code</span>
                </a>
                {activeGalleryModal.project.liveUrl && (
                  <a
                    href={activeGalleryModal.project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-footer-link live"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                    <span>Launch Live Project</span>
                  </a>
                )}
              </div>
              <button
                type="button"
                className="glass-footer-close-btn"
                onClick={() => {
                  sounds.playClick();
                  setActiveGalleryModal(null);
                }}
              >
                Done Viewing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Project Screenshot Lightbox Modal ── */}
      {activeLightbox && (
        <div
          className="project-lightbox-overlay"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="project-lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="project-lightbox-close"
              onClick={() => {
                sounds.playClick();
                setActiveLightbox(null);
              }}
              aria-label="Close Lightbox"
            >
              ✕
            </button>

            <div className="project-lightbox-header">
              <h4>{activeLightbox.title}</h4>
              <span className="lightbox-counter">
                {activeLightbox.index + 1} / {activeLightbox.images.length}
              </span>
            </div>

            <div className="project-lightbox-viewport">
              <img
                src={activeLightbox.images[activeLightbox.index]}
                alt={activeLightbox.title}
                className="project-lightbox-img"
              />

              {activeLightbox.images.length > 1 && (
                <>
                  <button
                    className="lightbox-arrow-btn prev"
                    onClick={() => {
                      sounds.playClick();
                      setActiveLightbox((prev) =>
                        prev
                          ? {
                            ...prev,
                            index:
                              (prev.index - 1 + prev.images.length) %
                              prev.images.length,
                          }
                          : null
                      );
                    }}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    className="lightbox-arrow-btn next"
                    onClick={() => {
                      sounds.playClick();
                      setActiveLightbox((prev) =>
                        prev
                          ? {
                            ...prev,
                            index: (prev.index + 1) % prev.images.length,
                          }
                          : null
                      );
                    }}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Portfolio;
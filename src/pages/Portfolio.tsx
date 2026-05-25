import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Portfolio.css";

/* ========== TYPES ========== */
interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

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

interface MainSkill {
  category: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
  tools: string[];
}

/* ========== DATA ========== */
const projects: Project[] = [
  {
    title: "HIDS-Hospital Information Dissemination System ",
    description:
      "Built a multi-role platform supporting Admin, Medical Director, Doctors, and Patients for efficient information sharing and communication.",
    technologies: ["PHP", "MySQL", "Security"],
    githubUrl: "https://github.com/Merdikai/HIDS",
    liveUrl: "",
    featured: true,
  },
  {
    title: "Nail Booking App",
    description:
      "A full‑stack nail salon booking platform with real‑time scheduling, customer management, and payment integration.",
    technologies: ["React", "Node.js", "Supabase", "Vite","TypeScript",/*"Stripe"*/],
    githubUrl: "https://github.com/Merdikai/nail-booking-app",
    liveUrl: "https://nail-booking-app-alpha.vercel.app/",
  },
  {
    title: "Personal Portfolio",
    description:
      "A modern, futuristic portfolio website with neon aesthetics, smooth animations, and glass‑morphism design.",
    technologies: ["React", "TypeScript", "Framer Motion"],
    githubUrl: "https://github.com/Merdikai/Merdekiyos-Tasew-Portofolio",
    liveUrl: "https://merdekiyos-tasew-portofolio.vercel.app/",
  },
];

const certificates: Certificate[] = [
  {
    title: "Programming Fundamentals Nanodegree",
    issuer: "Udacity",
    date: "March 2026",
    verificationUrl:
      "https://www.udacity.com/certificate/e/e4923d28-1e3f-11f1-9565-cfb6fd9b9a45",
  },
  {
    title: "Global Chapters - Ethiopia - Data Fundamentals",
    issuer: "Udacity",
    date: "March/20/2026",
    verificationUrl:
      "https://confirm.udacity.com/lp/2ccb661e-544e-41ee-a9d1-4aff6e8ef986",
  },
];

const experiences: Experience[] = [
  
    {
    role: "Full Stack Developer & SaaS Founder",
    company: "Ezer Nail Salon",
    period: "2025 - 2026",
    location: "Remote",
    description:
      "Architected and built a multi-tenant nail salon booking SaaS platform, handling everything from database design to deployment. The platform serves multiple nail salons with company-specific branding, admin dashboards, and customer booking systems.",
    technologies: ["React", "TypeScript", "Supabase", "Vite", "Bootstrap", "Framer Motion", "Vercel"],
    achievements: [
      "Built a complete multi-tenant SaaS platform supporting multiple nail salons with isolated data, custom branding, and company-specific admin panels.",
      "Implemented role-based authentication (Super Admin, Company Admin, Customer) .",
      "Designed responsive, glassmorphism UI with custom CSS animations and mobile-first design.",
      "Integrated Supabase for real-time database, authentication, and file storage with image upload support.",
      "Developed loyalty program tracking, booking management with status workflows (pending/confirmed/completed/cancelled).",
      "Created company settings page allowing each salon to customize branding, contact info, and page content.",
      "Deployed on Vercel with CI/CD pipeline and custom domain support ready.",
    ],
    github: "https://github.com/Merdikai/nail-booking-app",
    demo: "https://nail-booking-app-alpha.vercel.app",
},
  {
    role: "Freelance Web Developer",
    company: "Self‑Employed",
    period: "2025 - Present",
    location: "Remote",
    description:
      "Delivered custom websites for local businesses, handling everything from design to deployment.",
    technologies: ["React", "PHP", "MySQL", /*"SEO"*/ "TypeScript", "Supabase", "Vite", "Bootstrap", "Framer Motion", "Vercel"],
     achievements: [
      "Built 3+ responsive websites, increasing clients’ online presence.",
      "Implemented secure authentication and database encryption.",
    ],
    github: "https://github.com/Merdikai",
    demo: "https://merdekiyos-tasew-portofolio.vercel.app/",
  },

  {
    role: "Intern",
    company: "PEDS-Professional Electronic Data Systems PLC",
    period: "06/2025 – 01/2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "Worked on internal tools and client projects, focusing on modernising legacy systems and integrating third‑party services.",
    technologies: ["Java","MySQL"],
    achievements: [
      "Completed an internship providing support in business process consulting and ITstrategy initiatives",
      "contributing to software implementation and system integrationtasks",
      "Delivering technical support andtroubleshooting assistance",
  
    ],
    github: "https://github.com/Merdikai",
  },
];

const mainSkills: MainSkill[] = [
  {
    category: "Frontend Development",
    percentage: 85,
    color: "#6366f1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend Development",
    percentage: 78,
    color: "#8b5cf6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    tools: ["Node.js", "PHP", "Java", "MySQL","Supabase", /*"MongoDB(learning)"*/ "REST APIs(learning)"],
  },
  {
    category: "Mobile Development",
    percentage: 65,
    color: "#14b8a6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    tools: ["React Native", "Flutter (learning)", "Android Basics"],
  },
  {
    category: "DevOps & Cloud",
    percentage: 55,
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    tools: [ "Git","Supabase", "Vercel", "AWS (learning)","CI/CD"],
  },
];

const contactDetails = [
  {
    type: "Email",
    value: "merdekiyostasew@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    action: "mailto:merdekiyostasew@gmail.com",
    color: "#ea4335",
  },
  {
    type: "Phone",
    value: "+251 953 913 418",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    action: "tel:+251953913418",
    color: "#34a853",
  },
  {
    type: "Telegram",
    value: "@Merdi27",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.41-.88.03-.24.37-.49 1.02-.74 4.02-1.75 6.7-2.91 8.04-3.46 3.83-1.59 4.62-1.87 5.14-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" />
      </svg>
    ),
    action: "https://t.me/Merdi27",
    color: "#0088cc",
  },
  {
    type: "Location",
    value: "Addis Ababa, Ethiopia",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    color: "#4285f4",
  },
];

/* ========== COMPONENT ========== */
const Portfolio: React.FC = () => {
  const [animatedSkills, setAnimatedSkills] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const profileRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const certsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Intersection Observer for fade‑in sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = [
      heroRef.current,
      profileRef.current,
      skillsRef.current,
      experienceRef.current,
      educationRef.current,
      certsRef.current,
      projectsRef.current,
      contactRef.current,
    ];
    sections.forEach((sec) => sec && observer.observe(sec));

    return () => sections.forEach((sec) => sec && observer.unobserve(sec));
  }, []);

  // Trigger skill animation once
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedSkills(true);
        }
      },
      { threshold: 0.3 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => {
      if (skillsRef.current) obs.unobserve(skillsRef.current);
    };
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="portfolio">
      <Header />

      <main className="main-content">
        {/* ===== HOME ===== */}
        <section ref={heroRef} id="home" className="hero-section fade-up">
          <div className="hero-container">
            <div className="hero-badge-wrapper">
              <div className="hero-status-badge">
                <span className="status-dot" />
                Available for Work
              </div>
            </div>

            <h1 className="hero-name">
              Merdekiyos <span className="hero-name-accent">Tasew</span>
            </h1>

            <div className="hero-title-wrapper">
              <div className="hero-title-line" />
              <p className="hero-title-text">Full‑Stack Developer & App Developer</p>
              <div className="hero-title-line" />
            </div>

            <p className="hero-description-text">
              I build secure, scalable applications with modern technologies. Passionate about clean
              architecture, cybersecurity, and creating real‑world impact through innovative solutions.
            </p>

            <div className="hero-stats">
              <div className="stat-card">
                <span className="stat-number">1+</span>
                <span className="stat-label">Years Coding</span>
              </div>
              <div className="stat-divider-vertical" />
              <div className="stat-card">
                <span className="stat-number">2+</span>
                <span className="stat-label">Certificates</span>
              </div>
              <div className="stat-divider-vertical" />
              <div className="stat-card">
                <span className="stat-number">4+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="hero-btn hero-btn-primary">
                View Projects
              </a>
              <button onClick={() => setShowContactModal(true)} className="hero-btn hero-btn-outline">
                Get In Touch
              </button>
            </div>

            <div className="scroll-indicator">
              <span>Scroll to explore</span>
              <div className="scroll-mouse-icon">
                <div className="scroll-wheel-animated" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROFILE ===== */}
        <section ref={profileRef} id="profile" className="content-section fade-up">
          <div className="section-header">
            <span className="section-subtitle">Get to know me</span>
            <h2 className="section-heading">Profile</h2>
            <div className="section-line" />
          </div>
          <div className="profile-card">
            <div className="profile-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="40" height="40">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4z" />
              </svg>
            </div>
            <p className="profile-text">
              I am a <span className="highlight">Full Stack Developer</span> passionate about building scalable
              web and mobile applications. I focus on clean architectures, secure systems, and performance
              optimisation – always striving to deliver practical solutions that make a real impact.
            </p>
            <div className="profile-tags">
              <span className="profile-tag">Problem Solver</span>
              <span className="profile-tag">Quick Learner</span>
              <span className="profile-tag">Security Focused</span>
              <span className="profile-tag">Clean Code</span>
            </div>
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section ref={skillsRef} id="skills" className="content-section fade-up">
          <div className="section-header">
            <span className="section-subtitle">What I do best</span>
            <h2 className="section-heading">Technical Skills</h2>
            <div className="section-line" />
          </div>

          <div className="skills-grid">
            {mainSkills.map((skill, idx) => (
              <div key={idx} className="skill-card">
                <div className="skill-card-header">
                  <span className="skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </span>
                  <h3 className="skill-name">{skill.category}</h3>
                </div>
                <div className="skill-progress">
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: animatedSkills ? `${skill.percentage}%` : "0%",
                        background: skill.color,
                        transition: `width 1.5s cubic-bezier(0.4,0,0.2,1) ${idx * 0.2}s`,
                      }}
                    />
                  </div>
                  <span className="skill-percent">{skill.percentage}%</span>
                </div>
                <div className="skill-tools">
                  {skill.tools.map((tool, i) => (
                    <span key={i} className="tool-tag">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section ref={experienceRef} id="experience" className="content-section fade-up">
          <div className="section-header">
            <span className="section-subtitle">My Journey</span>
            <h2 className="section-heading">Professional Experience</h2>
            <div className="section-line" />
          </div>

          <div className="timeline">
            {experiences.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v4m-2-2h4" />
                  </svg>
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <p className="timeline-company">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <p className="timeline-description">{exp.description}</p>
                  <div className="timeline-tech">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="timeline-achievements">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                  <div className="timeline-links">
                    {exp.github && (
                      <a href={exp.github} target="_blank" rel="noopener noreferrer" className="timeline-link">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        Repository
                      </a>
                    )}
                    {exp.demo && (
                      <a href={exp.demo} target="_blank" rel="noopener noreferrer" className="timeline-link demo-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== EDUCATION ===== */}
        <section ref={educationRef} id="education" className="content-section fade-up">
          <div className="section-header">
            <span className="section-subtitle">Academic background</span>
            <h2 className="section-heading">Education</h2>
            <div className="section-line" />
          </div>
          <div className="education-card">
            <div className="education-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="36" height="36">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <div>
              <h3 className="education-degree">Bachelor of Science in Computer Science</h3>
              <p className="education-school">St. Mary's University College</p>
              <div className="education-meta">
                <span className="education-year">2022 — 2026</span>
                <span className="education-location">Addis Ababa, Ethiopia</span>
              </div>
              <div className="education-highlights">
                <span>Graduated with a strong foundation in Computer Science, focusing on software engineering, algorithms, and data structures.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CERTIFICATES ===== */}
        <section ref={certsRef} id="certificates" className="content-section fade-up">
          <div className="section-header">
            <span className="section-subtitle">Credentials</span>
            <h2 className="section-heading">Certifications</h2>
            <div className="section-line" />
          </div>
          <div className="certs-grid">
            {certificates.map((cert, idx) => (
              <a
                key={idx}
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card"
              >
                <div className="cert-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-date">{cert.date}</p>
                  <span className="cert-link-text">View Certificate →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section ref={projectsRef} id="projects" className="content-section fade-up">
          <div className="section-header">
            <span className="section-subtitle">What I've built</span>
            <h2 className="section-heading">Projects</h2>
            <div className="section-line" />
          </div>
          <div className="projects-grid">
            {projects.map((proj, idx) => (
              <div key={idx} className="project-card">
                {proj.featured && <span className="featured-badge">Featured</span>}
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-description">{proj.description}</p>
                <div className="project-tech">
                  {proj.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="project-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Code
                  </a>
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn live-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section ref={contactRef} id="contact" className="content-section fade-up">
          <div className="section-header">
            <span className="section-subtitle">Let's connect</span>
            <h2 className="section-heading">Contact</h2>
            <div className="section-line" />
          </div>
          <p className="contact-intro">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="contact-grid">
            {contactDetails.map((item, idx) => (
              <div key={idx} className="contact-card">
                <div className="contact-card-icon" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">{item.type}</span>
                  <span className="contact-card-value">{item.value}</span>
                </div>
                <div className="contact-card-actions">
                  {item.action && (
                    <a
                      href={item.action}
                      target={item.type === "Telegram" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="contact-action-link"
                      style={{ color: item.color }}
                    >
                      {item.type === "Email" ? "Mail" : item.type === "Phone" ? "Call" : "Open"}
                    </a>
                  )}
                  <button
                    className="contact-copy-btn"
                    onClick={() => handleCopy(item.value, item.type)}
                  >
                    {copiedField === item.type ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="contact-cta">
            <button onClick={() => setShowContactModal(true)} className="primary-btn">
              Start a Conversation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>
      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowContactModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <h2 className="modal-title">Let's Connect</h2>
            <p className="modal-subtitle">Choose your preferred way to reach me.</p>
            <div className="modal-contact-list">
              {contactDetails.map((item, idx) => (
                <div key={idx} className="modal-contact-item" style={{ borderLeftColor: item.color }}>
                  <span className="modal-contact-icon" style={{ color: item.color }}>{item.icon}</span>
                  <div>
                    <p className="modal-contact-type">{item.type}</p>
                    <p className="modal-contact-value">{item.value}</p>
                    <div className="modal-contact-actions">
                      {item.action && (
                        <a href={item.action} target="_blank" rel="noopener noreferrer" className="modal-action-link">
                          {item.type === "Email" ? "Send Email" : item.type === "Phone" ? "Call Now" : "Open"}
                        </a>
                      )}
                      <button onClick={() => handleCopy(item.value, item.type)} className="modal-copy-btn">
                        {copiedField === item.type ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Portfolio;
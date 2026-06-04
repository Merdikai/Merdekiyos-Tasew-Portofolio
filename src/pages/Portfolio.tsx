import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Portfolio.css";

/* ── Types ── */
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

interface Skill {
  category: string;
  percentage: number;
  color: string;
  tools: string[];
}

/* ── Data ── */
const projects: Project[] = [
  {
    title: "HIDS — Hospital Information Dissemination System",
    description:
      "Multi-role platform supporting Admin, Medical Director, Doctors, and Patients for efficient information sharing and communication.",
    technologies: ["PHP", "MySQL", "Security"],
    githubUrl: "https://github.com/Merdikai/HIDS",
    featured: true,
  },
  {
    title: "Nail Booking App",
    description:
      "Full-stack nail salon SaaS platform with real-time scheduling, multi-tenant architecture, customer management, and loyalty program.",
    technologies: ["React", "TypeScript", "Supabase", "Vite"],
    githubUrl: "https://github.com/Merdikai/nail-booking-app",
    liveUrl: "https://nail-booking-app-alpha.vercel.app/",
  },
  {
    title: "Personal Portfolio",
    description:
      "A modern portfolio website with sophisticated aesthetics, smooth animations, and refined design language.",
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
    verificationUrl: "https://www.udacity.com/certificate/e/e4923d28-1e3f-11f1-9565-cfb6fd9b9a45",
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
    role: "Full Stack Developer & SaaS Founder",
    company: "Ezer Nail Salon",
    period: "2025 — 2026",
    location: "Remote",
    description:
      "Architected and built a multi-tenant nail salon booking SaaS platform, handling everything from database design to deployment.",
    technologies: ["React", "TypeScript", "Supabase", "Vite", "Bootstrap", "Vercel"],
    achievements: [
      "Built a complete multi-tenant SaaS platform supporting multiple nail salons with isolated data and custom branding.",
      "Implemented role-based authentication (Super Admin, Company Admin, Customer).",
      "Designed responsive glassmorphism UI with custom CSS animations and mobile-first design.",
      "Integrated Supabase for real-time database, authentication, and file storage.",
      "Developed loyalty program tracking and booking management with status workflows.",
    ],
    github: "https://github.com/Merdikai/nail-booking-app",
    demo: "https://nail-booking-app-alpha.vercel.app",
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2025 — Present",
    location: "Remote",
    description:
      "Delivered custom websites for local businesses, handling everything from design to deployment.",
    technologies: ["React", "PHP", "MySQL", "TypeScript", "Supabase", "Vercel"],
    achievements: [
      "Built 3+ responsive websites, increasing clients' online presence.",
      "Implemented secure authentication and database encryption.",
    ],
    github: "https://github.com/Merdikai",
    demo: "https://merdekiyos-tasew-portofolio.vercel.app/",
  },
  {
    role: "Intern",
    company: "PEDS — Professional Electronic Data Systems PLC",
    period: "06/2025 — 01/2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "Worked on internal tools and client projects, focusing on modernising legacy systems and integrating third-party services.",
    technologies: ["Java", "MySQL"],
    achievements: [
      "Completed an internship supporting business process consulting and IT strategy initiatives.",
      "Contributed to software implementation and system integration tasks.",
      "Delivered technical support and troubleshooting assistance.",
    ],
    github: "https://github.com/Merdikai",
  },
];

const skills: Skill[] = [
  {
    category: "Frontend Development",
    percentage: 85,
    color: "#c4a369",
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend Development",
    percentage: 78,
    color: "#c97a7a",
    tools: ["Node.js", "PHP", "Java", "MySQL", "Supabase", "REST APIs"],
  },
  {
    category: "Mobile Development",
    percentage: 65,
    color: "#7a9c8a",
    tools: ["React Native", "Flutter (learning)", "Android Basics"],
  },
  {
    category: "DevOps & Cloud",
    percentage: 55,
    color: "#a369c4",
    tools: ["Git", "Supabase", "Vercel", "AWS (learning)", "CI/CD"],
  },
];

const contactItems = [
  {
    type: "Email",
    value: "merdekiyostasew@gmail.com",
    action: "mailto:merdekiyostasew@gmail.com",
    actionLabel: "Send Mail",
    color: "#c97a7a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    type: "Phone",
    value: "+251 953 913 418",
    action: "tel:+251953913418",
    actionLabel: "Call",
    color: "#7a9c8a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    type: "Telegram",
    value: "@Merdi27",
    action: "https://t.me/Merdi27",
    actionLabel: "Open",
    color: "#c4a369",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.41-.88.03-.24.37-.49 1.02-.74 4.02-1.75 6.7-2.91 8.04-3.46 3.83-1.59 4.62-1.87 5.14-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
      </svg>
    ),
  },
  {
    type: "Location",
    value: "Addis Ababa, Ethiopia",
    action: undefined,
    actionLabel: undefined,
    color: "#6a9ac4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

/* ── Component ── */
const Portfolio: React.FC = () => {
  const [animateSkills, setAnimateSkills] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const sectionRefs = {
    hero:       useRef<HTMLElement>(null),
    profile:    useRef<HTMLElement>(null),
    services:   useRef<HTMLElement>(null),
    skills:     useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    education:  useRef<HTMLElement>(null),
    certs:      useRef<HTMLElement>(null),
    projects:   useRef<HTMLElement>(null),
    contact:    useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    Object.values(sectionRefs).forEach((r) => r.current && observer.observe(r.current));
    return () => Object.values(sectionRefs).forEach((r) => r.current && observer.unobserve(r.current));
  }, []);

  useEffect(() => {
    if (!sectionRefs.skills.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimateSkills(true); }, { threshold: 0.2 });
    obs.observe(sectionRefs.skills.current);
    return () => { if (sectionRefs.skills.current) obs.unobserve(sectionRefs.skills.current); };
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyBtn: React.FC<{ text: string; id: string }> = ({ text, id }) => (
    <button className="contact-copy-btn" onClick={() => handleCopy(text, id)}>
      {copied === id ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>
          Copied
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </>
      )}
    </button>
  );

  const GithubSvg = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );

  const ExternalSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
    </svg>
  );

  return (
    <div className="portfolio">
      <Header />

      {/* ── PRO BACKGROUND ELEMENTS ── */}
      <div className="portfolio-ambient-orb" />
      <div className="portfolio-top-line" />
      <div className="portfolio-code-watermark">
{`const developer = {
  name: "Merdekiyos",
  stack: ["React", "TypeScript", "PHP"],
  passion: "Building secure systems",
  mission: "Clean architecture"
};

while (true) {
  learn();
  build();
  improve();
}`}
      </div>

      <main className="main-content">

        {/* ── HERO ── */}
        <section ref={sectionRefs.hero} id="home" className="hero-section reveal">
          <div className="section-dots">
            <span /><span /><span /><span /><span />
          </div>
          <div className="hero-inner">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for Work
            </div>

            <h1 className="hero-name">
              Merdekiyos<br />
              <span className="hero-name-em">Tasew</span>
            </h1>

            <div className="hero-subtitle-row">
              <div className="hero-subtitle-line" />
              <span className="hero-subtitle">Full-Stack &amp; App Developer</span>
            </div>

            <p className="hero-description">
              I build secure, scalable applications with modern technologies.
              Passionate about clean architecture, cybersecurity, and creating
              real-world impact through innovative software.
            </p>

            <div className="hero-stats">
              <div>
                <span className="hero-stat-num">1+</span>
                <span className="hero-stat-label">Years Coding</span>
              </div>
              <div className="hero-stat-sep" />
              <div>
                <span className="hero-stat-num">4+</span>
                <span className="hero-stat-label">Projects</span>
              </div>
              <div className="hero-stat-sep" />
              <div>
                <span className="hero-stat-num">2+</span>
                <span className="hero-stat-label">Certificates</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="hero-btn-primary"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
                View Projects
              </a>
              <button onClick={() => setShowModal(true)} className="hero-btn-outline">
                Get In Touch
              </button>
            </div>

            <div className="scroll-indicator">
              <div className="scroll-line" />
              <span>Scroll to explore</span>
            </div>
          </div>
        </section>

        {/* ── PROFILE ── */}
        <section ref={sectionRefs.profile} id="profile" className="section reveal">
          <div className="section-header">
            <span className="section-label">Get to know me</span>
            <h2 className="section-title">Profile</h2>
            <div className="section-rule" />
          </div>

          <div className="profile-glass">
            <span className="profile-quote-mark">"</span>
            <p className="profile-text">
              I am a <strong>Full Stack Developer</strong> passionate about building scalable
              web and mobile applications. I focus on clean architectures, secure systems, and
              performance optimisation — always striving to deliver practical solutions that
              make a real-world impact.
            </p>
            <div className="profile-tags">
              {["Problem Solver", "Quick Learner", "Security Focused", "Clean Code"].map((tag) => (
                <span key={tag} className="profile-tag">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section ref={sectionRefs.services} id="services" className="section reveal">
          <div className="section-header">
            <span className="section-label">What I offer</span>
            <h2 className="section-title">My <em>Services</em></h2>
            <div className="section-rule" />
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <h3 className="service-title">Web Development</h3>
              <p className="service-desc">Building responsive, performant web applications using React, TypeScript, and modern frameworks.</p>
              <div className="service-number">01</div>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <h3 className="service-title">App Development</h3>
              <p className="service-desc">Creating cross-platform mobile applications with React Native and modern mobile technologies.</p>
              <div className="service-number">02</div>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="service-title">Secure Systems</h3>
              <p className="service-desc">Implementing security best practices, authentication systems, and data protection protocols.</p>
              <div className="service-number">03</div>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3 className="service-title">Clean Architecture</h3>
              <p className="service-desc">Designing scalable, maintainable codebases with clean architecture principles and best practices.</p>
              <div className="service-number">04</div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section ref={sectionRefs.skills} id="skills" className="section reveal">
          <div className="section-header">
            <span className="section-label">What I do best</span>
            <h2 className="section-title">Technical <em>Skills</em></h2>
            <div className="section-rule" />
          </div>

          <div className="skills-grid">
            {skills.map((skill, i) => (
              <div key={i} className="skill-card" style={{ "--skill-color": skill.color } as React.CSSProperties}>
                <div className="skill-header">
                  <div className="skill-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke={skill.color} strokeWidth="1.5" width="20" height="20">
                      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
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
                        transitionDelay: `${i * 0.15}s`,
                      }}
                    />
                  </div>
                  <span className="skill-pct">{skill.percentage}%</span>
                </div>

                <div className="skill-tools">
                  {skill.tools.map((tool, j) => (
                    <span key={j} className="skill-tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section ref={sectionRefs.experience} id="experience" className="section reveal">
          <div className="section-header">
            <span className="section-label">My journey</span>
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
                    {exp.achievements.map((ach, j) => <li key={j}>{ach}</li>)}
                  </ul>

                  <div className="timeline-links">
                    {exp.github && (
                      <a href={exp.github} target="_blank" rel="noopener noreferrer" className="timeline-link">
                        <GithubSvg /> Repository
                      </a>
                    )}
                    {exp.demo && (
                      <a href={exp.demo} target="_blank" rel="noopener noreferrer" className="timeline-link demo">
                        <ExternalSvg /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section ref={sectionRefs.education} id="education" className="section reveal">
          <div className="section-header">
            <span className="section-label">Academic background</span>
            <h2 className="section-title">Education</h2>
            <div className="section-rule" />
          </div>

          <div className="education-card">
            <div className="education-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
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
                Graduated with a strong foundation in Computer Science, focusing on software
                engineering, algorithms, and data structures.
              </p>
            </div>
          </div>
        </section>

        {/* ── CERTIFICATES ── */}
        <section ref={sectionRefs.certs} id="certificates" className="section reveal">
          <div className="section-header">
            <span className="section-label">Credentials</span>
            <h2 className="section-title">Certifications</h2>
            <div className="section-rule" />
          </div>

          <div className="certs-grid">
            {certificates.map((cert, i) => (
              <a key={i} href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="cert-card">
                <div className="cert-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                </div>
                <div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-date">{cert.date}</p>
                </div>
                <span className="cert-arrow">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section ref={sectionRefs.projects} id="projects" className="section reveal">
          <div className="section-header">
            <span className="section-label">What I've built</span>
            <h2 className="section-title">Selected <em>Projects</em></h2>
            <div className="section-rule" />
          </div>

          <div className="projects-grid">
            {projects.map((proj, i) => (
              <div key={i} className="project-card">
                {proj.featured && <span className="project-featured-badge">Featured</span>}
                <span className="project-number">0{i + 1}</span>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.description}</p>
                <div className="project-tech">
                  {proj.technologies.map((tech, j) => (
                    <span key={j} className="project-tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    <GithubSvg /> Code
                  </a>
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live">
                      <ExternalSvg /> Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section ref={sectionRefs.contact} id="contact" className="section reveal">
          <div className="section-header">
            <span className="section-label">Let's connect</span>
            <h2 className="section-title">Get In <em>Touch</em></h2>
            <div className="section-rule" />
          </div>

          <p className="contact-intro">
            I'm always open to new opportunities and collaborations.<br />
            Feel free to reach out through any channel below.
          </p>

          <div className="contact-grid">
            {contactItems.map((item, i) => (
              <div key={i} className="contact-card">
                <div className="contact-icon" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className="contact-info">
                  <span className="contact-label">{item.type}</span>
                  <span className="contact-value">{item.value}</span>
                </div>
                <div className="contact-actions">
                  {item.action && item.actionLabel && (
                    <a
                      href={item.action}
                      target={item.type === "Telegram" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="contact-act-link"
                      style={{ color: item.color, borderColor: `${item.color}33` }}
                    >
                      {item.actionLabel}
                    </a>
                  )}
                  {item.type !== "Location" && (
                    <CopyBtn text={item.value} id={item.type} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="contact-cta">
            <button onClick={() => setShowModal(true)} className="cta-btn">
              Start a Conversation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </section>

      </main>

      {/* ── MODAL ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <h2 className="modal-title">Let's <em>Connect</em></h2>
            <p className="modal-subtitle">Choose your preferred way to reach me</p>

            <div className="modal-items">
              {contactItems.map((item, i) => (
                <div key={i} className="modal-item" style={{ borderLeftColor: item.color }}>
                  <span className="modal-item-icon" style={{ color: item.color }}>{item.icon}</span>
                  <div className="modal-item-body">
                    <p className="modal-item-type">{item.type}</p>
                    <p className="modal-item-value">{item.value}</p>
                    <div className="modal-item-actions">
                      {item.action && item.actionLabel && (
                        <a href={item.action} target="_blank" rel="noopener noreferrer" className="modal-act-link">
                          {item.actionLabel}
                        </a>
                      )}
                      {item.type !== "Location" && (
                        <button className="modal-copy" onClick={() => handleCopy(item.value, `modal-${item.type}`)}>
                          {copied === `modal-${item.type}` ? "Copied!" : "Copy"}
                        </button>
                      )}
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
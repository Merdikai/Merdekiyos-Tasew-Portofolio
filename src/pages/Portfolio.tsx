import React, { useEffect, useState } from "react";
import "./Portfolio.css";

// Types and Interfaces


interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

interface SkillCategory {
  title: string;
  skills: string[];
}

interface Language {
  name: string;
  level: string;
  proficiency: number;
}

interface Project {
  title: string;
  fullTitle: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  featured?: boolean;
}

interface Certificate {
  title: string;
  subtitle: string;
  recipient: string;
  date: string;
  verificationUrl: string;
  issuer: string;
}

// Header Component
const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems: Array<{ id: string; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'contact', label: 'Contact' },
    { id: 'objective', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'certificate', label: 'Certificate' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <button onClick={() => scrollToSection('home')} className="nav-logo">
          MT<span className="nav-logo-dot">.</span>
        </button>
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="nav-link"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>© {currentYear} Merdekiyos Tasew. All rights reserved.</p>
        <p className="footer-tagline">Built with precision • Powered by innovation</p>
      </div>
    </footer>
  );
};

// Main Portfolio Component
const Portfolio: React.FC = () => {
  // Constants
  const certificateUrl: string = "https://www.udacity.com/certificate/e/e4923d28-1e3f-11f1-9565-cfb6fd9b9a45";
  const projectUrl: string = "https://github.com/Merdikai/HIDS";

  // Data
  const contactInfo: ContactItem[] = [
    { icon: '👤', label: 'Name', value: 'Merdekiyos Tasew' },
    { icon: '📍', label: 'Location', value: 'Addis Ababa, Ethiopia' },
    { icon: '📱', label: 'Phone', value: '0953913418' },
    { icon: '📧', label: 'Email', value: 'merdekiyostasew@gmail.com' },
  ];

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Responsive Design']
    },
    {
      title: 'Backend',
      skills: ['Java', 'C++', 'PHP', 'Node.js', 'RESTful APIs', 'MySQL']
    },
    {
      title: 'Security & Tools',
      skills: ['Security Principles', 'Authentication', 'Git', 'GitHub', 'VS Code', 'Database Security']
    },
    {
      title: 'Soft Skills',
      skills: ['Quick Learner', 'Team Collaboration', 'Communication', 'Problem Solving', 'Time Management', 'Adaptability']
    }
  ];

  const languages: Language[] = [
    { name: 'Amharic', level: 'Native', proficiency: 100 },
    { name: 'English', level: 'Fluent', proficiency: 95 },
  ];

  const projects: Project[] = [
    {
      title: 'HIDS',
      fullTitle: 'Host-based Intrusion Detection System',
      description: 'A Host-based Intrusion Detection System that monitors and analyzes system activities for suspicious behavior and potential security threats in real-time.',
      technologies: ['PHP', 'MySQL', 'Security'],
      githubUrl: projectUrl,
      featured: true
    }
  ];

  const certificate: Certificate = {
    title: 'Verified Certificate Of Nanodegree Program Completion',
    subtitle: 'Programming Fundamentals',
    recipient: 'Merdekiyos Tasew',
    date: 'March 13, 2026',
    verificationUrl: certificateUrl,
    issuer: 'Udacity'
  };

  return (
    <div className="portfolio">
      <Header />

      <main className="content">
        {/* Home Section */}
        <section id="home" className="section-home section">
          <h2 className="section-title">WELCOME</h2>
          <div className="hero-content">
            <h1 className="hero-title">
              Merdekiyos <span className="hero-title-accent">Tasew</span>
            </h1>
            <p className="hero-subtitle">Computer Science Student & Software Developer</p>
            <p className="hero-description">
              Passionate about building innovative solutions and exploring the frontiers of technology.
              Final year student at St. Mary's University College.
            </p>
            <div className="hero-cta">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} 
                className="cta-button primary"
              >
                View My Work
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                className="cta-button secondary"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-contact section">
          <h2 className="section-title">CONTACT</h2>
          <div className="contact-grid">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-item">
                <span className="contact-icon">{item.icon}</span>
                <div className="contact-details">
                  <span className="contact-label">{item.label}</span>
                  <span className="contact-value">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Objective Section */}
        <section id="objective" className="section-objective section">
          <h2 className="section-title">OBJECTIVE</h2>
          <div className="objective-card">
            <p className="objective-text">
              Motivated and ambitious final year Computer Science student with a strong
              foundation in software development, problem solving, and modern
              programming tools. Actively seeking internship opportunity to apply
              academic knowledge in a real world environment, contribute meaningfully to
              innovative projects, and grow through collaboration with experienced
              professionals. Committed to continuous learning, technical excellence, and
              delivering high-quality results in a fast-paced tech-driven setting.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section-education section">
          <h2 className="section-title">EDUCATION</h2>
          <div className="education-card">
            <div className="education-year">2022 — 2026</div>
            <h3 className="education-institution">St. Mary's University College</h3>
            <p className="education-location">Addis Ababa, Ethiopia</p>
            <p className="education-degree">Bachelor of Science in Computer Science</p>
            <div className="education-highlights">
              <span className="highlight-badge">Current GPA: 3.8/4.0</span>
              <span className="highlight-badge">Dean's List</span>
              <span className="highlight-badge">Merit Scholarship</span>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-skills section">
          <h2 className="section-title">SKILLS</h2>
          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <h3 className="skill-category-title">{category.title}</h3>
                <div className="skill-items">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages Section */}
        <section id="languages" className="section-languages section">
          <h2 className="section-title">LANGUAGES</h2>
          <div className="languages-container">
            {languages.map((language, index) => (
              <div key={index} className="language-item">
                <div className="language-info">
                  <span className="language-name">{language.name}</span>
                  <span className="language-level">{language.level}</span>
                </div>
                <div className="language-proficiency">
                  <div 
                    className="proficiency-bar" 
                    style={{ width: `${language.proficiency}%` }}
                    role="progressbar"
                    aria-valuenow={language.proficiency}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span className="proficiency-percent">{language.proficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificate Section */}
        <section id="certificate" className="section-certificate section">
          <h2 className="section-title">CERTIFICATE</h2>
          <div className="certificate-card">
            <div className="certificate-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 17.5L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="certificate-content">
              <h3 className="certificate-title">{certificate.title}</h3>
              <h4 className="certificate-subtitle">{certificate.subtitle}</h4>
              <p className="certificate-recipient">
                <span className="certificate-label">Awarded to</span>
                <span className="recipient-name">{certificate.recipient}</span>
              </p>
              <p className="certificate-date">{certificate.date}</p>
              <div className="certificate-verification">
                <span className="verification-badge">
                  ✓ Verified by {certificate.issuer}
                </span>
                <a 
                  href={certificate.verificationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="certificate-link"
                >
                  View Certificate
                  <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H8M17 7V16"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-projects section">
          <h2 className="section-title">PROJECTS</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                {project.featured && (
                  <div className="project-badge">Featured Project</div>
                )}
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                </div>
                <p className="project-full-title">{project.fullTitle}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <p className="project-description">{project.description}</p>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                >
                  <span>View on GitHub</span>
                  <svg className="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
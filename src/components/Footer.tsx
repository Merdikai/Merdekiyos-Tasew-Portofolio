import React, { useState, useEffect } from "react";
import "./Footer.css";

interface FooterProps {
  /** Optional custom copyright text */
  copyrightText?: string;
  /** Optional custom credit text */
  creditText?: string;
  /** Whether to show the back to top button */
  showBackToTop?: boolean;
  /** Whether to show the social links */
  showSocialLinks?: boolean;
  /** Whether to show the quick links */
  showQuickLinks?: boolean;
  /** Custom class name for additional styling */
  className?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

interface QuickLink {
  name: string;
  url: string;
  sectionId: string;
}

const Footer: React.FC<FooterProps> = ({
  copyrightText,
  creditText = "Built with React & TypeScript",
  showBackToTop = true,
  showSocialLinks = true,
  showQuickLinks = true,
  className = "",
}) => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const currentYear: number = new Date().getFullYear();

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Social media links with icons
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/Merdikai',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      ),
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      name: 'Email',
      url: 'mailto:merdekiyostasew@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      ariaLabel: 'Send me an email'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/merdekiyos', // Update with actual LinkedIn URL
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.68-1.68-1.68a1.68 1.68 0 0 0-1.68 1.68c0 .93.75 1.68 1.68 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      ),
      ariaLabel: 'Visit my LinkedIn profile'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/merdekiyos', // Update with actual Twitter URL
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
        </svg>
      ),
      ariaLabel: 'Follow me on Twitter'
    }
  ];

  // Quick links
  const quickLinks: QuickLink[] = [
    { name: 'Home', url: '#home', sectionId: 'home' },
    { name: 'About', url: '#objective', sectionId: 'objective' },
    { name: 'Projects', url: '#projects', sectionId: 'projects' },
    { name: 'Skills', url: '#skills', sectionId: 'skills' },
    { name: 'Education', url: '#education', sectionId: 'education' },
    { name: 'Contact', url: '#contact', sectionId: 'contact' }
  ];

  const handleQuickLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className={`footer ${className}`} role="contentinfo">
      <div className="footer-container">
        {/* Back to Top Button */}
        {showBackToTop && showScrollTop && (
          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        )}

        <div className="footer-content">
          {/* Profile Section */}
          <div className="footer-section profile-section">
            <div className="footer-logo">
              <span className="logo-text">MT</span>
              <span className="logo-dot">.</span>
            </div>
            <h3 className="footer-name">Merdekiyos Tasew</h3>
            <p className="footer-title">Computer Science Student</p>
            <p className="footer-bio">
              Building innovative solutions with modern technologies.
              Passionate about cybersecurity and software development.
            </p>
          </div>

          {/* Quick Links Section */}
          {showQuickLinks && (
            <div className="footer-section links-section">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links" role="list">
                {quickLinks.map((link) => (
                  <li key={link.sectionId} role="listitem">
                    <a
                      href={link.url}
                      onClick={(e) => handleQuickLinkClick(e, link.sectionId)}
                      className="footer-link"
                    >
                      <span className="link-indicator"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links Section */}
          {showSocialLinks && (
            <div className="footer-section social-section">
              <h4 className="footer-heading">Connect</h4>
              <div className="social-links" role="list">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={link.ariaLabel}
                    title={link.name}
                    role="listitem"
                  >
                    <span className="social-icon" aria-hidden="true">
                      {link.icon}
                    </span>
                    <span className="social-name">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              {copyrightText || `© ${currentYear} Merdekiyos Tasew. All rights reserved.`}
            </p>
            <p className="footer-credit">
              <span className="credit-text">{creditText}</span>
              <span className="credit-heart" aria-hidden="true">❤️</span>
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="footer-decoration" aria-hidden="true">
            <div className="decoration-line"></div>
            <div className="decoration-dots"></div>
          </div>
        </div>
      </div>

      {/* Neon glow overlay */}
      <div className="footer-glow" aria-hidden="true"></div>
    </footer>
  );
};

export default Footer;
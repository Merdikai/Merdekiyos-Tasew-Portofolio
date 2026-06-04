import React, { useState, useEffect } from "react";
import "./Footer.css";

interface FooterProps {
  copyrightText?: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText }) => {
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home",     id: "home"     },
    { label: "Profile",  id: "profile"  },
    { label: "Services", id: "services" },
    { label: "Projects", id: "projects" },
    { label: "Skills",   id: "skills"   },
    { label: "Contact",  id: "contact"  },
  ];

  const GithubSvg = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const LinkedinSvg = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const EmailSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  const TelegramSvg = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.416-.168.556-.5.743-.823.761-.7.066-1.231-.462-1.909-.907-1.06-.695-1.658-1.128-2.688-1.807-1.189-.784-.418-1.214.264-1.919.18-.187 3.276-3.003 3.336-3.258.007-.032.014-.153-.057-.212-.07-.058-.173-.038-.25-.023-.106.019-1.78 1.132-5.035 3.326-.477.329-.909.49-1.295.479-.427-.009-1.247-.241-1.857-.439-.749-.254-1.344-.388-1.292-.813.027-.226.339-.458 1.031-.698 4.426-1.928 7.379-3.199 8.86-3.812 3.944-1.64 4.764-1.924 5.296-1.934.117-.002.379.027.549.167.143.117.182.275.2.438.018.163.036.58-.006.9z"/>
    </svg>
  );

  const PhoneSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );

  const LocationSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  const ArrowUpSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  );

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <span className="footer-logo-text">MT</span>
              <span className="footer-logo-dot">.</span>
            </div>
            <p className="footer-tagline">
              Building the future,<br />one line of code at a time.
            </p>
            <div className="footer-contact-mini">
              <span><EmailSvg /> merdekiyostasew@gmail.com</span>
              <span><PhoneSvg /> +251 953 913 418</span>
              <span><LocationSvg /> Addis Ababa, Ethiopia</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="footer-link"
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  >
                    <span className="footer-link-arrow">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social">
              <a href="https://github.com/Merdikai" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub">
                <GithubSvg />
              </a>
              <a href="https://linkedin.com/in/merdekiyos-tasew" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                <LinkedinSvg />
              </a>
              <a href="mailto:merdekiyostasew@gmail.com" className="footer-social-icon" aria-label="Email">
                <EmailSvg />
              </a>
              <a href="https://t.me/Merdi27" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Telegram">
                <TelegramSvg />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            {copyrightText || `© ${year} Merdekiyos Tasew. All rights reserved.`}
          </p>
          <p className="footer-credit">
            Designed &amp; Built with <span className="footer-heart">♥</span>
          </p>
        </div>
      </div>

      {showTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <ArrowUpSvg />
        </button>
      )}
    </footer>
  );
};

export default Footer;
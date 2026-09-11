import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { sounds } from "../utils/soundEffects";
import ThemeSwitcher from "./ThemeSwitcher";
import { toggleThemeMode, type ThemeMode } from "../utils/theme";

interface HeaderProps {
  logoText?: string;
  onOpenTerminal?: () => void;
  onSelectTheme?: (themeId: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  logoText = "MT",
  onOpenTerminal,
  onSelectTheme,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [progress, setProgress] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(sounds.isEnabled());
  const [currentMode, setCurrentMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem("merdi_mode") as ThemeMode) || "light";
  });
  const location = useLocation();

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: ThemeMode }>;
      if (customEvent.detail && customEvent.detail.mode) {
        setCurrentMode(customEvent.detail.mode);
      }
    };
    window.addEventListener("portfolio-theme-change", handleSync);
    return () => window.removeEventListener("portfolio-theme-change", handleSync);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(height > 0 ? winScroll / height : 0);
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.scrollY + 140;
      sections.forEach((sec) => {
        const top = (sec as HTMLElement).offsetTop;
        const h = (sec as HTMLElement).offsetHeight;
        if (scrollPos >= top && scrollPos < top + h) {
          setActiveSection(sec.getAttribute("id") || "");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = sounds.toggle();
    setIsSoundOn(newState);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    sounds.playClick();
    if (location.pathname === "/portfolio") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: "home" },
    { id: "profile", label: "Profile", icon: "user" },
    { id: "services", label: "Services", icon: "services" },
    { id: "skills", label: "Skills", icon: "skills" },
    { id: "projects", label: "Projects", icon: "projects" },
    { id: "testimonials", label: "Reviews", icon: "star" },
    { id: "experience", label: "Experience", icon: "briefcase" },
    { id: "education", label: "Education", icon: "education" },
    { id: "certificates", label: "Certificates", icon: "award" },
    { id: "contact", label: "Contact", icon: "contact" },
  ];

  const renderNavIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case "user":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case "services":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        );
      case "skills":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case "briefcase":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case "projects":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "star":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case "education":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
          </svg>
        );
      case "award":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
          </svg>
        );
      case "contact":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={() => sounds.playClick()}>
            <span className="logo-text">{logoText}</span>
            <span className="logo-dot">.</span>
          </Link>

          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  onMouseEnter={() => sounds.playHover()}
                >
                  <span className="nav-icon">{renderNavIcon(item.icon)}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-extra-actions">
            {/* Terminal Quick Button */}
            {onOpenTerminal && (
              <button
                className="nav-terminal-btn"
                onClick={() => {
                  sounds.playClick();
                  onOpenTerminal();
                }}
                title="Launch Terminal CLI"
              >
                <span className="nav-term-prompt">&gt;_</span>
                <span className="nav-term-text">CLI</span>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              className={`nav-sound-btn ${isSoundOn ? "active" : ""}`}
              onClick={handleSoundToggle}
              title={isSoundOn ? "Mute cyber audio" : "Enable futuristic sound effects"}
            >
              <span className="sound-wave sound-wave-1" />
              <span className="sound-wave sound-wave-2" />
              <span className="sound-wave sound-wave-3" />
            </button>

            {/* Quick 1-Click Dark/Light Mode Toggle */}
            <button
              className="nav-mode-toggle-btn"
              onClick={() => {
                sounds.playClick();
                const newMode = toggleThemeMode();
                setCurrentMode(newMode);
              }}
              title={currentMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme mode"
            >
              {currentMode === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Theme Switcher */}
            <ThemeSwitcher onThemeChange={onSelectTheme} />

            {/* Social Icons */}
            <div className="nav-social">
              <a
                href="https://github.com/Merdikai"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-social-icon"
                title="GitHub"
                onClick={() => sounds.playClick()}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://t.me/Merdi27"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-social-icon"
                title="Telegram"
                onClick={() => sounds.playClick()}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.416-.168.556-.5.743-.823.761-.7.066-1.231-.462-1.909-.907-1.06-.695-1.658-1.128-2.688-1.807-1.189-.784-.418-1.214.264-1.919.18-.187 3.276-3.003 3.336-3.258.007-.032.014-.153-.057-.212-.07-.058-.173-.038-.25-.023-.106.019-1.78 1.132-5.035 3.326-.477.329-.909.49-1.295.479-.427-.009-1.247-.241-1.857-.439-.749-.254-1.344-.388-1.292-.813.027-.226.339-.458 1.031-.698 4.426-1.928 7.379-3.199 8.86-3.812 3.944-1.64 4.764-1.924 5.296-1.934.117-.002.379.027.549.167.143.117.182.275.2.438.018.163.036.58-.006.9z" />
                </svg>
              </a>
            </div>

            <button
              className={`burger-menu ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links">
            {navItems.map((item, index) => (
              <li key={item.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <a
                  href={`#${item.id}`}
                  className={`mobile-nav-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  <span className="mobile-nav-icon">{renderNavIcon(item.icon)}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-footer">
            <div className="mobile-tools-row">
              {onOpenTerminal && (
                <button
                  className="mobile-tool-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenTerminal();
                  }}
                >
                  <span>&gt;_ Interactive Terminal</span>
                </button>
              )}
              <button
                className="mobile-tool-btn"
                onClick={handleSoundToggle}
              >
                <span>{isSoundOn ? "🔊 Audio FX: ON" : "🔇 Audio FX: OFF"}</span>
              </button>
              <button
                className="mobile-tool-btn"
                onClick={() => {
                  sounds.playClick();
                  const newMode = toggleThemeMode();
                  setCurrentMode(newMode);
                }}
              >
                <span>{currentMode === "dark" ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}</span>
              </button>
            </div>

            <div className="mobile-contact-info">
              <p>merdekiyostasew@gmail.com</p>
              <p>+251 953 913 418</p>
              <p>Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default Header;
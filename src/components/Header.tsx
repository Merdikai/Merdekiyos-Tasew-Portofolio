import React, { useState, useEffect } from "react";
import "./Header.css";

interface HeaderProps {
  // Optional props for customization
  logoText?: string;
  showBurgerMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  logoText = "MT",
  showBurgerMenu = true 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const nav = document.querySelector('.nav');
      const burger = document.querySelector('.burger-menu');
      
      if (isMenuOpen && nav && !nav.contains(event.target as Node) && 
          burger && !burger.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      closeMenu();
    }
  };

  const navItems: Array<{ id: string; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'objective', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certificate', label: 'Certificate' },
    { id: 'languages', label: 'Languages' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a 
          href="#home" 
          className="nav-logo"
          onClick={(e) => handleNavClick(e, 'home')}
          aria-label="Go to homepage"
        >
          {logoText}
          <span className="nav-logo-dot">.</span>
        </a>
        
        {/* Burger Icon */}
        {showBurgerMenu && (
          <button 
            className={`burger-menu ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        {/* Navigation Menu */}
        <ul 
          id="nav-menu"
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          {navItems.map((item) => (
            <li key={item.id} className="nav-item" role="none">
              <a
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.id)}
                role="menuitem"
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
                <span className="nav-link-indicator"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div 
            className="menu-overlay" 
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  );
};

export default Header;
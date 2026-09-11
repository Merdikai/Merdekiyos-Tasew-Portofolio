import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import ThreeBackground from "../components/ThreeBackground";
import TiltCard from "../components/TiltCard";
import TerminalDrawer from "../components/TerminalDrawer";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { toggleThemeMode, type ThemeMode } from "../utils/theme";
import { sounds } from "../utils/soundEffects";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(sounds.isEnabled());
  const [currentMode, setCurrentMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem("merdi_mode") as ThemeMode) || "light";
  });

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

  // Animated counters
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const [certs, setCerts] = useState(0);

  useEffect(() => {
    // Smooth counter animation
    const duration = 1200;
    const steps = 20;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setYears(Math.min(1, Math.round(progress * 1)));
      setProjects(Math.round(progress * 5));
      setCerts(Math.round(progress * 3));

      if (step >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleDownloadCV = () => {
    sounds.playSuccess();
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Merdekiyos_Tasew_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavigatePortfolio = () => {
    sounds.playClick();
    navigate("/portfolio");
  };

  const handleToggleSound = () => {
    const newState = sounds.toggle();
    setIsSoundOn(newState);
  };

  return (
    <div className="landing">
      {/* ── 3D WebGL Engine & Video FX Background ── */}
      <ThreeBackground initialMode="nebula" showControls={true} />

      {/* ── Top Bar Controls (Theme Switcher, Audio, Terminal) ── */}
      <header className="landing-topbar">
        <div className="landing-logo">
          <span>MT</span>
          <span className="logo-sparkle">✦</span>
        </div>

        <div className="landing-topbar-actions">
          <button
            className="landing-terminal-trigger"
            onClick={() => {
              sounds.playClick();
              setIsTerminalOpen(true);
            }}
            title="Launch Terminal CLI"
          >
            <span className="term-prompt-cyan">&gt;_</span>
            <span>CLI</span>
          </button>

          <button
            className={`landing-sound-btn ${isSoundOn ? "active" : ""}`}
            onClick={handleToggleSound}
            title={isSoundOn ? "Mute audio" : "Enable futuristic sound effects"}
          >
            <span className="landing-wave wave-1" />
            <span className="landing-wave wave-2" />
            <span className="landing-wave wave-3" />
          </button>

          {/* Quick Light/Dark Mode Toggle */}
          <button
            className="landing-sound-btn"
            onClick={() => {
              sounds.playClick();
              const newMode = toggleThemeMode();
              setCurrentMode(newMode);
            }}
            title={currentMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme mode"
          >
            {currentMode === "dark" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <ThemeSwitcher />
        </div>
      </header>

      {/* ── Main Landing Hero ── */}
      <main className="landing-content">
        <TiltCard maxTilt={10} scale={1.015} className="landing-card-tilt">
          <div className="landing-card">
            {/* Holographic Specular Highlight */}
            <div className="card-ambient-light" />

            {/* Eyebrow / Availability Status */}
            <div className="landing-eyebrow">
              <span className="eyebrow-beacon" />
              <span className="eyebrow-text">Available for High-Impact Roles</span>
            </div>

            {/* 3D Holographic Avatar & Orbiting Rings */}
            <div className="landing-avatar-wrap">
              <div className="avatar-energy-halo" />
              <div className="avatar-ring avatar-ring-outer" />
              <div className="avatar-ring avatar-ring-mid" />
              <div className="avatar-ring avatar-ring-inner" />

              <div className="avatar-core">
                {!imageError ? (
                  <img
                    src="/merdi.jpg"
                    alt="Merdekiyos Tasew"
                    className="landing-avatar"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="landing-avatar-fallback">MT</div>
                )}
              </div>

              {/* Status beacon badge */}
              <div className="avatar-status-badge" title="Open for Work">
                <span className="status-ping" />
              </div>
            </div>

            {/* Name with kinetic gradient shine */}
            <h1 className="landing-name">
              Merdekiyos <span className="name-gradient">Tasew</span>
            </h1>

            {/* Subtitle / Role */}
            <p className="landing-title">
              Full-Stack &amp; Software Engineer
            </p>

            <div className="landing-divider" />

            {/* Dynamic Counter Stats */}
            <div className="landing-stats">
              <div className="landing-stat">
                <span className="landing-stat-num">{years}</span>
                <span className="landing-stat-label">Years Exp.</span>
              </div>
              <div className="landing-stat-sep" />
              <div className="landing-stat">
                <span className="landing-stat-num">{projects}+</span>
                <span className="landing-stat-label">Production Apps</span>
              </div>
              <div className="landing-stat-sep" />
              <div className="landing-stat">
                <span className="landing-stat-num">{certs}+</span>
                <span className="landing-stat-label">Certifications</span>
              </div>
            </div>

            {/* Professional Bio */}
            <p className="landing-bio">
              Architecting secure, scalable full-stack web applications, SaaS platforms, and
              clean APIs. Passionate about software architecture, data integrity, and creating
              measurable real-world impact.
            </p>

            {/* Interactive Action Buttons */}
            <div className="landing-actions">
              <button
                className="btn-gold"
                onClick={handleNavigatePortfolio}
                onMouseEnter={() => sounds.playHover()}
              >
                <span>Enter Portfolio</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="btn-arrow"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                className="btn-ghost"
                onClick={handleDownloadCV}
                onMouseEnter={() => sounds.playHover()}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  style={{ width: 17, height: 17 }}
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                <span>Download CV</span>
              </button>
            </div>

            {/* Quick Skills Marquee Tags */}
            <div className="landing-tech-pills">
              <span>React</span>
              <span>TypeScript</span>
              <span>Supabase</span>
              <span>Node.js</span>
              <span>C# / .NET</span>
              <span>PHP / MySQL</span>
            </div>
          </div>
        </TiltCard>
      </main>

      {/* ── Interactive CLI Terminal Drawer ── */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
};

export default Landing;

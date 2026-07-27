import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState<boolean>(false);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Merdekiyos_Tasew_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="landing">
      {/* Background */}
      <div className="landing-bg">
        <div className="landing-bg-lines" />
        <div className="landing-bg-orb landing-bg-orb--1" />
        <div className="landing-bg-orb landing-bg-orb--2" />
      </div>

      <div className="landing-content">
        <div className="landing-card">

          {/* Eyebrow */}
          <div className="landing-eyebrow">
            <span className="eyebrow-dot" />
            Available for Work
          </div>

          {/* Avatar */}
          <div className="landing-avatar-wrap">
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
            <div className="landing-avatar-ring" />
            <div className="landing-avatar-ring landing-avatar-ring--2" />
          </div>

          {/* Name */}
          <h1 className="landing-name">
            Merdekiyos <em>Tasew</em>
          </h1>

          <p className="landing-title">Full‑Stack &amp; App Developer</p>

          <div className="landing-divider" />

          {/* Stats */}
          <div className="landing-stats">
            <div className="landing-stat">
              <span className="landing-stat-num">1+</span>
              <span className="landing-stat-label">Years Exp.</span>
            </div>
            <div className="landing-stat-sep" />
            <div className="landing-stat">
              <span className="landing-stat-num">4+</span>
              <span className="landing-stat-label">Projects</span>
            </div>
            <div className="landing-stat-sep" />
            <div className="landing-stat">
              <span className="landing-stat-num">2+</span>
              <span className="landing-stat-label">Certificates</span>
            </div>
          </div>

          {/* Bio */}
          <p className="landing-bio">
            Building innovative solutions with modern technologies.
            Passionate about security, clean architecture, and creating
            real‑world impact through thoughtful software.
          </p>

          {/* Actions */}
          <div className="landing-actions">
            <button className="btn-gold" onClick={() => navigate("/portfolio")}>
              <span>View Portfolio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn-ghost" onClick={handleDownloadCV}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:16,height:16}}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              <span>Download CV</span>
            </button>
          </div>

          {/* Scroll hint */}
          <div className="landing-scroll">
            <div className="landing-scroll-line" />
            <span>Scroll</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Landing;

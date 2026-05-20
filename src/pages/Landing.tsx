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
      <div className="landing-bg-grid" />
      <div className="landing-particles" />
      
      <div className="landing-content">
        <div className="landing-card">
          {/* Status Badge */}
          <div className="status-badge">
            <span className="status-dot" />
            Available for Work
          </div>

          {/* Avatar */}
          <div className="avatar-container">
            {!imageError ? (
              <img 
                src="/merdi.jpg" 
                alt="Merdekiyos Tasew" 
                className="avatar"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="avatar-fallback">
                <span>MT</span>
              </div>
            )}
            <div className="avatar-ring" />
          </div>

          {/* Name & Title */}
          <h1 className="landing-name">
            Merdekiyos <span className="name-highlight">Tasew</span>
          </h1>
          
          <p className="landing-title">
            Full‑Stack Developer & App Developer
          </p>

          <p className="landing-location">
            📍 Addis Ababa, Ethiopia
          </p>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">3+</span>
              <span className="stat-label">Certifications</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>

          {/* Bio */}
          <p className="landing-bio">
            Building innovative solutions with modern technologies. 
            Passionate about cybersecurity and software development.
          </p>

          {/* Action Buttons */}
          <div className="landing-actions">
            <button 
              className="btn btn-primary"
              onClick={() => navigate("/portfolio")}
            >
              <span>View Portfolio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            
            <button 
              className="btn btn-outline"
              onClick={handleDownloadCV}
            >
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-hint">
            <span>Scroll to explore</span>
            <div className="scroll-mouse">
              <div className="scroll-wheel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
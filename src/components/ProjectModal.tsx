import React, { useEffect } from "react";
import "./ProjectModal.css";
import { sounds } from "../utils/soundEffects";

export interface ProjectDetail {
  id?: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  highlights?: string[];
  architecture?: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  images?: string[];
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    if (project) {
      sounds.playWhoosh();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="proj-modal-overlay" onClick={onClose}>
      <div className="proj-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button
          className="proj-modal-close"
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          aria-label="Close modal"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="18"
            height="18"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header Preview Screen / Simulated Video Browser Mockup */}
        <div className="proj-mockup-window">
          <div className="proj-mockup-bar">
            <div className="mockup-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="mockup-url-bar">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                width="12"
                height="12"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>{project.liveUrl || `https://${project.title.toLowerCase().replace(/\s+/g, "-")}.app`}</span>
            </div>
          </div>

          <div className="proj-mockup-viewport">
            <div className="mockup-scan-effect" />
            <div className="mockup-hero-display">
              <span className="mockup-category-badge">{project.category}</span>
              <h2 className="mockup-title">{project.title}</h2>
              <div className="mockup-live-indicator">
                <span className="mockup-radar-ping" />
                <span>Production Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="proj-modal-body">
          <div className="proj-modal-meta">
            {project.featured && (
              <span className="proj-featured-pill">⭐ Featured Engineering Project</span>
            )}
            <span className="proj-category-label">{project.category}</span>
          </div>

          <p className="proj-modal-desc">
            {project.longDescription || project.description}
          </p>

          {/* Architecture & Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="proj-section">
              <h4 className="proj-section-title">Key Engineering Highlights</h4>
              <ul className="proj-highlights-list">
                {project.highlights.map((item, idx) => (
                  <li key={idx}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--gold, #c4a369)"
                      strokeWidth="2"
                      width="14"
                      height="14"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Stack */}
          <div className="proj-section">
            <h4 className="proj-section-title">Technologies &amp; Architecture</h4>
            <div className="proj-tech-chips">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="proj-tech-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="proj-modal-actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-btn-primary"
                onClick={() => sounds.playClick()}
              >
                <span>Launch Live Application</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="16"
                  height="16"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn-outline"
              onClick={() => sounds.playClick()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>Source Repository</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

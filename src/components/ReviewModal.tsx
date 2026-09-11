import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { sounds } from "../utils/soundEffects";
import "./ReviewModal.css";

export interface ClientReviewSubmission {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  verifiedProject: string;
  platform: string;
  rating: number;
  content: string;
  date: string;
  location?: string;
  highlightTags: string[];
  isVerified: boolean;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ClientReviewSubmission) => void;
  availableProjects: string[];
}

const PRESET_AVATARS = [
  { label: "Male Executive", src: "/images/avatars/avatar_yohannes.jpg" },
  { label: "Female Founder", src: "/images/avatars/avatar_sara.jpg" },
  { label: "Consultant", src: "/images/avatars/avatar_dawit.jpg" },
  { label: "Tech Lead", src: "/images/avatars/avatar_michael.jpg" },
];

const AVAILABLE_TAGS = [
  "Full-Stack Architecture",
  "High Reliability",
  "Clean Code",
  "Fast Turnaround",
  "Bilingual UI",
  "Database Security",
  "Responsive Design",
  "Proactive Communication",
];

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
  availableProjects,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [project, setProject] = useState(availableProjects[0] || "Custom Project");
  const [platform, setPlatform] = useState("Direct Client Contract");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("Addis Ababa, Ethiopia");
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0].src);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Full-Stack Architecture",
    "Clean Code",
  ]);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = useCallback(() => {
    setIsSuccess(false);
    setError(null);
    onClose();
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    sounds.playHover();
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 4) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const getRatingLabel = (r: number) => {
    switch (r) {
      case 5:
        return "5.0 ★ Exceptional — Exceeded Expectations";
      case 4:
        return "4.0 ★ Very Good — Solid & Dependable Delivery";
      case 3:
        return "3.0 ★ Good — Met Core Deliverables";
      case 2:
        return "2.0 ★ Fair — Needed Revisions";
      default:
        return "1.0 ★ Needs Improvement";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide your full name.");
      sounds.playError();
      return;
    }
    if (!role.trim() || !organization.trim()) {
      setError("Please specify your professional role and company/organization.");
      sounds.playError();
      return;
    }
    if (content.trim().length < 20) {
      setError("Please write a detailed review (minimum 20 characters).");
      sounds.playError();
      return;
    }

    setError(null);

    const effectiveAvatar = customAvatarUrl.trim() || selectedAvatar;

    const newReview: ClientReviewSubmission = {
      id: "review_" + Date.now(),
      name: name.trim(),
      role: role.trim(),
      organization: organization.trim(),
      avatar: effectiveAvatar,
      verifiedProject: project,
      platform,
      rating,
      content: content.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      location: location.trim() || undefined,
      highlightTags: selectedTags,
      isVerified: true,
    };

    onSubmitReview(newReview);
    sounds.playSuccess();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b"],
      });
    } catch {
      // safe fallback
    }

    setIsSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 2200);
  };

  return (
    <div className="review-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="review-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="review-modal-close" onClick={handleClose} aria-label="Close modal">
          ✕
        </button>

        {isSuccess ? (
          <div className="review-modal-success">
            <div className="review-success-badge">✓</div>
            <h3 className="review-success-title">Review Published Successfully!</h3>
            <p className="review-success-desc">
              Thank you for providing your authentic endorsement, <strong>{name}</strong>. Your feedback has been verified and added to Merdekiyos's live portfolio.
            </p>
          </div>
        ) : (
          <>
            <div className="review-modal-header">
              <div className="review-modal-badge">
                <span className="badge-dot" />
                <span>Verified Client Endorsement</span>
              </div>
              <h2 className="review-modal-title">Leave a Client Review</h2>
              <p className="review-modal-subtitle">
                Share your real experience collaborating with Merdekiyos Tasew on software engineering and full-stack projects.
              </p>
            </div>

            {error && <div className="review-modal-error">{error}</div>}

            <form className="review-modal-form" onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div className="form-group">
                <label className="form-label">
                  Overall Rating <span className="req">*</span>
                </label>
                <div className="rating-selector" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`star-btn ${star <= (hoverRating || rating) ? "active" : ""}`}
                      onClick={() => {
                        setRating(star);
                        sounds.playClick();
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      aria-label={`${star} Stars`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-feedback">{getRatingLabel(hoverRating || rating)}</span>
                </div>
              </div>

              {/* Name and Role */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Dawit Tadesse"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Professional Role <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Operations Director"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Company / Organization <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Bethel Healthcare / FinTech Co"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Addis Ababa, Ethiopia"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Project and Platform */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Delivered Project <span className="req">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                  >
                    {availableProjects.map((p, idx) => (
                      <option key={idx} value={p}>
                        {p}
                      </option>
                    ))}
                    <option value="Custom Software & API Consultation">
                      Custom Software & API Consultation
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Engagement Platform</label>
                  <select
                    className="form-select"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="Direct Client Contract">Direct Client Contract</option>
                    <option value="LinkedIn Recommendation">LinkedIn Recommendation</option>
                    <option value="Upwork Verified">Upwork Verified</option>
                    <option value="Institutional Partner">Institutional Partner</option>
                  </select>
                </div>
              </div>

              {/* Avatar Picker */}
              <div className="form-group">
                <label className="form-label">Client Portrait / Avatar</label>
                <div className="avatar-picker">
                  {PRESET_AVATARS.map((av, idx) => (
                    <div
                      key={idx}
                      className={`avatar-option ${
                        selectedAvatar === av.src && !customAvatarUrl ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedAvatar(av.src);
                        setCustomAvatarUrl("");
                        sounds.playHover();
                      }}
                      title={av.label}
                    >
                      <img src={av.src} alt={av.label} />
                    </div>
                  ))}
                  <div className="custom-avatar-wrap">
                    <input
                      type="url"
                      className="form-input custom-avatar-input"
                      placeholder="Or paste image URL (e.g. LinkedIn photo)..."
                      value={customAvatarUrl}
                      onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="form-group">
                <div className="label-flex">
                  <label className="form-label">
                    Your Review / Testimonial <span className="req">*</span>
                  </label>
                  <span className="char-count">{content.length} / 500</span>
                </div>
                <textarea
                  className="form-textarea"
                  rows={4}
                  maxLength={500}
                  placeholder="Share details about the quality of engineering, technical communication, architecture reliability, and how the system benefited your organization..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              {/* Highlight Tags */}
              <div className="form-group">
                <label className="form-label">Core Competencies Demonstrated (Select up to 4)</label>
                <div className="tags-selector">
                  {AVAILABLE_TAGS.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      className={`tag-toggle ${selectedTags.includes(tag) ? "selected" : ""}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {selectedTags.includes(tag) ? "✓ " : "+ "}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="review-modal-actions">
                <button type="button" className="review-btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="review-btn-primary">
                  Publish Verified Review
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

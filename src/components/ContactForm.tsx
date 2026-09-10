import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./ContactForm.css";
import { sounds } from "../utils/soundEffects";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Discuss a Project",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const subjectOptions = [
    "Discuss a Project",
    "Full-time Software Engineer Opportunity",
    "Freelance Contract",
    "Technical Consultation",
    "Just Saying Hello",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getGmailUrl = () => {
    const subjectText = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject} - ${formData.name}`);
    const bodyText = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=merdekiyostasew@gmail.com&su=${subjectText}&body=${bodyText}`;
  };

  const getTelegramUrl = () => {
    const msgText = encodeURIComponent(`Hi Merdekiyos, I'm ${formData.name} (${formData.email}).\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`);
    return `https://t.me/Merdi27?text=${msgText}`;
  };

  const getMailtoUrl = () => {
    const subjectText = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject} - ${formData.name}`);
    const bodyText = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    return `mailto:merdekiyostasew@gmail.com?subject=${subjectText}&body=${bodyText}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.playClick();
    setLoading(true);

    // Save inquiry to localStorage for zero message loss
    try {
      const existing = JSON.parse(localStorage.getItem("merdi_inquiries") || "[]");
      const newInquiry = {
        ...formData,
        id: "msg_" + Date.now(),
        date: new Date().toISOString(),
      };
      localStorage.setItem("merdi_inquiries", JSON.stringify([newInquiry, ...existing]));
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      sounds.playSuccess();

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.65 },
          colors: ["#4f46e5", "#0284c7", "#10b981", "#f59e0b"],
        });
      } catch {
        // Ignore
      }

      // Try opening Gmail Web or default mailto
      try {
        const opened = window.open(getGmailUrl(), "_blank");
        if (!opened) {
          window.location.href = getMailtoUrl();
        }
      } catch {
        window.location.href = getMailtoUrl();
      }
    }, 500);
  };

  const handleCopyMessage = () => {
    sounds.playClick();
    const formatted = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage:\n${formData.message}`;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    sounds.playHover();
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      subject: "Discuss a Project",
      message: "",
    });
  };

  return (
    <div className="contact-form-card">
      <div className="contact-form-glow" />

      {submitted ? (
        <div className="contact-success-box">
          <div className="contact-success-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              width="36"
              height="36"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h3 className="contact-success-title">Message Ready to Dispatch!</h3>
          <p className="contact-success-text">
            Thank you, <strong>{formData.name}</strong>. Your message has been formatted. Choose how you would like to send it:
          </p>

          <div className="contact-dispatch-options">
            <a
              href={getGmailUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="dispatch-btn dispatch-gmail"
              onClick={() => sounds.playClick()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Send via Web Gmail</span>
            </a>

            <a
              href={getTelegramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="dispatch-btn dispatch-telegram"
              onClick={() => sounds.playClick()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              <span>Send via Telegram</span>
            </a>

            <button
              type="button"
              className="dispatch-btn dispatch-copy"
              onClick={handleCopyMessage}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>{copied ? "✓ Copied to Clipboard!" : "Copy Message Text"}</span>
            </button>
          </div>

          <div className="contact-success-actions">
            <button className="contact-reset-btn" onClick={handleReset}>
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form-inner">
          <div className="form-header">
            <span className="form-badge">Instant Dispatch</span>
            <h3 className="form-title">Send a Direct Message</h3>
            <p className="form-subtitle">
              Have a software engineering opportunity, freelance contract, or project inquiry? Reach out directly below.
            </p>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="form-name">Your Name</label>
              <input
                id="form-name"
                name="name"
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => sounds.playHover()}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="form-email">Email Address</label>
              <input
                id="form-email"
                name="email"
                type="email"
                required
                placeholder="e.g. alex@company.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => sounds.playHover()}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="form-subject">Subject</label>
            <select
              id="form-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => sounds.playHover()}
              className="form-select"
            >
              {subjectOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="form-message">Message</label>
            <textarea
              id="form-message"
              name="message"
              required
              rows={4}
              placeholder="Tell me about your project, timeline, or requirements..."
              value={formData.message}
              onChange={handleChange}
              onFocus={() => sounds.playHover()}
              className="form-textarea"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="form-submit-btn"
            onMouseEnter={() => sounds.playHover()}
          >
            {loading ? (
              <span>Preparing Dispatch...</span>
            ) : (
              <>
                <span>Send Message</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="16"
                  height="16"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;

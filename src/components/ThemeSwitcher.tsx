import React, { useEffect, useRef, useState } from "react";
import "./ThemeSwitcher.css";
import { sounds } from "../utils/soundEffects";

export type ThemeMode = "light" | "dark";

export interface ThemeOption {
  id: string;
  name: string;
  color: string;
  darkColor?: string;
  bright: string;
  glow: string;
  rgb: string;
  darkRgb?: string;
}

export const themes: ThemeOption[] = [
  {
    id: "indigo",
    name: "Electric Indigo",
    color: "#4f46e5",
    darkColor: "#6366f1",
    bright: "#818cf8",
    glow: "rgba(79, 70, 229, 0.25)",
    rgb: "79, 70, 229",
    darkRgb: "99, 102, 241",
  },
  {
    id: "azure",
    name: "Ocean Azure",
    color: "#0284c7",
    darkColor: "#38bdf8",
    bright: "#7dd3fc",
    glow: "rgba(2, 132, 199, 0.25)",
    rgb: "2, 132, 199",
    darkRgb: "56, 189, 248",
  },
  {
    id: "violet",
    name: "Royal Violet",
    color: "#7c3aed",
    darkColor: "#a855f7",
    bright: "#c084fc",
    glow: "rgba(124, 58, 237, 0.25)",
    rgb: "124, 58, 237",
    darkRgb: "168, 85, 247",
  },
  {
    id: "emerald",
    name: "Clean Emerald",
    color: "#059669",
    darkColor: "#10b981",
    bright: "#34d399",
    glow: "rgba(5, 150, 105, 0.25)",
    rgb: "5, 150, 105",
    darkRgb: "16, 185, 129",
  },
  {
    id: "gold",
    name: "Imperial Gold",
    color: "#d97706",
    darkColor: "#f59e0b",
    bright: "#fbbf24",
    glow: "rgba(245, 158, 11, 0.28)",
    rgb: "217, 119, 6",
    darkRgb: "245, 158, 11",
  },
];

interface ThemeSwitcherProps {
  currentTheme?: string;
  onThemeChange?: (themeId: string) => void;
  onModeChange?: (mode: ThemeMode) => void;
}

export const applyTheme = (themeId: string, mode?: ThemeMode) => {
  const currentMode: ThemeMode =
    mode ||
    (localStorage.getItem("merdi_mode") as ThemeMode) ||
    "light";

  const theme = themes.find((t) => t.id === themeId) || themes[0];
  const root = document.documentElement;

  // Set mode attribute on HTML root
  root.setAttribute("data-theme", currentMode);
  if (currentMode === "dark") {
    root.classList.add("dark-theme");
  } else {
    root.classList.remove("dark-theme");
  }

  // Choose accent color matching active mode
  const activeColor =
    currentMode === "dark" && theme.darkColor ? theme.darkColor : theme.color;
  const activeRgb =
    currentMode === "dark" && theme.darkRgb ? theme.darkRgb : theme.rgb;
  const activeGlow =
    currentMode === "dark"
      ? `rgba(${activeRgb}, 0.32)`
      : theme.glow;

  root.style.setProperty("--gold", activeColor);
  root.style.setProperty("--gold-bright", theme.bright);
  root.style.setProperty("--border-accent", `rgba(${activeRgb}, 0.35)`);
  root.style.setProperty("--text-accent", activeColor);
  root.style.setProperty("--accent-glow", activeGlow);
  root.style.setProperty("--accent-rgb", activeRgb);

  localStorage.setItem("merdi_theme", theme.id);
  localStorage.setItem("merdi_mode", currentMode);

  window.dispatchEvent(
    new CustomEvent("portfolio-theme-change", {
      detail: { themeId: theme.id, mode: currentMode, color: activeColor },
    })
  );
};

export const toggleThemeMode = (): ThemeMode => {
  const currentMode =
    (localStorage.getItem("merdi_mode") as ThemeMode) || "light";
  const newMode: ThemeMode = currentMode === "dark" ? "light" : "dark";
  const currentTheme = localStorage.getItem("merdi_theme") || "indigo";
  applyTheme(currentTheme, newMode);
  return newMode;
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
  onModeChange,
}) => {
  const [activeTheme, setActiveTheme] = useState<string>("indigo");
  const [activeMode, setActiveMode] = useState<ThemeMode>("light");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("merdi_theme") || "indigo";
    const savedMode = (localStorage.getItem("merdi_mode") as ThemeMode) || "light";
    const validTheme = themes.some((t) => t.id === savedTheme) ? savedTheme : "indigo";
    const validMode: ThemeMode = savedMode === "dark" ? "dark" : "light";

    setActiveTheme(validTheme);
    setActiveMode(validMode);
    applyTheme(validTheme, validMode);
  }, []);

  useEffect(() => {
    if (currentTheme && currentTheme !== activeTheme) {
      setActiveTheme(currentTheme);
      applyTheme(currentTheme, activeMode);
    }
  }, [currentTheme]);

  // Listen to external theme/mode changes
  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ themeId: string; mode: ThemeMode }>;
      if (customEvent.detail) {
        if (customEvent.detail.themeId) setActiveTheme(customEvent.detail.themeId);
        if (customEvent.detail.mode) setActiveMode(customEvent.detail.mode);
      }
    };
    window.addEventListener("portfolio-theme-change", handleSync);
    return () => window.removeEventListener("portfolio-theme-change", handleSync);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectColor = (id: string) => {
    sounds.playClick();
    setActiveTheme(id);
    applyTheme(id, activeMode);
    if (onThemeChange) onThemeChange(id);
  };

  const handleSelectMode = (newMode: ThemeMode) => {
    sounds.playClick();
    setActiveMode(newMode);
    applyTheme(activeTheme, newMode);
    if (onModeChange) onModeChange(newMode);
  };

  const currentThemeObj = themes.find((t) => t.id === activeTheme) || themes[0];
  const activeDisplayColor =
    activeMode === "dark" && currentThemeObj.darkColor
      ? currentThemeObj.darkColor
      : currentThemeObj.color;

  return (
    <div className="theme-switcher-wrapper" ref={wrapperRef}>
      <button
        className="theme-switcher-btn"
        onClick={() => {
          sounds.playClick();
          setIsOpen(!isOpen);
        }}
        title="Theme & Mode Customizer"
        aria-label="Theme & Mode Customizer"
        aria-expanded={isOpen}
      >
        <span
          className="theme-dot-preview"
          style={{ backgroundColor: activeDisplayColor }}
        />
        <span className="theme-mode-indicator">
          {activeMode === "dark" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
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
          )}
        </span>
        <span className="theme-btn-label">Theme</span>
      </button>

      {isOpen && (
        <div className="theme-dropdown" role="dialog" aria-label="Theme Customizer Dropdown">
          {/* Appearance Mode Section */}
          <div className="theme-section">
            <div className="theme-dropdown-header">Appearance</div>
            <div className="theme-mode-toggle-bar">
              <button
                type="button"
                className={`theme-mode-btn ${activeMode === "light" ? "active" : ""}`}
                onClick={() => handleSelectMode("light")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
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
                <span>Light</span>
              </button>

              <button
                type="button"
                className={`theme-mode-btn ${activeMode === "dark" ? "active" : ""}`}
                onClick={() => handleSelectMode("dark")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Accent Color Palette Section */}
          <div className="theme-section">
            <div className="theme-dropdown-header">Accent Colors</div>
            <div className="theme-palette-grid">
              {themes.map((t) => {
                const swatchColor =
                  activeMode === "dark" && t.darkColor ? t.darkColor : t.color;
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`theme-option ${activeTheme === t.id ? "active" : ""}`}
                    onClick={() => handleSelectColor(t.id)}
                    style={{ "--theme-color": swatchColor } as React.CSSProperties}
                  >
                    <span
                      className="theme-option-dot"
                      style={{ backgroundColor: swatchColor }}
                    />
                    <span className="theme-option-name">{t.name}</span>
                    {activeTheme === t.id && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        width="12"
                        height="12"
                        className="theme-check-icon"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;

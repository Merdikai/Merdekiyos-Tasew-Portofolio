import React, { useEffect, useRef, useState } from "react";
import "./ThemeSwitcher.css";
import { sounds } from "../utils/soundEffects";
import {
  themes,
  applyTheme,
  getSavedTheme,
  getSavedMode,
  type ThemeMode,
  type ThemeOption,
} from "../utils/theme";

export type { ThemeMode, ThemeOption };

interface ThemeSwitcherProps {
  currentTheme?: string;
  onThemeChange?: (themeId: string) => void;
  onModeChange?: (mode: ThemeMode) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
  onModeChange,
}) => {
  const [activeTheme, setActiveTheme] = useState<string>(() => currentTheme || getSavedTheme());
  const [activeMode, setActiveMode] = useState<ThemeMode>(getSavedMode);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyTheme(activeTheme, activeMode);
  }, [activeTheme, activeMode]);

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

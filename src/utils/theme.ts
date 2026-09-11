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

export const getSavedTheme = (): string => {
  const saved = localStorage.getItem("merdi_theme") || "indigo";
  return themes.some((t) => t.id === saved) ? saved : "indigo";
};

export const getSavedMode = (): ThemeMode => {
  const saved = localStorage.getItem("merdi_mode");
  return saved === "dark" ? "dark" : "light";
};

export const applyTheme = (themeId: string, mode?: ThemeMode): void => {
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

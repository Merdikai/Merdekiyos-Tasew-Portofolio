import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import "./TerminalDrawer.css";
import { sounds } from "../utils/soundEffects";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme?: (themeName: string) => void;
}

interface CommandLog {
  id: string;
  type: "input" | "output" | "error" | "system";
  text: string | React.ReactNode;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTheme,
}) => {
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "init-1",
      type: "system",
      text: "⚡ MERDI-OS v3.4.0 [Interactive Portfolio Shell] Initialized.",
    },
    {
      id: "init-2",
      type: "system",
      text: 'Type "help" to view all available commands or "sudo hire" for a surprise.',
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      sounds.playWhoosh();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    sounds.playClick();

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    // Record user command
    const newLogs: CommandLog[] = [
      ...logs,
      { id: String(Date.now()), type: "input", text: trimmed },
    ];

    const args = trimmed.split(" ");
    const command = args[0].toLowerCase();

    switch (command) {
      case "help":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: (
            <div className="term-help-grid">
              <div><strong>whoami</strong> - Short professional bio</div>
              <div><strong>skills</strong> - Technical proficiency breakdown</div>
              <div><strong>projects</strong> - Selected engineering projects</div>
              <div><strong>experience</strong> - Career timeline & companies</div>
              <div><strong>contact</strong> - Reach out via Email or Telegram</div>
              <div><strong>inquiries</strong> - View stored contact form messages</div>
              <div><strong>theme &lt;name&gt;</strong> - Switch palette (indigo, azure, violet, emerald)</div>
              <div><strong>sudo hire</strong> - Authorize immediate contract!</div>
              <div><strong>matrix</strong> - Run cyber digital cascade</div>
              <div><strong>clear</strong> - Clear console output</div>
              <div><strong>exit</strong> - Close interactive terminal</div>
            </div>
          ),
        });
        break;

      case "whoami":
      case "bio":
      case "about":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: (
            <div>
              <p>👤 <strong>Merdekiyos Tasew</strong> — Full-Stack &amp; App Developer</p>
              <p>📍 Addis Ababa, Ethiopia | Remote Ready</p>
              <p>🎯 Passionate about secure systems, clean architecture, and building production-grade SaaS and mobile platforms.</p>
            </div>
          ),
        });
        break;

      case "skills":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: (
            <div className="term-skills-output">
              <p><strong>[FRONTEND]</strong> React, TypeScript, Vite, Tailwind CSS, HTML5, CSS3</p>
              <p><strong>[BACKEND]</strong> Node.js, C#, .NET Core, Supabase, PHP, Java, MySQL, REST APIs</p>
              <p><strong>[MOBILE]</strong> React Native, Flutter (learning), Android Basics</p>
              <p><strong>[DEVOPS]</strong> Git, GitHub Actions, Vercel, Supabase, AWS (learning)</p>
            </div>
          ),
        });
        break;

      case "projects":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: (
            <div className="term-projects-output">
              <p>1. <strong>Clinic Management System</strong> [C#, .NET Core, Clean Architecture] - Enterprise healthcare administration</p>
              <p>2. <strong>Church Management System</strong> [React, TS, Supabase] - Bilingual administration portal</p>
              <p>3. <strong>Nail Booking App</strong> [React, TS, Supabase] - Multi-tenant SaaS booking platform</p>
              <p>4. <strong>HIDS — Hospital Information Dissemination System</strong> [PHP, MySQL, Security] - Healthcare alert & dispatch portal</p>
              <p>5. <strong>Training Management System (TMS)</strong> [C#, ASP.NET Core, Angular] - Institutional curriculum & certifications</p>
            </div>
          ),
        });
        break;

      case "experience":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: (
            <div>
              <p>💼 <strong>Ezer Nail Salon</strong> (2025—2026) · Full Stack &amp; SaaS Developer</p>
              <p>💼 <strong>Bethel Anfo EECMY Church</strong> (2026) · Full Stack Developer</p>
              <p>💼 <strong>PEDS PLC</strong> (06/2025—01/2026) · Software Engineering Intern</p>
            </div>
          ),
        });
        break;

      case "contact":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: (
            <div>
              <p>📧 Email: <a href="mailto:merdekiyostasew@gmail.com" className="term-link">merdekiyostasew@gmail.com</a></p>
              <p>📱 Telegram: <a href="https://t.me/Merdi27" target="_blank" rel="noopener noreferrer" className="term-link">@Merdi27</a></p>
              <p>📞 Phone: +251 953 913 418</p>
              <p>🐙 GitHub: <a href="https://github.com/Merdikai" target="_blank" rel="noopener noreferrer" className="term-link">github.com/Merdikai</a></p>
            </div>
          ),
        });
        break;

      case "theme": {
        const themeName = args[1]?.toLowerCase();
        const validThemes = ["indigo", "azure", "violet", "emerald", "gold", "cyan", "amethyst"];
        if (validThemes.includes(themeName)) {
          if (onSelectTheme) onSelectTheme(themeName);
          newLogs.push({
            id: String(Date.now() + 1),
            type: "output",
            text: `🎨 Theme switched to [${themeName.toUpperCase()}]. Interface updated.`,
          });
        } else {
          newLogs.push({
            id: String(Date.now() + 1),
            type: "error",
            text: "Usage: theme <indigo | azure | violet | emerald>",
          });
        }
        break;
      }

      case "sudo":
        if (args[1]?.toLowerCase() === "hire") {
          sounds.playSuccess();
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#c4a369", "#00f0ff", "#ffffff", "#e8c98a"],
            });
          } catch {
            // Ignore if confetti fails
          }
          newLogs.push({
            id: String(Date.now() + 1),
            type: "output",
            text: (
              <div className="term-hire-celebration">
                <p>🎉 <strong>ACCESS GRANTED: WELCOME ABOARD!</strong></p>
                <p>Merdekiyos is available for hire immediately. Let's build something phenomenal.</p>
                <p>👉 <a href="mailto:merdekiyostasew@gmail.com?subject=Job%20Offer%20for%20Merdekiyos" className="term-cta-btn">Send Formal Offer Email</a></p>
              </div>
            ),
          });
        } else {
          newLogs.push({
            id: String(Date.now() + 1),
            type: "error",
            text: 'sudo: command not found. Did you mean "sudo hire"?',
          });
        }
        break;

      case "inquiries":
      case "messages": {
        try {
          const stored = JSON.parse(localStorage.getItem("merdi_inquiries") || "[]");
          if (stored.length === 0) {
            newLogs.push({
              id: String(Date.now() + 1),
              type: "output",
              text: "📭 No direct message inquiries currently stored.",
            });
          } else {
            newLogs.push({
              id: String(Date.now() + 1),
              type: "output",
              text: (
                <div className="term-inquiries-list">
                  <p>📬 <strong>{stored.length} Stored Direct Inquiry(ies):</strong></p>
                  {stored.map((inq: { name: string; email: string; subject: string; message: string; date?: string }, i: number) => (
                    <div key={i} style={{ margin: "8px 0", paddingLeft: "12px", borderLeft: "2px solid #4f46e5" }}>
                      <p><strong>{inq.name}</strong> ({inq.email}) — <em>{inq.subject}</em></p>
                      <p style={{ color: "#64748b", fontSize: "0.85em" }}>"{inq.message}"</p>
                    </div>
                  ))}
                </div>
              ),
            });
          }
        } catch {
          newLogs.push({
            id: String(Date.now() + 1),
            type: "error",
            text: "Failed to read stored inquiries.",
          });
        }
        break;
      }

      case "matrix":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: (
            <div className="term-matrix-rain">
              01001101 01100101 01110010 01100100 01101001 01101011 01100001 01101001<br />
              SYSTEM_SECURE: PASS | THREAT_LEVEL: ZERO | UPTIME: 99.99%<br />
              WAKE UP, RECRUITER... THE MATRIX HAS YOU. FOLLOW THE CLEAN CODE.
            </div>
          ),
        });
        break;

      case "clear":
      case "cls":
        setLogs([]);
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        newLogs.push({
          id: String(Date.now() + 1),
          type: "error",
          text: `zsh: command not found: "${trimmed}". Type "help" for a list of commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sounds.playTerminalTick();

    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx + 1 < history.length ? historyIdx + 1 : historyIdx;
      setHistoryIdx(nextIdx);
      setInputVal(history[history.length - 1 - nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      } else {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="term-modal-backdrop" onClick={onClose}>
      <div
        className={`term-window ${isMaximized ? "term-maximized" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="term-titlebar">
          <div className="term-window-controls">
            <button className="term-ctrl term-close" onClick={onClose} title="Close" />
            <button
              className="term-ctrl term-min"
              onClick={() => setIsMaximized(false)}
              title="Minimize"
            />
            <button
              className="term-ctrl term-max"
              onClick={() => setIsMaximized(!isMaximized)}
              title="Maximize"
            />
          </div>

          <div className="term-title">
            <span className="term-title-icon">💻</span>
            <span>merdi@portfolio: ~ (zsh)</span>
          </div>

          <div className="term-actions">
            <button
              className="term-action-btn"
              onClick={() => setLogs([])}
              title="Clear terminal"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="term-body" onClick={() => inputRef.current?.focus()}>
          {logs.map((log) => (
            <div key={log.id} className={`term-line term-line-${log.type}`}>
              {log.type === "input" && (
                <span className="term-prompt">
                  <span className="term-user">merdi@portfolio</span>:
                  <span className="term-path">~</span>${" "}
                </span>
              )}
              <span className="term-line-text">{log.text}</span>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="term-line term-active-line">
            <span className="term-prompt">
              <span className="term-user">merdi@portfolio</span>:
              <span className="term-path">~</span>${" "}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="term-input"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalDrawer;

import { useState, useRef, useEffect, useCallback } from "react";

// Inject cursor blink keyframe once
if (typeof document !== "undefined" && !document.getElementById("term-cursor-style")) {
  const style = document.createElement("style");
  style.id = "term-cursor-style";
  style.textContent = `@keyframes termCursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }`;
  document.head.appendChild(style);
}
import { motion, AnimatePresence } from "motion/react";
import divikPhoto from "figma:asset/379ca8bfc8468eebc5bbd62cb2addac376adeb26.png";

// ─── Types ───────────────────────────────────────────────────────────────────
type LineType = "output" | "command" | "error" | "success" | "blank";
interface TerminalLine {
  id: number;
  type: LineType;
  text: string;
}

// ─── Boot sequence lines ──────────────────────────────────────────────────────
const BOOT_LINES_RAW = [
  { type: "success" as LineType, text: "Mounting /dev/divik..." },
  { type: "output" as LineType, text: "Reading filesystem..." },
  { type: "success" as LineType, text: "[  OK  ] Found: divik@portfolio" },
  { type: "output" as LineType, text: "Loading profile data..." },
  { type: "success" as LineType, text: "[  OK  ] All systems operational." },
  { type: "blank" as LineType,  text: "" },
];
const makeBootLines  = () => BOOT_LINES_RAW.map(l => mkLine(l.type, l.text));

// ─── Tag data ─────────────────────────────────────────────────────────────────
const TAGS = [
  { label: "Student",              color: "#63d2ff" },
  { label: "Full-Stack Developer", color: "#a78bfa" },
  { label: "Performative",         color: "#f472b6" },
  { label: "Occasional Vibe-Coder",color: "#c9f55a" },
  { label: "Physics Geek",         color: "#fb923c" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
let uid = 0;
function mkLine(type: LineType, text: string): TerminalLine {
  return { id: uid++, type, text };
}

const MOTD: TerminalLine[] = [
  mkLine("output",  "Last login: Fri Mar  6 2026"),
  mkLine("blank",   ""),
  mkLine("output",  "Welcome to Divik's Portfolio Terminal v2.6.0"),
  mkLine("output",  'Type "help" for available commands.'),
  mkLine("blank",   ""),
];

const HELP_LINES_RAW = [
  { type: "output" as LineType, text: "Available commands:" },
  { type: "output" as LineType, text: "  cd divik      — open about me" },
  { type: "output" as LineType, text: "  cd b2b        — open broke2broker project" },
  { type: "output" as LineType, text: "  cd waqt       — open waqt project" },
  { type: "output" as LineType, text: "  cd cc         — open causality challenge project" },
  { type: "output" as LineType, text: "  ls            — list contents" },
  { type: "output" as LineType, text: "  whoami        — current user" },
  { type: "output" as LineType, text: "  clear         — clear terminal" },
  { type: "output" as LineType, text: "  help          — show this message" },
  { type: "blank" as LineType,  text: "" },
];
const makeHelpLines  = () => HELP_LINES_RAW.map(l => mkLine(l.type, l.text));

// ─── Component ────────────────────────────────────────────────────────────────
interface TerminalContentProps {
  onOpenProfile?: () => void;
  onOpenProject?: (projectId: string) => void;
}

export function TerminalContent({ onOpenProfile, onOpenProject }: TerminalContentProps) {
  const [lines, setLines] = useState<TerminalLine[]>(MOTD);
  const [input, setInput] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booting, setBooting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, showProfile]);

  // Focus input on click
  const focusInput = () => inputRef.current?.focus();

  // Append lines with optional delay per line
  const appendLines = useCallback((newLines: TerminalLine[], delayMs = 0) => {
    if (delayMs === 0) {
      setLines(prev => [...prev, ...newLines]);
    } else {
      newLines.forEach((l, i) => {
        setTimeout(() => setLines(prev => [...prev, l]), i * delayMs);
      });
    }
  }, []);

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo = mkLine("command", `divik@portfolio ~ % ${raw}`);

    if (!cmd) {
      setLines(prev => [...prev, echo]);
      return;
    }

    setHistory(prev => [raw, ...prev]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setLines([]);
      setShowProfile(false);
      return;
    }

    setLines(prev => [...prev, echo]);

    if (cmd === "cd divik") {
      // Boot sequence
      setBooting(true);
      appendLines(makeBootLines(), 200);
      setTimeout(() => {
        setBooting(false);
        setShowProfile(true);
        onOpenProfile?.();
      }, BOOT_LINES_RAW.length * 200 + 300);
      return;
    }

    if (cmd === "help") { appendLines(makeHelpLines()); return; }
    if (cmd === "ls") {
      appendLines([
        mkLine("output", "broke2broker/   waqt/   causality-challenge/   about.txt"),
        mkLine("blank",  ""),
      ]);
      return;
    }
    if (cmd === "whoami") {
      appendLines([mkLine("output", "divik"), mkLine("blank", "")]);
      return;
    }
    if (cmd === "cd ..") {
      setShowProfile(false);
      appendLines([mkLine("output", ""), mkLine("output", "Returned to ~/"), mkLine("blank", "")]);
      return;
    }

    if (cmd === "cd b2b") {
      appendLines([
        mkLine("success", "Opening broke2broker project..."),
        mkLine("blank", ""),
      ]);
      onOpenProject?.("broke2broker");
      return;
    }
    if (cmd === "cd waqt") {
      appendLines([
        mkLine("success", "Opening waqt project..."),
        mkLine("blank", ""),
      ]);
      onOpenProject?.("waqt");
      return;
    }
    if (cmd === "cd cc") {
      appendLines([
        mkLine("success", "Opening causality challenge project..."),
        mkLine("blank", ""),
      ]);
      onOpenProject?.("causalitychallenge");
      return;
    }

    appendLines([
      mkLine("error", `zsh: command not found: ${raw}`),
      mkLine("blank", ""),
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ minHeight: 480, fontFamily: "'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace" }}
      onClick={focusInput}
    >
      {/* ── Fake title bar ───────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
        style={{
          background: "rgba(30,30,30,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <span
          className="mx-auto text-xs"
          style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.03em" }}
        >
          divik@portfolio — bash — 80×24
        </span>
      </div>

      {/* ── Scroll area ──────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-5 py-4 space-y-0.5"
        style={{ background: "rgba(20,20,20,0.95)" }}
      >
        {/* History lines */}
        {lines.map(line => (
          <div key={line.id} style={{ minHeight: "1.4em" }}>
            {line.type === "blank" ? (
              <br />
            ) : (
              <span
                className="text-sm"
                style={{
                  color:
                    line.type === "command" ? "rgba(255,255,255,0.85)" :
                    line.type === "error"   ? "#ff6b6b" :
                    line.type === "success" ? "#28c840" :
                                             "rgba(255,255,255,0.55)",
                  letterSpacing: "0.01em",
                }}
              >
                {line.text}
              </span>
            )}
          </div>
        ))}

        {/* ── About-me card ─────────────────────────────────────────── */}
        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="my-4 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Photo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.18, duration: 0.5 }}
                  className="flex-shrink-0"
                  style={{ width: 200, minHeight: 240 }}
                >
                  <img
                    src={divikPhoto}
                    alt="Divik Srivastava"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      minHeight: 240,
                    }}
                  />
                </motion.div>

                {/* Info */}
                <div className="flex-1 p-6 flex flex-col justify-center gap-4">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.28, duration: 0.4 }}
                  >
                    <div
                      className="text-xs mb-1"
                      style={{ color: "#28c840", letterSpacing: "0.12em" }}
                    >
                      ── user profile ──
                    </div>
                    <h2
                      className="text-2xl"
                      style={{ color: "rgba(255,255,255,0.92)", fontWeight: 300, letterSpacing: "-0.02em" }}
                    >
                      Divik Srivastava
                    </h2>
                  </motion.div>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.42, duration: 0.5 }}
                    className="flex flex-wrap gap-2"
                  >
                    {TAGS.map((tag, i) => (
                      <motion.span
                        key={tag.label}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.48 + i * 0.08, duration: 0.3 }}
                        className="text-xs px-3 py-1.5 rounded-lg"
                        style={{
                          background: `${tag.color}18`,
                          border: `1px solid ${tag.color}40`,
                          color: tag.color,
                          fontFamily: "inherit",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {tag.label}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Hint to exit */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.2)", fontFamily: "inherit" }}
                  >
                    type <span style={{ color: "rgba(255,255,255,0.4)" }}>cd ..</span> to exit
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Input row ────────────────────────────────────────────────── */}
        {!booting && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm flex-shrink-0" style={{ color: "#28c840" }}>
              divik@portfolio ~ %
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{
                color: "rgba(255,255,255,0.85)",
                caretColor: "#28c840",
                fontFamily: "inherit",
                letterSpacing: "0.01em",
              }}
            />
            {/* Blinking cursor block */}
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 16,
                background: "#28c840",
                borderRadius: 1,
                flexShrink: 0,
                animation: "termCursorBlink 1s step-start infinite",
              }}
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
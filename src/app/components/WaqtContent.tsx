import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import waqtLogo from "figma:asset/6620e57ee81a3e392c9a46543d39a8b6bd6ed303.png";
import waqtMockup from "figma:asset/f61776162bee040f01395e63998079a061059dd3.png";
import { useState } from "react";

function GlassCard({
  children,
  delay = 0,
  accentColor = "rgba(180,230,60,0.8)",
  style = {},
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  accentColor?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={className}
      style={{
        background: hovered ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.065)",
        backdropFilter: "blur(24px) saturate(1.6)",
        WebkitBackdropFilter: "blur(24px) saturate(1.6)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 20,
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.22)`
          : `0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.14)`,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -40, right: -40,
          width: 120, height: 120,
          borderRadius: "50%",
          background: accentColor,
          opacity: hovered ? 0.14 : 0.07,
          filter: "blur(32px)",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        }}
      />
      {children}
    </motion.div>
  );
}

export function WaqtContent() {
  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: "linear-gradient(145deg, rgba(8,16,28,1) 0%, rgba(10,22,20,1) 50%, rgba(8,14,24,1) 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 70% 50% at 20% 15%, rgba(120,210,80,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 80%, rgba(180,230,60,0.05) 0%, transparent 60%)
          `,
        }}
      />

      <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-4 relative">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(40px) saturate(1.8)",
            WebkitBackdropFilter: "blur(40px) saturate(1.8)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 24,
            padding: "20px 24px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.18)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 100% at 10% 50%, rgba(150,220,60,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 relative">
            <div
              style={{
                width: 64, height: 64, borderRadius: 16, overflow: "hidden", flexShrink: 0,
                border: "1.5px solid rgba(180,230,60,0.5)",
                boxShadow: "0 0 24px rgba(180,230,60,0.22)",
              }}
            >
              <img src={waqtLogo} alt="waqt" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 style={{ fontWeight: 700, fontSize: "clamp(22px,3vw,30px)", color: "rgba(180,230,60,1)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                waqt
              </h1>
              <p className="mt-1 text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
                AI-powered mobile calendar · React Native + GPT-4o
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 flex-wrap">
                <a
                  href="https://waqtdevtest.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                  style={{
                    background: "rgba(180,230,60,0.15)",
                    border: "1px solid rgba(180,230,60,0.4)",
                    color: "rgba(200,245,80,1)",
                    fontWeight: 600,
                  }}
                >
                  <ExternalLink size={10} />
                  Live Demo ↗
                </a>
                <span
                  className="text-xs px-2.5 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                  }}
                >
                  🔵 In Dev
                </span>
              </div>
            </div>

            {/* Mockup thumbnail */}
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  padding: 6,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={waqtMockup}
                  alt="Waqt mockup"
                  style={{ width: 72, height: "auto", borderRadius: 8, display: "block" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

          {/* The Problem */}
          <GlassCard delay={0.15} accentColor="rgba(239,68,68,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤔</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>The Problem</h3>
              </div>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 1.6 }}>
                Creating calendar events is tedious — tap through date pickers, dropdowns, selectors... I just wanted to SAY what I need to do.
              </p>
            </div>
          </GlassCard>

          {/* The Solution */}
          <GlassCard delay={0.2} accentColor="rgba(180,230,60,0.8)" className="sm:col-span-2">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(180,230,60,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✨</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>The Solution</h3>
              </div>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 1.6 }}>
                Type in plain English:{" "}
                <span style={{ fontWeight: 600, color: "rgba(200,245,80,0.9)", fontStyle: "italic" }}>
                  "practice Tuesday 3pm and calc test Friday morning"
                </span>
                {" "}— GPT-4o parses it, creates structured events with categories and priorities, streaming in real-time.
              </p>
            </div>
          </GlassCard>

          {/* How It Works */}
          <GlassCard delay={0.25} accentColor="rgba(99,210,255,0.8)" className="sm:col-span-2">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(99,210,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚙️</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>How It Works</h3>
              </div>
              <div className="space-y-1.5">
                {[
                  ["Frontend", "React Native + Expo (iOS-style UI)"],
                  ["Backend", "Express.js + PostgreSQL + Drizzle ORM"],
                  ["AI", "OpenAI GPT-4o with structured outputs"],
                  ["Streaming", "Server-Sent Events for real-time parsing"],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-start gap-2">
                    <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(99,210,255,0.8)", minWidth: 60 }}>{label}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Features */}
          <GlassCard delay={0.3} accentColor="rgba(196,181,253,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(196,181,253,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎯</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Features</h3>
              </div>
              <div className="space-y-1.5">
                {["📅 Apple Calendar UI", "✅ iOS Reminders tasks", "🔒 Device-based privacy", "⚡ Real-time streaming", "🎨 Auto-categorization"].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(196,181,253,0.7)", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Tech highlights */}
          <GlassCard delay={0.35} accentColor="rgba(251,146,60,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(251,146,60,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🔧</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Tech Details</h3>
              </div>
              <div className="space-y-1.5">
                {[
                  "Overlap algorithm for concurrent events",
                  "SSE streaming for AI responses",
                  "No auth required — device isolation",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(251,146,60,0.7)", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Status */}
          <GlassCard delay={0.4} accentColor="rgba(99,210,255,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(99,210,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🚀</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Status</h3>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(99,210,255,1)", boxShadow: "0 0 8px rgba(99,210,255,0.8)" }} />
                <span style={{ fontWeight: 600, color: "rgba(99,210,255,1)", fontSize: 13 }}>In Development</span>
              </div>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.4)", fontSize: 11, lineHeight: 1.5 }}>
                Core features working · Polishing UI and edge cases
              </p>
            </div>
          </GlassCard>

          {/* My Role */}
          <GlassCard delay={0.45} accentColor="rgba(180,230,60,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(180,230,60,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>My Role</h3>
              </div>
              <p style={{ fontWeight: 600, color: "rgba(200,245,80,1)", fontSize: 13 }}>Solo Developer</p>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4, lineHeight: 1.6 }}>
                Frontend · Backend · Database · AI integration
              </p>
            </div>
          </GlassCard>

        </div>

        {/* ── Quote footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 20,
            padding: "18px 22px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          <div className="flex items-start gap-3">
            <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>💭</span>
            <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7, fontStyle: "italic" }}>
              I got tired of tapping through date pickers every time I needed to add something to my calendar.
              This felt like a more natural way to schedule things — just describe your week and let AI handle the details.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

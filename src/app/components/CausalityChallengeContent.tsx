import { motion } from "motion/react";
import { Globe, ArrowUpRight } from "lucide-react";
import { useState } from "react";

function GlassCard({
  children,
  delay = 0,
  accentColor = "rgba(139,92,246,0.8)",
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

export function CausalityChallengeContent() {
  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: "linear-gradient(145deg, rgba(10,8,28,1) 0%, rgba(14,10,30,1) 50%, rgba(10,8,22,1) 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 70% 50% at 20% 15%, rgba(139,92,246,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 80%, rgba(99,102,241,0.06) 0%, transparent 60%)
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
            boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 100% at 10% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 relative">
            {/* Icon */}
            <div
              style={{
                width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                background: "rgba(139,92,246,0.12)",
                border: "1.5px solid rgba(139,92,246,0.45)",
                boxShadow: "0 0 28px rgba(139,92,246,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32,
              }}
            >
              ⚛️
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 style={{ fontWeight: 700, fontSize: "clamp(22px,3vw,30px)", color: "rgba(167,139,250,1)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                causality challenge
              </h1>
              <p className="mt-1 text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
                Faster-than-light physics simulator · Tachyons + Special Relativity
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 flex-wrap">
                <a
                  href="https://causality-challenge-v1.replit.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                  style={{
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.4)",
                    color: "rgba(196,181,253,1)",
                    fontWeight: 600,
                  }}
                >
                  <Globe size={10} />
                  Try Live Demo ↗
                </a>
                <span
                  className="text-xs px-2.5 py-1.5 rounded-full"
                  style={{
                    background: "rgba(74,222,128,0.08)",
                    border: "1px solid rgba(74,222,128,0.2)",
                    color: "rgba(74,222,128,0.85)",
                    fontWeight: 500,
                  }}
                >
                  🟢 Live
                </span>
              </div>
            </div>

            {/* Spacetime diagram mini-viz */}
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: 72, height: 72, borderRadius: 14,
                  background: "rgba(10,8,30,0.8)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Mini spacetime diagram */}
                <svg width="52" height="52" viewBox="0 0 52 52">
                  {/* Axes */}
                  <line x1="26" y1="4" x2="26" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  <line x1="4" y1="26" x2="48" y2="26" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  {/* Light cone */}
                  <line x1="26" y1="26" x2="4" y2="4" stroke="rgba(250,204,21,0.7)" strokeWidth="1.2"/>
                  <line x1="26" y1="26" x2="48" y2="4" stroke="rgba(250,204,21,0.7)" strokeWidth="1.2"/>
                  <line x1="26" y1="26" x2="4" y2="48" stroke="rgba(250,204,21,0.4)" strokeWidth="1" strokeDasharray="2,2"/>
                  <line x1="26" y1="26" x2="48" y2="48" stroke="rgba(250,204,21,0.4)" strokeWidth="1" strokeDasharray="2,2"/>
                  {/* Tachyon worldline */}
                  <line x1="10" y1="34" x2="42" y2="18" stroke="rgba(139,92,246,0.9)" strokeWidth="1.5"/>
                  {/* Origin dot */}
                  <circle cx="26" cy="26" r="2.5" fill="rgba(139,92,246,1)"/>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

          {/* The Idea */}
          <GlassCard delay={0.15} accentColor="rgba(139,92,246,0.8)" className="sm:col-span-2">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤔</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>The Idea</h3>
              </div>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 1.7 }}>
                I got interested in faster-than-light (FTL) physics and the{" "}
                <span style={{ color: "rgba(196,181,253,1)", fontWeight: 600 }}>tachyonic antitelephone paradox</span>
                {" "}— the idea that FTL particles could let you send messages to your own past. So I built a visual simulator to explore what happens when you break the speed of light in special relativity.
              </p>
            </div>
          </GlassCard>

          {/* Status */}
          <GlassCard delay={0.2} accentColor="rgba(74,222,128,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(74,222,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🚀</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Status</h3>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(74,222,128,1)", boxShadow: "0 0 8px rgba(74,222,128,0.8)" }} />
                <span style={{ fontWeight: 600, color: "rgba(74,222,128,1)", fontSize: 13 }}>Live & Deployed</span>
              </div>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.4)", fontSize: 11, lineHeight: 1.5 }}>
                Interactive demo on Replit
              </p>
            </div>
          </GlassCard>

          {/* What It Does */}
          <GlassCard delay={0.25} accentColor="rgba(99,210,255,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(99,210,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>What It Does</h3>
              </div>
              <div className="space-y-1.5">
                {["Renders spacetime diagrams", "Shows light cones", "Animated particle worldlines", "Reference frame switching"].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(99,210,255,0.7)", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* The Physics */}
          <GlassCard delay={0.3} accentColor="rgba(250,204,21,0.8)" className="sm:col-span-2">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(250,204,21,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🧮</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>The Physics</h3>
              </div>
              <div className="space-y-2">
                {[
                  ["Special Relativity", "Events simultaneous in one frame aren't in another"],
                  ["Light Cones", "Define causal structure — 45° lines on spacetime diagrams"],
                  ["Tachyons", "Hypothetical FTL particles that violate causality if they exist"],
                ].map(([term, def]) => (
                  <div key={term} className="flex items-start gap-2">
                    <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(250,204,21,0.85)", minWidth: 110, flexShrink: 0 }}>{term}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{def}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* The Paradox */}
          <GlassCard delay={0.35} accentColor="rgba(239,68,68,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📡</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>The Paradox</h3>
              </div>
              <div className="space-y-2">
                {[
                  "A sends an FTL signal to B",
                  "In B's frame it arrives BEFORE it was sent",
                  "= effective time travel",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(239,68,68,0.8)", minWidth: 16, marginTop: 1 }}>{i + 1}.</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Built With */}
          <GlassCard delay={0.4} accentColor="rgba(139,92,246,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🛠️</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Built With</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "TypeScript", "HTML5 Canvas", "Express.js", "Lorentz math"].map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "rgba(139,92,246,0.12)",
                      border: "1px solid rgba(139,92,246,0.25)",
                      borderRadius: 999,
                      padding: "3px 9px",
                      fontSize: 11,
                      color: "rgba(196,181,253,0.9)",
                      fontWeight: 500,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* What I Learned */}
          <GlassCard delay={0.45} accentColor="rgba(99,210,255,0.8)" className="sm:col-span-2">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(99,210,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📚</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>What I Learned</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {[
                  "Lorentz transformations and reference frame math",
                  "Canvas rendering for 60fps spacetime animations",
                  "Causality violation detection algorithms",
                  "How relativity makes FTL equivalent to time travel",
                ].map((l) => (
                  <div key={l} className="flex items-start gap-2">
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(99,210,255,0.7)", flexShrink: 0, marginTop: 4 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* My Role */}
          <GlassCard delay={0.5} accentColor="rgba(196,181,253,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(196,181,253,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>My Role</h3>
              </div>
              <p style={{ fontWeight: 600, color: "rgba(196,181,253,1)", fontSize: 13 }}>Solo Project</p>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4, lineHeight: 1.6 }}>
                Physics research · Canvas rendering · UI · Backend
              </p>
            </div>
          </GlassCard>

        </div>

        {/* ── Quote footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
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
              Started as a deep dive into FTL physics thought experiments. Turned into a full canvas-based
              spacetime simulator where you can actually SEE how faster-than-light particles break causality.
              Pretty wild to visualize abstract physics concepts in real-time.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

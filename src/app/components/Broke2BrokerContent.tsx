import b2bLogo from "figma:asset/536bb5d473c4166ce9d976faad03a690d1a04b6e.png";
import { motion } from "motion/react";
import { Instagram, ExternalLink, TrendingUp, Users, BookOpen, Target, Zap, Heart } from "lucide-react";
import { useState } from "react";

// Liquid glass card component
function GlassCard({
  children,
  delay = 0,
  accentColor = "rgba(34,197,94,0.6)",
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
        background: hovered
          ? "rgba(255,255,255,0.10)"
          : "rgba(255,255,255,0.065)",
        backdropFilter: "blur(24px) saturate(1.6)",
        WebkitBackdropFilter: "blur(24px) saturate(1.6)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 20,
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.22)`
          : `0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.14)`,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Top shine */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          pointerEvents: "none",
        }}
      />
      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: accentColor,
          opacity: hovered ? 0.15 : 0.08,
          filter: "blur(32px)",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        }}
      />
      {children}
    </motion.div>
  );
}

// Push pin component
function PushPin({ color = "#ef4444" }: { color?: string }) {
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${color}dd, ${color}ff)`,
        boxShadow: `0 2px 6px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.2)`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.5)",
          margin: "3px auto 0",
        }}
      />
    </div>
  );
}

export function Broke2BrokerContent() {
  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: "linear-gradient(145deg, rgba(10,20,10,1) 0%, rgba(5,25,15,1) 50%, rgba(8,18,8,1) 100%)",
      }}
    >
      {/* Subtle noise texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 80% 60% at 20% 20%, rgba(34,197,94,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 80%, rgba(22,163,74,0.05) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-4 relative">

        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          {/* Green glow behind header */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 100% at 10% 50%, rgba(34,197,94,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 relative">
            <div
              style={{
                width: 64, height: 64,
                borderRadius: 16,
                overflow: "hidden",
                border: "1.5px solid rgba(34,197,94,0.5)",
                boxShadow: "0 0 24px rgba(34,197,94,0.25)",
                flexShrink: 0,
              }}
            >
              <img src={b2bLogo} alt="broke2broker" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 style={{ fontWeight: 700, fontSize: "clamp(22px,3vw,30px)", color: "rgba(34,197,94,1)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                broke2broker
              </h1>
              <p className="mt-1 text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
                Financial literacy for teens · Instagram + school clubs
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <a
                  href="https://www.instagram.com/broke2broker/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    border: "1px solid rgba(34,197,94,0.4)",
                    color: "rgba(74,222,128,1)",
                    fontWeight: 500,
                  }}
                >
                  <Instagram size={10} />
                  @broke2broker
                  <ExternalLink size={9} />
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
                  🟢 Active
                </span>
              </div>
            </div>

            {/* Stats cluster */}
            <div className="flex sm:flex-col gap-3 sm:gap-2 flex-shrink-0">
              {[
                { label: "Members", value: "20+", icon: "👥" },
                { label: "Followers", value: "50+", icon: "📱" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center px-4 py-2 rounded-xl"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    minWidth: 72,
                  }}
                >
                  <div className="text-base">{s.icon}</div>
                  <div style={{ fontWeight: 700, color: "rgba(74,222,128,1)", fontSize: 16, lineHeight: 1.2 }}>{s.value}</div>
                  <div style={{ fontWeight: 400, color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

          {/* Mission */}
          <GlassCard delay={0.15} accentColor="rgba(239,68,68,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>💡</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>The Mission</h3>
              </div>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 1.6 }}>
                Teach high school students practical money management skills they don't learn in class.
              </p>
            </div>
          </GlassCard>

          {/* FinFit Club */}
          <GlassCard delay={0.2} accentColor="rgba(34,197,94,0.8)" className="sm:col-span-2 lg:col-span-2">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🏫</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>FinFit Club</h3>
                <div className="ml-auto flex items-center gap-1.5">
                  <PushPin color="#ef4444" />
                </div>
              </div>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 1.6 }}>
                Club at Forsyth Central High School where we discuss budgeting, investing, credit, and career paths in finance.
              </p>
            </div>
          </GlassCard>

          {/* Topics */}
          <GlassCard delay={0.25} accentColor="rgba(250,204,21,0.8)" className="sm:col-span-1">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(250,204,21,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📚</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Topics</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["💰 Budgeting", "📈 Stocks", "💳 Credit", "🏦 Banking", "🎓 Loans"].map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 999,
                      padding: "3px 9px",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 500,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Instagram */}
          <GlassCard delay={0.3} accentColor="rgba(168,85,247,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(168,85,247,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📱</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Instagram</h3>
              </div>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 1.6 }}>
                Bite-sized financial tips posted weekly.
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <Users size={12} style={{ color: "rgba(168,85,247,0.8)" }} />
                <span style={{ fontWeight: 600, color: "rgba(196,181,253,1)", fontSize: 13 }}>50+</span>
                <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.4)", fontSize: 11 }}>followers</span>
              </div>
            </div>
          </GlassCard>

          {/* Growth */}
          <GlassCard delay={0.35} accentColor="rgba(34,197,94,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📊</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Growth</h3>
              </div>
              <div className="space-y-1.5">
                {["20+ club members", "Weekly meetings", "Guest speakers", "Real-world projects"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(34,197,94,0.8)", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* My Role */}
          <GlassCard delay={0.4} accentColor="rgba(99,130,255,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(99,130,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>My Role</h3>
              </div>
              <p style={{ fontWeight: 600, color: "rgba(147,197,253,1)", fontSize: 13 }}>Founder & President</p>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4, lineHeight: 1.6 }}>
                Content creation · Club leadership · Curriculum design
              </p>
            </div>
          </GlassCard>

          {/* Next Steps */}
          <GlassCard delay={0.45} accentColor="rgba(251,146,60,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(251,146,60,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎯</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Next Steps</h3>
              </div>
              <div className="space-y-1.5">
                {["Expand to more schools", "Create video content", "Partner with local banks"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(251,146,60,0.8)", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Status */}
          <GlassCard delay={0.5} accentColor="rgba(34,197,94,0.8)">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🚀</div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>Status</h3>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(34,197,94,1)", boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
                <span style={{ fontWeight: 600, color: "rgba(74,222,128,1)", fontSize: 13 }}>Active & Growing</span>
              </div>
              <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.4)", fontSize: 11, lineHeight: 1.5 }}>
                Started January 2026 · Still new & gaining traction!
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
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20,
            padding: "18px 22px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          <div className="flex items-start gap-3">
            <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>💭</span>
            <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.7, fontStyle: "italic" }}>
              I realized most teens (including me) had no idea how to manage money. We learn calculus but not budgeting.
              Started broke2broker to change that — one Instagram post and club meeting at a time.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

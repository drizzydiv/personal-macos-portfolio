import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Download, MapPin, ExternalLink } from "lucide-react";
import divikPhoto from "figma:asset/379ca8bfc8468eebc5bbd62cb2addac376adeb26.png";

const SKILLS = [
  { name: "React", cat: "Frontend", color: "rgba(99,210,255,1)" },
  { name: "React Native", cat: "Frontend", color: "rgba(99,210,255,1)" },
  { name: "TypeScript", cat: "Frontend", color: "rgba(99,210,255,1)" },
  { name: "Tailwind CSS", cat: "Frontend", color: "rgba(99,210,255,1)" },
  { name: "Node.js", cat: "Backend", color: "rgba(74,222,128,1)" },
  { name: "Express.js", cat: "Backend", color: "rgba(74,222,128,1)" },
  { name: "PostgreSQL", cat: "Backend", color: "rgba(74,222,128,1)" },
  { name: "REST APIs", cat: "Backend", color: "rgba(74,222,128,1)" },
  { name: "Drizzle ORM", cat: "Backend", color: "rgba(74,222,128,1)" },
  { name: "Figma", cat: "Tools", color: "rgba(196,181,253,1)" },
  { name: "Git / GitHub", cat: "Tools", color: "rgba(196,181,253,1)" },
  { name: "WebStorm", cat: "Tools", color: "rgba(196,181,253,1)" },
  { name: "JavaScript", cat: "Languages", color: "rgba(250,204,21,1)" },
  { name: "Java", cat: "Languages", color: "rgba(250,204,21,1)" },
  { name: "Python", cat: "Languages", color: "rgba(250,204,21,1)" },
  { name: "Lua", cat: "Languages", color: "rgba(250,204,21,1)" },
];

const EXPERIENCE = [
  {
    title: "Founder & President",
    org: "broke2broker",
    period: "Jan 2026 – Present",
    type: "Leadership",
    desc: "Teaching financial literacy to 20+ high school students through weekly club meetings and Instagram content creation.",
    accent: "rgba(34,197,94,1)",
    icon: "💰",
  },
  {
    title: "Solo Developer",
    org: "waqt (Personal Project)",
    period: "2024 – Present",
    type: "Development",
    desc: "Building an AI-powered calendar app using React Native, GPT-4o, and PostgreSQL with real-time event streaming.",
    accent: "rgba(99,210,255,1)",
    icon: "📅",
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", text: "HOSA ILC — 1st Place, Medical Innovation", year: "2024" },
  { icon: "🥈", text: "HOSA SLC — 2nd Place Medical Innovation, 3rd Place Dynamic Decisions", year: "2024" },
  { icon: "🎖️", text: "Presidential Volunteer Service Award — 2× recipient", year: "2023–24" },
  { icon: "🔬", text: "Science Olympiad — 3× 1st Place medalist", year: "2022–24" },
];

// Frosted glass section container
function GlassSection({
  children,
  delay = 0,
  accent,
}: {
  children: React.ReactNode;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: "rgba(255,255,255,0.045)",
        backdropFilter: "blur(32px) saturate(1.5)",
        WebkitBackdropFilter: "blur(32px) saturate(1.5)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 20,
        boxShadow: "0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {accent && (
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: accent,
            opacity: 0.06,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      )}
      {/* top shine line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
          pointerEvents: "none",
        }}
      />
      {children}
    </motion.div>
  );
}

export function DivikProfileContent() {
  const [skillFilter, setSkillFilter] = useState<string | null>(null);
  const cats = ["Frontend", "Backend", "Tools", "Languages"];

  const visibleSkills = skillFilter
    ? SKILLS.filter((s) => s.cat === skillFilter)
    : SKILLS;

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: "linear-gradient(150deg, rgba(8,12,28,1) 0%, rgba(12,16,36,1) 50%, rgba(10,10,24,1) 100%)",
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 70% 50% at 15% 20%, rgba(99,130,255,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 85% 75%, rgba(139,92,246,0.06) 0%, transparent 60%)
          `,
        }}
      />

      <div className="max-w-4xl mx-auto p-5 sm:p-10 space-y-4 relative">

        {/* ── Hero ── */}
        <GlassSection delay={0.05} accent="rgba(99,130,255,1)">
          <div className="p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">

              {/* Photo */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                style={{ flexShrink: 0 }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 22,
                    overflow: "hidden",
                    border: "1.5px solid rgba(99,210,255,0.35)",
                    boxShadow: "0 0 0 4px rgba(99,210,255,0.06), 0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={divikPhoto}
                    alt="Divik Srivastava"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.45 }}
                >
                  <h1
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(26px, 4vw, 38px)",
                      color: "rgba(255,255,255,0.95)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    Divik Srivastava
                  </h1>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: 15,
                      color: "rgba(99,210,255,0.85)",
                      marginTop: 4,
                      marginBottom: 10,
                    }}
                  >
                    Student
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <MapPin size={12} /> Cumming, GA
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        padding: "3px 10px",
                        borderRadius: 999,
                        background: "rgba(99,210,255,0.08)",
                        border: "1px solid rgba(99,210,255,0.2)",
                        color: "rgba(99,210,255,0.75)",
                        fontWeight: 500,
                      }}
                    >
                      Forsyth Central High School
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        padding: "3px 10px",
                        borderRadius: 999,
                        background: "rgba(34,197,94,0.08)",
                        border: "1px solid rgba(34,197,94,0.2)",
                        color: "rgba(74,222,128,0.9)",
                        fontWeight: 600,
                      }}
                    >
                      GPA 4.56
                    </span>
                  </div>

                  <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.7, maxWidth: 480 }}>
                    High school student passionate about building intuitive web and mobile experiences.
                    Currently seeking internships where I can grow, ship real products, and make an impact.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all"
                      style={{
                        background: "rgba(99,210,255,0.12)",
                        border: "1px solid rgba(99,210,255,0.3)",
                        color: "rgba(99,210,255,1)",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,210,255,0.2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(99,210,255,0.12)")}
                    >
                      <Mail size={12} /> Contact Me
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                    >
                      <Download size={12} /> Resume
                    </button>
                    <a
                      href="https://github.com/divik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                    >
                      <Github size={13} />
                    </a>
                    <a
                      href="https://linkedin.com/in/divik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                    >
                      <Linkedin size={13} />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </GlassSection>

        {/* ── Skills ── */}
        <GlassSection delay={0.2} accent="rgba(99,210,255,1)">
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)", fontSize: 15, letterSpacing: "-0.01em" }}>
                Skills & Technologies
              </h2>
              {/* Filter pills */}
              <div className="flex gap-1.5 flex-wrap justify-end">
                <button
                  onClick={() => setSkillFilter(null)}
                  style={{
                    fontSize: 10,
                    padding: "3px 9px",
                    borderRadius: 999,
                    border: `1px solid ${skillFilter === null ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}`,
                    background: skillFilter === null ? "rgba(255,255,255,0.12)" : "transparent",
                    color: skillFilter === null ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "all 0.15s",
                  }}
                >
                  All
                </button>
                {cats.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSkillFilter(skillFilter === c ? null : c)}
                    style={{
                      fontSize: 10,
                      padding: "3px 9px",
                      borderRadius: 999,
                      border: `1px solid ${skillFilter === c ? "rgba(99,210,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                      background: skillFilter === c ? "rgba(99,210,255,0.12)" : "transparent",
                      color: skillFilter === c ? "rgba(99,210,255,1)" : "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "all 0.15s",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {visibleSkills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  style={{
                    padding: "5px 13px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${skill.color}33`,
                    color: "rgba(255,255,255,0.75)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: skill.color,
                      opacity: 0.7,
                      borderRadius: "999px 0 0 999px",
                    }}
                  />
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </GlassSection>

        {/* ── Experience ── */}
        <GlassSection delay={0.3} accent="rgba(74,222,128,1)">
          <div className="p-5 sm:p-6">
            <h2 style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)", fontSize: 15, letterSpacing: "-0.01em", marginBottom: 16 }}>
              Experience
            </h2>
            <div className="space-y-3">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    padding: "14px 16px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Left accent glow */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: exp.accent,
                      borderRadius: "14px 0 0 14px",
                      opacity: 0.9,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: -20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: exp.accent,
                      opacity: 0.04,
                      filter: "blur(20px)",
                    }}
                  />

                  <div className="flex items-start justify-between gap-3 pl-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span style={{ fontSize: 20, marginTop: 1, flexShrink: 0 }}>{exp.icon}</span>
                      <div>
                        <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>{exp.title}</h3>
                        <p style={{ fontWeight: 500, color: exp.accent, fontSize: 12, opacity: 0.9 }}>{exp.org}</p>
                        <p style={{ fontWeight: 400, color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.6, marginTop: 4 }}>{exp.desc}</p>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        padding: "3px 9px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.4)",
                        fontWeight: 500,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassSection>

        {/* ── Achievements ── */}
        <GlassSection delay={0.4} accent="rgba(250,204,21,1)">
          <div className="p-5 sm:p-6">
            <h2 style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)", fontSize: 15, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Achievements
            </h2>
            <div className="space-y-2">
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.06, duration: 0.35 }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{a.icon}</span>
                  <p style={{ flex: 1, fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500, lineHeight: 1.5 }}>{a.text}</p>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 500, flexShrink: 0 }}>{a.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassSection>

        {/* ── Education ── */}
        <GlassSection delay={0.5} accent="rgba(99,210,255,1)">
          <div className="p-5 sm:p-6">
            <h2 style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)", fontSize: 15, letterSpacing: "-0.01em", marginBottom: 12 }}>
              Education
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 style={{ fontWeight: 600, color: "rgba(255,255,255,0.88)", fontSize: 14 }}>Forsyth Central High School</h3>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Cumming, GA</p>
              </div>
              <span
                style={{
                  fontSize: 13,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "rgba(99,210,255,0.1)",
                  border: "1px solid rgba(99,210,255,0.28)",
                  color: "rgba(99,210,255,1)",
                  fontWeight: 700,
                }}
              >
                GPA 4.56
              </span>
            </div>
          </div>
        </GlassSection>

      </div>
    </div>
  );
}

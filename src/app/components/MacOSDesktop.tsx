import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Music,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { MacOSMenuBar } from "./MacOSMenuBar";
import { MacOSDock } from "./MacOSDock";
import { MacOSWindow } from "./MacOSWindow";
import { MacOSWidgets } from "./MacOSWidgets";
import { AnimatedBackground } from "./AnimatedBackground";
import { FilmRollPhotos } from "./FilmRollPhotos";
import { TerminalContent } from "./TerminalContent";
import { DivikProfileContent } from "./DivikProfileContent";
import { Broke2BrokerContent } from "./Broke2BrokerContent";
import { WaqtContent } from "./WaqtContent";
import { CausalityChallengeContent } from "./CausalityChallengeContent";
import { DesktopFolders } from "./DesktopFolders";
import { HollowPurpleAnimation } from "./HollowPurpleAnimation";

interface AppWindow {
  id: string;
  title: string;
  component: React.ReactNode;
}

export function MacOSDesktop() {
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [showFinderHint, setShowFinderHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFinderHint(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenApp = (appId: string) => {
    if (openWindows.find((w) => w.id === appId)) return;

    const appComponents: Record<string, { title: string; component: React.ReactNode }> = {
      about: { title: "About Me", component: <AboutContent /> },
      projects: { title: "Projects", component: <ProjectsContent /> },
      skills: { title: "Skills", component: <SkillsContent /> },
      experience: { title: "Experience", component: <ExperienceContent /> },
      contact: { title: "Contact", component: <ContactContent /> },
      photos: { title: "Photos", component: <FilmRollPhotos /> },
      music: { title: "Music", component: <MusicContent /> },
      finder: { title: "Finder", component: <FinderContent onOpenApp={handleOpenApp} /> },
      mail: { title: "Mail", component: <ContactContent /> },
      safari: { title: "Hollow Purple", component: <HollowPurpleAnimation /> },
      terminal: { title: "Terminal", component: <TerminalContent onOpenProfile={() => handleOpenApp("divikprofile")} onOpenProject={handleOpenApp} /> },
      divikprofile: { title: "divik srivastava", component: <DivikProfileContent /> },
      broke2broker: { title: "broke2broker", component: <Broke2BrokerContent /> },
      waqt: { title: "waqt", component: <WaqtContent /> },
      causalitychallenge: { title: "causalitychallenge", component: <CausalityChallengeContent /> },
    };

    const appConfig = appComponents[appId];
    if (appConfig) {
      setOpenWindows([...openWindows, { id: appId, ...appConfig }]);
    }
  };

  const handleCloseWindow = (appId: string) => {
    setOpenWindows(openWindows.filter((w) => w.id !== appId));
  };

  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ willChange: "opacity" }}
    >
      <AnimatedBackground>
        <MacOSMenuBar />
        <MacOSWidgets />
        <DesktopFolders onOpenApp={handleOpenApp} />

        <AnimatePresence>
          {showFinderHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute",
                bottom: 110,
                left: "calc(50% - 337px)",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  padding: "7px 16px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(40px) saturate(2) brightness(1.3)",
                  WebkitBackdropFilter: "blur(40px) saturate(2) brightness(1.3)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  boxShadow: [
                    "0 8px 32px rgba(0,0,0,0.40)",
                    "inset 0 1.5px 0 rgba(255,255,255,0.30)",
                    "inset 0 -1px 0 rgba(0,0,0,0.12)",
                  ].join(", "),
                  marginBottom: 8,
                }}
              >
                <p
                  style={{
                    fontFamily: "'-apple-system', 'SF Pro Text', BlinkMacSystemFont, system-ui, sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.92)",
                    whiteSpace: "nowrap",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Click on the Finder app
                </p>
              </div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderTop: "10px solid rgba(255,255,255,0.18)",
                  filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.35))",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <MacOSDock onOpenApp={handleOpenApp} />

        <AnimatePresence>
          {openWindows.map((window, index) => (
            <MacOSWindow
              key={window.id}
              title={window.title}
              onClose={() => handleCloseWindow(window.id)}
              zIndex={20 + index}
            >
              {window.component}
            </MacOSWindow>
          ))}
        </AnimatePresence>
      </AnimatedBackground>
    </motion.div>
  );
}

const glassCard = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
};

function AboutContent() {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start gap-6 mb-8">
          <div
            className="w-32 h-32 rounded-2xl flex items-center justify-center text-white text-5xl flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(99,130,255,0.9), rgba(139,92,246,0.9))",
              boxShadow: "0 8px 32px rgba(99,130,255,0.3)",
              fontWeight: 200,
            }}
          >
            YN
          </div>
          <div>
            <h1 className="text-4xl mb-2 text-white/90" style={{ fontWeight: 300 }}>
              Your Name
            </h1>
            <p className="text-xl text-white/50 mb-4" style={{ fontWeight: 300 }}>
              Full Stack Developer
            </p>
            <p className="text-white/60 leading-relaxed" style={{ fontWeight: 300 }}>
              Passionate about creating beautiful, functional, and user-friendly applications.
              Specialized in modern web technologies and always eager to learn new things.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Location", value: "San Francisco, CA" },
            { label: "Experience", value: "5+ Years" },
            { label: "Education", value: "Computer Science, BS" },
            { label: "Languages", value: "English, Spanish" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl p-5" style={glassCard}>
              <h3 className="text-white/50 text-xs uppercase tracking-widest mb-2">{item.label}</h3>
              <p className="text-white/80" style={{ fontWeight: 300 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    { name: "E-Commerce Platform", description: "Full-stack e-commerce solution with React and Node.js", tech: ["React", "Node.js", "PostgreSQL", "Stripe"], status: "Production", color: "rgba(34,197,94,0.15)", textColor: "rgba(134,239,172,1)" },
    { name: "Task Management App", description: "Collaborative task management with real-time updates", tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"], status: "Active Dev", color: "rgba(99,130,255,0.15)", textColor: "rgba(147,197,253,1)" },
    { name: "Analytics Dashboard", description: "Real-time analytics and data visualization platform", tech: ["React", "D3.js", "Python", "FastAPI"], status: "Completed", color: "rgba(139,92,246,0.15)", textColor: "rgba(196,181,253,1)" },
    { name: "Mobile Fitness Tracker", description: "Cross-platform mobile app for fitness tracking", tech: ["React Native", "Firebase", "Redux"], status: "Beta", color: "rgba(6,182,212,0.15)", textColor: "rgba(103,232,249,1)" },
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl mb-6 text-white/80" style={{ fontWeight: 300 }}>My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div key={project.name} className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]" style={glassCard}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg text-white/85" style={{ fontWeight: 400 }}>{project.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: project.color, color: project.textColor }}>
                  {project.status}
                </span>
              </div>
              <p className="text-white/50 mb-4 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsContent() {
  const skillCategories = [
    { category: "Frontend", color: "rgba(99,130,255,1)", skills: [{ name: "React / Next.js", level: 95 }, { name: "TypeScript", level: 90 }, { name: "Tailwind CSS", level: 95 }, { name: "Vue.js", level: 80 }] },
    { category: "Backend", color: "rgba(139,92,246,1)", skills: [{ name: "Node.js", level: 90 }, { name: "Python", level: 85 }, { name: "PostgreSQL", level: 80 }, { name: "GraphQL", level: 75 }] },
    { category: "Tools & Others", color: "rgba(6,182,212,1)", skills: [{ name: "Git / GitHub", level: 95 }, { name: "Docker", level: 80 }, { name: "AWS", level: 75 }, { name: "Figma", level: 85 }] },
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl mb-6 text-white/80" style={{ fontWeight: 300 }}>Skills & Technologies</h2>
        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm uppercase tracking-widest mb-4 text-white/40">{category.category}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{skill.name}</span>
                      <span className="text-white/30 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div
                        className="h-1.5 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${category.color}80, ${category.color})`, boxShadow: `0 0 10px ${category.color}40` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceContent() {
  const experiences = [
    { company: "Tech Corp", role: "Senior Full Stack Developer", period: "2022 – Present", description: "Leading development of microservices architecture and mentoring junior developers." },
    { company: "StartupXYZ", role: "Full Stack Developer", period: "2020 – 2022", description: "Built and scaled web applications serving 100K+ users." },
    { company: "Digital Agency", role: "Frontend Developer", period: "2018 – 2020", description: "Created responsive web applications for various clients." },
  ];

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl mb-6 text-white/80" style={{ fontWeight: 300 }}>Work Experience</h2>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="rounded-2xl p-6" style={glassCard}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-white/85" style={{ fontWeight: 400 }}>{exp.role}</h3>
                <span className="text-xs px-2.5 py-1 rounded-full ml-4 flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                  {exp.period}
                </span>
              </div>
              <p className="text-white/40 text-sm mb-3" style={{ fontWeight: 300 }}>{exp.company}</p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl mb-6 text-white/80" style={{ fontWeight: 300 }}>Get In Touch</h2>
        <div className="mb-6">
          <div className="rounded-2xl p-5" style={glassCard}>
            <div className="text-blue-400 mb-3"><Mail size={20} /></div>
            <h3 className="text-white/50 text-xs uppercase tracking-widest mb-1">Email</h3>
            <a href="mailto:diviksrivastava07@gmail.com" className="text-white/70 text-sm hover:text-white/90 transition-colors" style={{ fontWeight: 300 }}>
              diviksrivastava07@gmail.com
            </a>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={glassCard}>
          <h3 className="text-white/60 text-sm uppercase tracking-widest mb-5">Send a Message</h3>
          <form className="space-y-3">
            {["Your Name", "Your Email"].map((ph) => (
              <input
                key={ph}
                type={ph.includes("Email") ? "email" : "text"}
                placeholder={ph}
                className="w-full px-4 py-2.5 rounded-xl text-white/80 placeholder-white/25 text-sm focus:outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontWeight: 300 }}
              />
            ))}
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl text-white/80 placeholder-white/25 text-sm focus:outline-none resize-none transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontWeight: 300 }}
            />
            <button
              type="button"
              className="w-full py-2.5 rounded-xl text-white text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, rgba(99,130,255,0.8), rgba(139,92,246,0.8))", boxShadow: "0 4px 20px rgba(99,130,255,0.25)", fontWeight: 400 }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function MusicContent() {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl mb-6 text-white/80" style={{ fontWeight: 300 }}>Currently Playing</h2>
        <div className="rounded-2xl p-10 text-center" style={glassCard}>
          <div className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.8), rgba(236,72,153,0.8))", boxShadow: "0 8px 32px rgba(139,92,246,0.3)" }}>
            <Music size={40} className="text-white" />
          </div>
          <h3 className="text-2xl text-white/80 mb-2" style={{ fontWeight: 300 }}>Favorite Coding Playlist</h3>
          <p className="text-white/40" style={{ fontWeight: 300 }}>Lo-fi beats to code to</p>
        </div>
      </div>
    </div>
  );
}

function FinderContent({ onOpenApp }: { onOpenApp: (appId: string) => void }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    { id: "broke2broker", name: "broke2broker", type: "Financial Literacy", color: "rgba(34,197,94,0.8)", icon: "💰", desc: "Teaching teens money management through Instagram and school clubs" },
    { id: "waqt", name: "waqt", type: "Mobile App", color: "rgba(180,230,60,0.8)", icon: "📅", desc: "AI calendar that converts plain English into structured events" },
    { id: "causalitychallenge", name: "causality challenge", type: "Web Simulation", color: "rgba(139,92,246,0.8)", icon: "⚛️", desc: "Interactive FTL physics simulator exploring tachyons and causality" },
  ];

  return (
    <div
      className="h-full overflow-y-auto"
      style={{ background: "linear-gradient(135deg, rgba(139,115,85,0.45) 0%, rgba(101,84,63,0.55) 100%)" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px),
            repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px)
          `,
          backgroundSize: "4px 4px",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      <div className="p-4 sm:p-8 max-w-6xl mx-auto relative">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="mb-8 sm:mb-12 relative"
        >
          <div style={{ position: "absolute", top: -20, left: "10%", right: "10%", height: 2, background: "rgba(101,84,63,0.6)", boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }} />

          {[15, 85].map((pos, i) => (
            <div
              key={i}
              style={{ position: "absolute", top: -26, left: `${pos}%`, width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(135deg, rgba(239,68,68,0.9), rgba(220,38,38,1))", boxShadow: "0 2px 6px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.2)" }}
            >
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
            </div>
          ))}

          <div style={{ background: "rgba(255,255,255,0.95)", padding: "20px 24px", borderRadius: 4, boxShadow: "0 6px 20px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15)", border: "1px solid rgba(0,0,0,0.06)", transform: "rotate(-0.5deg)" }}>
            <h1 className="text-2xl sm:text-4xl mb-1 sm:mb-2 text-center" style={{ fontWeight: 700, color: "rgba(0,0,0,0.85)", letterSpacing: "-0.02em" }}>
              Navigator
            </h1>
            <p className="text-center text-xs sm:text-sm" style={{ fontWeight: 400, color: "rgba(0,0,0,0.5)", letterSpacing: "0.02em" }}>
              Click any project to explore · Built by Divik Srivastava
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="relative mb-6 sm:mb-10"
        >
          <div style={{ position: "relative", width: 14, height: 14, margin: "0 auto 8px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(239,68,68,0.9), rgba(220,38,38,1))", boxShadow: "0 2px 6px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.2)" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
          </div>

          <motion.div
            whileHover={{ scale: 1.02, rotate: 0.5, transition: { type: "spring", stiffness: 400, damping: 25 } }}
            onClick={() => onOpenApp("divikprofile")}
            style={{ background: "rgba(255,255,255,0.95)", padding: "16px 20px", borderRadius: 4, boxShadow: "0 4px 16px rgba(0,0,0,0.2)", border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", transform: "rotate(0.3deg)", maxWidth: 600, margin: "0 auto" }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0" style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, rgba(99,130,255,0.2), rgba(139,92,246,0.2))", border: "2px solid rgba(99,130,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                👤
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base mb-0.5" style={{ fontWeight: 600, color: "rgba(0,0,0,0.85)" }}>About Me</h3>
                <p className="text-[10px] sm:text-xs" style={{ fontWeight: 400, color: "rgba(0,0,0,0.5)" }}>
                  Learn about my background, skills, and experience
                </p>
              </div>
              <ArrowUpRight size={16} className="flex-shrink-0" style={{ color: "rgba(0,0,0,0.3)" }} />
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.05, rotate: hoveredProject === project.id ? 0 : (i % 2 === 0 ? 2 : -2), y: -12, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              style={{ transform: `rotate(${i % 2 === 0 ? 1.5 : -1.5}deg)` }}
            >
              <motion.div
                animate={{ scale: hoveredProject === project.id ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{ position: "relative", width: 14, height: 14, margin: "0 auto 8px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(239,68,68,0.9), rgba(220,38,38,1))", boxShadow: "0 2px 6px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.2)", zIndex: 10 }}
              >
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
              </motion.div>

              <div style={{ background: "rgba(255,255,255,0.98)", padding: "12px 12px 16px 12px", borderRadius: 3, boxShadow: hoveredProject === project.id ? "0 12px 32px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.25)" : "0 6px 20px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)", border: "1px solid rgba(0,0,0,0.08)", transition: "box-shadow 0.3s ease" }}>
                <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: 2, background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}10 100%)`, border: `1px solid ${project.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <div className="text-5xl sm:text-6xl">{project.icon}</div>
                </div>

                <div className="px-1">
                  <h3 className="text-sm sm:text-base mb-1" style={{ fontWeight: 600, color: "rgba(0,0,0,0.85)", letterSpacing: "-0.01em" }}>
                    {project.name}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] mb-2 sm:mb-3" style={{ fontWeight: 500, color: "rgba(0,0,0,0.45)", letterSpacing: "0.01em" }}>
                    {project.type}
                  </p>
                  <p className="text-[11px] sm:text-xs leading-relaxed mb-3" style={{ fontWeight: 400, color: "rgba(0,0,0,0.65)" }}>
                    {project.desc}
                  </p>
                  <button
                    onClick={() => onOpenApp(project.id)}
                    className="w-full py-2 sm:py-2 rounded-md text-xs transition-all"
                    style={{ background: `${project.color}15`, border: `1px solid ${project.color}40`, color: project.color, fontWeight: 600, cursor: "pointer" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${project.color}25`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${project.color}15`; }}
                  >
                    Open →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, rotate: -5, scale: 0.8 }}
          animate={{ opacity: 1, rotate: -3, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
          className="hidden sm:block"
          style={{ position: "absolute", bottom: 16, right: 16, background: "rgba(255,250,205,1)", padding: "12px 16px", borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.2)", maxWidth: 200 }}
        >
          <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 40, height: 12, background: "rgba(255,255,255,0.3)", border: "1px solid rgba(0,0,0,0.08)", backdropFilter: "blur(2px)", borderRadius: 1 }} />
          <div className="text-[10px] mb-1" style={{ fontWeight: 600, color: "rgba(0,0,0,0.7)" }}>💡 Pro Tip</div>
          <p className="text-[10px] leading-relaxed" style={{ fontWeight: 400, color: "rgba(0,0,0,0.65)" }}>
            Try the Terminal! Type <code style={{ background: "rgba(0,0,0,0.1)", padding: "1px 3px", borderRadius: 2, fontFamily: "'SF Mono', monospace" }}>cd waqt</code> to navigate
          </p>
        </motion.div>

      </div>
    </div>
  );
}

function BlankFolderContent({ name }: { name: string }) {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(99,130,255,0.2)", border: "1px solid rgba(99,130,255,0.3)" }}>
          <ExternalLink size={36} className="text-blue-400" />
        </div>
        <h2 className="text-2xl mb-3 text-white/80" style={{ fontWeight: 300 }}>External Link</h2>
        <p className="text-white/40 mb-6 text-sm" style={{ fontWeight: 300 }}>{name}</p>
        <a
          href={`https://example.com/${name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-xl text-white text-sm transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, rgba(99,130,255,0.8), rgba(139,92,246,0.8))", boxShadow: "0 4px 20px rgba(99,130,255,0.25)", fontWeight: 400 }}
        >
          Open in New Tab
        </a>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function HollowPurpleAnimation() {
  const [stage, setStage] = useState<"initial" | "merge" | "purple" | "release" | "transition" | "complete">("initial");
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; speed: number; size: number }>>([]);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    // Generate particles - REDUCED from 80 to 40 for performance
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / 40,
      speed: 0.5 + Math.random() * 0.5,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);

    // Animation sequence - only run once
    const timer1 = setTimeout(() => setStage("merge"), 1000);
    const timer2 = setTimeout(() => setStage("purple"), 2500);
    const timer3 = setTimeout(() => setStage("release"), 4500);
    const timer4 = setTimeout(() => setStage("transition"), 6000);
    const timer5 = setTimeout(() => {
      setStage("complete");
      setShowPage(true);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  if (showPage) {
    return <FutureProjectsPage />;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)",
        overflow: "hidden",
        zIndex: stage === "transition" ? 9999 : 1,
      }}
    >
      {/* Fullscreen transition overlay */}
      <AnimatePresence>
        {stage === "transition" && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              background: "radial-gradient(circle at center, rgba(139,92,246,0.3) 0%, rgba(0,0,0,1) 100%)",
              zIndex: 10000,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Background distortion grid */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          scale: stage === "release" ? 1.5 : stage === "transition" ? 2 : 1,
          opacity: stage === "release" || stage === "transition" ? 0 : 0.3,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* "Future Projects" Text */}
      <AnimatePresence>
        {(stage === "purple" || stage === "release") && (
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 100,
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: stage === "release" ? [1, 1, 0] : 1,
              scale: stage === "release" ? [1, 1.05, 1.1] : 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: stage === "release" ? 2 : 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Main Title */}
            <motion.div
              style={{
                fontFamily: "'SF Pro Display', '-apple-system', sans-serif",
                fontSize: 56,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.98)",
                textShadow: "0 0 40px rgba(139,92,246,0.4), 0 4px 20px rgba(0,0,0,0.6)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                textAlign: "center",
                willChange: "text-shadow",
              }}
              animate={{
                textShadow: [
                  "0 0 40px rgba(139,92,246,0.4), 0 4px 20px rgba(0,0,0,0.6)",
                  "0 0 60px rgba(139,92,246,0.5), 0 4px 20px rgba(0,0,0,0.6)",
                  "0 0 40px rgba(139,92,246,0.4), 0 4px 20px rgba(0,0,0,0.6)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Future Projects
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radial energy lines - REDUCED from 24 to 12 */}
      <AnimatePresence>
        {(stage === "purple" || stage === "release" || stage === "transition") && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                style={{
                  position: "absolute",
                  width: 2,
                  height: stage === "release" || stage === "transition" ? "200%" : "60%",
                  background: `linear-gradient(to bottom, 
                    transparent 0%, 
                    rgba(139, 92, 246, ${0.6 + Math.random() * 0.4}) 50%, 
                    transparent 100%)`,
                  transformOrigin: "center center",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) rotate(${(360 / 12) * i}deg)`,
                  filter: "blur(1px)",
                  willChange: "transform, opacity",
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                  opacity: stage === "transition" ? [1, 0] : [0, 1, 1, 0],
                  scaleY: stage === "transition" ? [1, 3] : [0, 1, 1, 2],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: stage === "transition" ? 1 : stage === "release" ? 1.5 : 2,
                  delay: i * 0.02,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Outer glow ring */}
      <AnimatePresence>
        {(stage === "purple" || stage === "release" || stage === "transition") && (
          <motion.div
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: stage === "transition" ? [1, 8] : stage === "release" ? [1, 2.5] : 1,
              opacity: stage === "transition" ? [0.8, 0] : stage === "release" ? [0.8, 0] : 0.8,
            }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: stage === "transition" ? 1 : 1.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Blue sphere (left) */}
      <AnimatePresence>
        {(stage === "initial" || stage === "merge") && (
          <motion.div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, rgba(59,130,246,1) 0%, rgba(37,99,235,0.8) 50%, rgba(29,78,216,0.4) 100%)",
              boxShadow: `
                0 0 40px rgba(59,130,246,0.8),
                0 0 80px rgba(59,130,246,0.6),
                0 0 120px rgba(59,130,246,0.4),
                inset 0 0 40px rgba(147,197,253,0.6)
              `,
            }}
            initial={{ x: -200, scale: 0, opacity: 0 }}
            animate={{
              x: stage === "merge" ? 0 : -200,
              scale: stage === "merge" ? [1, 1.2, 0.8] : 1,
              opacity: stage === "merge" ? [1, 1, 0] : 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Blue inner core */}
            <motion.div
              style={{
                position: "absolute",
                inset: 20,
                borderRadius: "50%",
                background: "radial-gradient(circle at center, rgba(191,219,254,1) 0%, rgba(96,165,250,0.5) 100%)",
                filter: "blur(8px)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Red sphere (right) */}
      <AnimatePresence>
        {(stage === "initial" || stage === "merge") && (
          <motion.div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, rgba(239,68,68,1) 0%, rgba(220,38,38,0.8) 50%, rgba(185,28,28,0.4) 100%)",
              boxShadow: `
                0 0 40px rgba(239,68,68,0.8),
                0 0 80px rgba(239,68,68,0.6),
                0 0 120px rgba(239,68,68,0.4),
                inset 0 0 40px rgba(252,165,165,0.6)
              `,
            }}
            initial={{ x: 200, scale: 0, opacity: 0 }}
            animate={{
              x: stage === "merge" ? 0 : 200,
              scale: stage === "merge" ? [1, 1.2, 0.8] : 1,
              opacity: stage === "merge" ? [1, 1, 0] : 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Red inner core */}
            <motion.div
              style={{
                position: "absolute",
                inset: 20,
                borderRadius: "50%",
                background: "radial-gradient(circle at center, rgba(254,202,202,1) 0%, rgba(248,113,113,0.5) 100%)",
                filter: "blur(8px)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hollow Purple main sphere */}
      <AnimatePresence>
        {(stage === "purple" || stage === "release" || stage === "transition") && (
          <motion.div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `
                radial-gradient(circle at 35% 35%, 
                  rgba(196,181,253,1) 0%, 
                  rgba(139,92,246,1) 20%,
                  rgba(109,40,217,0.9) 40%,
                  rgba(88,28,135,0.7) 60%,
                  rgba(59,7,100,0.4) 80%,
                  transparent 100%
                )
              `,
              boxShadow: `
                0 0 60px rgba(139,92,246,1),
                0 0 120px rgba(139,92,246,0.8),
                0 0 180px rgba(139,92,246,0.6),
                0 0 240px rgba(139,92,246,0.4),
                inset 0 0 60px rgba(196,181,253,0.8),
                inset 0 0 30px rgba(139,92,246,0.6)
              `,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: stage === "transition" ? [1, 0.5, 15] : stage === "release" ? [1, 0.8, 3] : 1,
              opacity: stage === "transition" ? [1, 1, 0] : stage === "release" ? [1, 1, 0] : 1,
              rotate: [0, 360],
            }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{
              scale: { duration: stage === "transition" ? 1 : stage === "release" ? 1.2 : 0.8, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: stage === "transition" ? 1 : stage === "release" ? 1.2 : 0.8 },
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            }}
          >
            {/* Bright core */}
            <motion.div
              style={{
                position: "absolute",
                inset: 30,
                borderRadius: "50%",
                background: "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(196,181,253,0.8) 40%, transparent 100%)",
                filter: "blur(12px)",
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Void effect - dark center */}
            <motion.div
              style={{
                position: "absolute",
                width: 60,
                height: 60,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, transparent 100%)",
                border: "2px solid rgba(139,92,246,0.6)",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.9)",
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Distortion rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                style={{
                  position: "absolute",
                  inset: -40 - i * 30,
                  borderRadius: "50%",
                  border: `2px solid rgba(139,92,246,${0.4 - i * 0.1})`,
                  filter: "blur(2px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0.2, 0.6],
                  rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                }}
                transition={{
                  duration: 3 - i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle system */}
      <AnimatePresence>
        {(stage === "purple" || stage === "release" || stage === "transition") && (
          <>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                style={{
                  position: "absolute",
                  width: particle.size,
                  height: particle.size,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(196,181,253,1) 0%, rgba(139,92,246,0.8) 100%)`,
                  boxShadow: `0 0 ${particle.size * 2}px rgba(139,92,246,0.8)`,
                }}
                initial={{
                  x: Math.cos(particle.angle) * 100,
                  y: Math.sin(particle.angle) * 100,
                  opacity: 0,
                }}
                animate={{
                  x: stage === "transition"
                    ? [
                        Math.cos(particle.angle) * 100,
                        Math.cos(particle.angle) * 150,
                        Math.cos(particle.angle) * 1200,
                      ]
                    : stage === "release"
                    ? [
                        Math.cos(particle.angle) * 100,
                        Math.cos(particle.angle) * 150,
                        Math.cos(particle.angle) * 600,
                      ]
                    : [
                        Math.cos(particle.angle) * 100,
                        Math.cos(particle.angle) * (120 + Math.sin(Date.now() * 0.001 + particle.id) * 20),
                      ],
                  y: stage === "transition"
                    ? [
                        Math.sin(particle.angle) * 100,
                        Math.sin(particle.angle) * 150,
                        Math.sin(particle.angle) * 1200,
                      ]
                    : stage === "release"
                    ? [
                        Math.sin(particle.angle) * 100,
                        Math.sin(particle.angle) * 150,
                        Math.sin(particle.angle) * 600,
                      ]
                    : [
                        Math.sin(particle.angle) * 100,
                        Math.sin(particle.angle) * (120 + Math.cos(Date.now() * 0.001 + particle.id) * 20),
                      ],
                  opacity: stage === "transition" || stage === "release" ? [0.8, 0.8, 0] : [0, 0.8, 0.8],
                  scale: stage === "transition" || stage === "release" ? [1, 1, 0] : [0, 1, 1],
                }}
                transition={{
                  duration: stage === "transition" ? 1 : stage === "release" ? 1.5 : 3,
                  repeat: stage === "release" || stage === "transition" ? 0 : Infinity,
                  ease: "easeOut",
                  delay: particle.id * 0.01,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Energy spiral trails */}
      <AnimatePresence>
        {(stage === "purple" || stage === "release" || stage === "transition") && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`spiral-${i}`}
                style={{
                  position: "absolute",
                  width: 150 + i * 30,
                  height: 150 + i * 30,
                  borderRadius: "50%",
                  border: `1px solid rgba(139,92,246,${0.3 - i * 0.05})`,
                  borderTopColor: "transparent",
                  borderRightColor: "transparent",
                  filter: "blur(1px)",
                }}
                animate={{
                  rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                  scale: stage === "transition" ? [1, 5] : stage === "release" ? [1, 2] : [1, 1.1, 1],
                  opacity: stage === "transition" || stage === "release" ? [0.6, 0] : [0.6, 0.4, 0.6],
                }}
                transition={{
                  rotate: { duration: 2 - i * 0.2, repeat: Infinity, ease: "linear" },
                  scale: { duration: stage === "transition" ? 1 : stage === "release" ? 1.5 : 2, ease: "easeOut" },
                  opacity: { duration: stage === "transition" ? 1 : stage === "release" ? 1.5 : 2 },
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Shockwave on release */}
      <AnimatePresence>
        {(stage === "release" || stage === "transition") && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`shockwave-${i}`}
                style={{
                  position: "absolute",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  border: "3px solid rgba(139,92,246,0.8)",
                  filter: "blur(2px)",
                }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: stage === "transition" ? 15 : 8,
                  opacity: 0,
                }}
                transition={{
                  duration: stage === "transition" ? 1 : 1.5,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Flash effect on merge and release */}
      <AnimatePresence>
        {(stage === "merge" || stage === "release" || stage === "transition") && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: stage === "transition"
                ? "radial-gradient(circle, rgba(139,92,246,0.8) 0%, transparent 30%)"
                : stage === "merge" 
                ? "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 50%)"
                : "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 40%)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: stage === "transition" ? 1 : stage === "merge" ? 0.5 : 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Bottom text overlay */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'SF Pro Display', '-apple-system', sans-serif",
          fontSize: 14,
          fontWeight: 300,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          textAlign: "center",
        }}
        animate={{
          opacity: stage === "release" || stage === "transition" ? [1, 0] : [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: stage === "release" || stage === "transition" ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        {stage === "initial" && "虚式「茈」"}
        {stage === "merge" && "Convergence..."}
        {stage === "purple" && "Hollow Purple"}
        {(stage === "release" || stage === "transition") && ""}
      </motion.div>
    </div>
  );
}

// Future Projects Page Component
function FutureProjectsPage() {
  const [projects] = useState([
    {
      id: 1,
      title: "Designing a Website Portfolio",
      description: "Helping a friend build their portfolio website with React and UX design. Focusing on clean UI, smooth animations, and mobile-first approach.",
      status: "In Progress",
      color: "rgba(236,72,153,0.15)",
      borderColor: "rgba(236,72,153,0.3)",
    },
    {
      id: 2,
      title: "Project Slot 2",
      description: "Coming soon...",
      status: "Planned",
      color: "rgba(139,92,246,0.15)",
      borderColor: "rgba(139,92,246,0.3)",
    },
    {
      id: 3,
      title: "Project Slot 3",
      description: "Coming soon...",
      status: "Planned",
      color: "rgba(6,182,212,0.15)",
      borderColor: "rgba(6,182,212,0.3)",
    },
    {
      id: 4,
      title: "Project Slot 4",
      description: "Coming soon...",
      status: "Planned",
      color: "rgba(99,130,255,0.15)",
      borderColor: "rgba(99,130,255,0.3)",
    },
  ]);

  return (
    <motion.div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        background: "transparent",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-10 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1
              className="text-5xl mb-4"
              style={{
                fontWeight: 600,
                background: "linear-gradient(135deg, rgba(196,181,253,1) 0%, rgba(139,92,246,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Future Endeavors
            </h1>
            <p
              className="text-white/50 text-lg"
              style={{
                fontWeight: 300,
                letterSpacing: "0.02em",
              }}
            >
              Upcoming projects and innovations in development
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${project.borderColor}`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                {/* Project Number Badge */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{
                    background: project.color,
                    border: `1px solid ${project.borderColor}`,
                  }}
                >
                  <span
                    className="text-white/80"
                    style={{
                      fontFamily: "'SF Mono', 'Menlo', monospace",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    {String(project.id).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl mb-3 text-white/85 group-hover:text-white/95 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="text-white/40 mb-6 leading-relaxed"
                  style={{ fontWeight: 300, fontSize: 15 }}
                >
                  {project.description}
                </p>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "rgba(139,92,246,0.6)",
                      boxShadow: "0 0 8px rgba(139,92,246,0.6)",
                    }}
                  />
                  <span
                    className="text-xs uppercase tracking-widest text-white/40"
                    style={{ fontWeight: 500 }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${project.color.replace("0.15", "0.08")} 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="mb-4">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(139,92,246,0.6)"
                strokeWidth="1.5"
                className="mx-auto"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3
              className="text-xl mb-2 text-white/70"
              style={{ fontWeight: 400 }}
            >
              More Coming Soon
            </h3>
            <p
              className="text-white/40 text-sm"
              style={{ fontWeight: 300 }}
            >
              Stay tuned for exciting new projects and innovations
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
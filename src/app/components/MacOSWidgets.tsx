import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pause, Play, SkipForward, SkipBack } from "lucide-react";

import artTSU from "figma:asset/57d209f4f8dbfdb048de1ef159dd826c342a24d2.png";
import artHOWGH from "figma:asset/4caebdcc906173625dd5d3ec324d0f69b99fd091.png";
import artScorpion from "figma:asset/4f79341953d4dd4b0405c7dc727daca9bab09118.png";

// ─── Drake tracks ──────────────────────────────────────────────────────────
const TRACKS = [
  {
    id: 0,
    title: "TSU",
    album: "Care Package",
    year: "2019",
    duration: 214,
    art: artTSU,
    accent: "#E8A045",
  },
  {
    id: 1,
    title: "Hold On, We're Going Home",
    album: "Nothing Was The Same",
    year: "2013",
    duration: 218,
    art: artHOWGH,
    accent: "#5BA8D5",
  },
  {
    id: 2,
    title: "Diplomatic Immunity",
    album: "Scorpion",
    year: "2018",
    duration: 242,
    art: artScorpion,
    accent: "#AAAAAA",
  },
];

// Shared glass style
const glass = {
  backdropFilter: "blur(40px) saturate(1.9) brightness(1.1)",
  WebkitBackdropFilter: "blur(40px) saturate(1.9) brightness(1.1)",
} as const;

// ─── Scrolling marquee for long titles ────────────────────────────────────
function Marquee({ text, active }: { text: string; active: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setOverflow(ref.current.scrollWidth > ref.current.parentElement!.clientWidth + 2);
    }
  }, [text]);

  return (
    <div style={{ overflow: "hidden", position: "relative", maxWidth: "100%" }}>
      <motion.span
        ref={ref}
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-sf-text)",
          fontSize: 11,
          fontWeight: 500,
          color: "rgba(255,255,255,0.9)",
          WebkitFontSmoothing: "antialiased",
        }}
        animate={
          active && overflow
            ? {
                x: ["0%", "-55%", "-55%", "0%"],
              }
            : { x: "0%" }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.45, 0.9, 1],
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

// ─── Music Widget ─────────────────────────────────────────────────────────
function MusicWidget() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = TRACKS[trackIdx];

  // Tick the progress forward while playing
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= track.duration) {
            nextTrack();
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, trackIdx]);

  const nextTrack = () => {
    setTrackIdx((i) => (i + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const pct = Math.min((progress / track.duration) * 100, 100);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="w-44 rounded-2xl overflow-hidden cursor-default mobile-widget"
      style={{
        background: "rgba(8,8,18,0.72)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow:
          "0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
        ...glass,
      }}
    >
      {/* Album art strip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={track.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.35 }}
          className="mobile-music-widget-art"
          style={{
            height: 110,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            padding: "8px 10px",
          }}
        >
          {/* Actual album art photo */}
          <img
            src={track.art}
            alt={track.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Bottom gradient scrim */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.55) 100%)",
            }}
          />
          {/* Spotify badge */}
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 10,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#1DB954",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
              <path d="M3 5.5 C6 4 10 4 13 5.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M3.5 8 C6.2 6.8 9.8 6.8 12.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 10.5 C6.3 9.5 9.7 9.5 12 10.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          {/* Track label overlay */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: "100%" }}>
            <div
              style={{
                fontFamily: "var(--font-sf-text)",
                fontSize: 10,
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.05em",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              Drake · {track.year}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Info + controls */}
      <div style={{ padding: "10px 12px 12px" }}>
        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={track.id + "-title"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            style={{ marginBottom: 1 }}
          >
            <Marquee text={track.title} active={playing} />
          </motion.div>
        </AnimatePresence>

        {/* Album */}
        <div
          style={{
            fontFamily: "var(--font-sf-text)",
            fontSize: 10,
            fontWeight: 300,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.01em",
            WebkitFontSmoothing: "antialiased",
            marginBottom: 10,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {track.album}
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 3,
            borderRadius: 2,
            background: "rgba(255,255,255,0.08)",
            marginBottom: 5,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              borderRadius: 2,
              background: track.accent,
              width: `${pct}%`,
            }}
            transition={{ ease: "linear", duration: 1 }}
          />
        </div>

        {/* Time stamps */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          {[fmt(progress), fmt(track.duration)].map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-sf-text)",
                fontSize: 9,
                fontWeight: 400,
                color: "rgba(255,255,255,0.28)",
                WebkitFontSmoothing: "antialiased",
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <button
            onClick={prevTrack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
              color: "rgba(255,255,255,0.45)",
              display: "flex",
              alignItems: "center",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")
            }
          >
            <SkipBack size={13} fill="currentColor" />
          </button>

          <button
            onClick={() => setPlaying((p) => !p)}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s, transform 0.1s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.92)")
            }
          >
            {playing ? (
              <Pause size={13} fill="#111" color="#111" />
            ) : (
              <Play size={13} fill="#111" color="#111" style={{ marginLeft: 1 }} />
            )}
          </button>

          <button
            onClick={nextTrack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
              color: "rgba(255,255,255,0.45)",
              display: "flex",
              alignItems: "center",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")
            }
          >
            <SkipForward size={13} fill="currentColor" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────
export function MacOSWidgets() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const monthDay  = date.getDate();
  const monthName = date.toLocaleDateString("en-US", { month: "short" });
  const dayName   = date.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.45, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-12 left-4 pt-3 flex flex-col gap-3 mobile-widgets-container"
      /* ↓ z-10 ensures any open window (z-20+) always sits on top */
      style={{ zIndex: 10 }}
    >
      {/* ── Calendar ─────────────────────────────────────────────────── */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="w-44 rounded-2xl overflow-hidden cursor-pointer mobile-widget"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
          ...glass,
        }}
      >
        {/* Month header */}
        <div
          style={{
            background: "linear-gradient(135deg, #FF3B30 0%, #FF6B35 100%)",
            textAlign: "center",
            padding: "5px 0",
            fontFamily: "var(--font-sf-text)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {monthName}
        </div>
        <div style={{ padding: "10px 12px 14px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-sf-text)",
              fontSize: 11,
              fontWeight: 300,
              color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.01em",
              marginBottom: 4,
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {dayName}
          </div>
          <div
            className="mobile-calendar-day"
            style={{
              fontFamily: "var(--font-sf)",
              fontSize: 52,
              fontWeight: 100,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#fff",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {monthDay}
          </div>
        </div>
      </motion.div>

      {/* ── Music ─────────────────────────────────────────────────────── */}
      <MusicWidget />

      {/* ── Status / open-to-work ─────────────────────────────────────── */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="w-44 rounded-2xl p-3 cursor-pointer mobile-widget mobile-status-widget"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,59,48,0.14) 0%, rgba(200,30,20,0.10) 100%)",
          border: "1px solid rgba(255,59,48,0.20)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,59,48,0.08), inset 0 1px 0 rgba(255,255,255,0.07)",
          ...glass,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#ff3b30",
              boxShadow: "0 0 6px rgba(255,59,48,0.9)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-sf-text)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            Status
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-sf-text)",
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(255,255,255,0.85)",
            WebkitFontSmoothing: "antialiased",
            marginBottom: 3,
          }}
        >
          DND Warrior
        </div>
        <div
          style={{
            fontFamily: "var(--font-sf-text)",
            fontSize: 11,
            fontWeight: 300,
            color: "rgba(255,59,48,0.45)",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          Do not disturb
        </div>
      </motion.div>
    </motion.div>
  );
}
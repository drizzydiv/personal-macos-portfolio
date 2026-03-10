import { useRef, useEffect, useState, useCallback } from "react";

import cityStreetImg from "figma:asset/3139bfbcf0c943e79ef3da3933e452a293d57e83.png";
import ferrisWheelImg from "figma:asset/011e37a791062acdaaddcc3ddc6849b5fd779b29.png";
import artTSU from "figma:asset/57d209f4f8dbfdb048de1ef159dd826c342a24d2.png";
import artHOWGH from "figma:asset/4caebdcc906173625dd5d3ec324d0f69b99fd091.png";
import artScorpion from "figma:asset/4f79341953d4dd4b0405c7dc727daca9bab09118.png";
import b2bLogo from "figma:asset/536bb5d473c4166ce9d976faad03a690d1a04b6e.png";
import waqtLogo from "figma:asset/6620e57ee81a3e392c9a46543d39a8b6bd6ed303.png";
import waqtMockup from "figma:asset/f61776162bee040f01395e63998079a061059dd3.png";
import divikPhoto from "figma:asset/379ca8bfc8468eebc5bbd62cb2addac376adeb26.png";

const PHOTOS = [
  { src: ferrisWheelImg, label: "Ferris Wheel" },
  { src: cityStreetImg,  label: "City Aerial" },
  { src: divikPhoto,     label: "Divik Srivastava" },
  { src: waqtMockup,     label: "Waqt — Mockup" },
  { src: waqtLogo,       label: "Waqt" },
  { src: b2bLogo,        label: "broke2broker" },
  { src: artTSU,         label: "TSU" },
  { src: artHOWGH,       label: "How Great — Album Art" },
  { src: artScorpion,    label: "Scorpion — Album Art" },
];

// Film sprocket holes strip
function SprocketStrip({ count }: { count: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        padding: "0 20px",
        height: 28,
        background: "transparent",
        flexShrink: 0,
        minWidth: "100%",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 16,
            height: 12,
            borderRadius: 3,
            background: "#000",
            border: "1.5px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

export function FilmRollPhotos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollXRef = useRef(0);
  const targetScrollRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef<number>(0);
  const mousePosRef = useRef(0.5); // 0 = left edge, 1 = right edge
  const isHoveringRef = useRef(false);

  const [blur, setBlur] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Animate scroll loop
  const animate = useCallback(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) { rafRef.current = requestAnimationFrame(animate); return; }

    const maxScroll = track.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) { rafRef.current = requestAnimationFrame(animate); return; }

    if (isHoveringRef.current) {
      // Cursor position: 0.5 = dead center = no scroll, edges = max speed
      const deadZone = 0.12;
      const pos = mousePosRef.current;
      let speed = 0;
      if (pos < 0.5 - deadZone) {
        // scroll left
        speed = -((0.5 - deadZone - pos) / (0.5 - deadZone)) * 28;
      } else if (pos > 0.5 + deadZone) {
        // scroll right
        speed = ((pos - 0.5 - deadZone) / (0.5 - deadZone)) * 28;
      }
      velRef.current += (speed - velRef.current) * 0.14;
    } else {
      // No hover — gently coast to stop
      velRef.current *= 0.9;
    }

    scrollXRef.current = Math.max(0, Math.min(maxScroll, scrollXRef.current + velRef.current));
    track.style.transform = `translateX(${-scrollXRef.current}px)`;

    const absVel = Math.abs(velRef.current);
    setBlur(Math.min(absVel * 1.4, 10));

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosRef.current = (e.clientX - rect.left) / rect.width;
  };

  // Sprocket count — just enough to fill generously
  const sprocketCount = 40;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => { isHoveringRef.current = true; }}
      onMouseLeave={() => { isHoveringRef.current = false; velRef.current *= 0.3; setBlur(0); setHoveredIdx(null); }}
      onMouseMove={handleMouseMove}
      style={{
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        overflow: "hidden",
        position: "relative",
        cursor: "ew-resize",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Film grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 10,
          mixBlendMode: "overlay",
        }}
      />

      {/* Left / right edge vignette (also hints scroll direction) */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 9,
        background: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.6) 100%)",
      }} />

      {/* Scrolling film strip */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "max-content",
          willChange: "transform",
          filter: blur > 0.3 ? `blur(${blur * 0.18}px)` : "none",
          transition: "filter 0.05s linear",
        }}
      >
        {/* Top sprocket row */}
        <div style={{
          background: "#111",
          borderBottom: "2px solid #222",
          paddingTop: 4,
          paddingBottom: 4,
        }}>
          <SprocketStrip count={sprocketCount} />
        </div>

        {/* Photo frames row */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "#111",
            padding: "8px 20px",
          }}
        >
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: "relative",
                width: 240,
                height: 300,
                flexShrink: 0,
                overflow: "hidden",
                border: "2px solid #222",
                background: "#0d0d0d",
                transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease",
                transform: hoveredIdx === i ? "scale(1.04) translateY(-6px)" : "scale(1)",
                boxShadow: hoveredIdx === i
                  ? "0 20px 60px rgba(0,0,0,0.85), 0 0 0 1.5px rgba(255,255,255,0.12)"
                  : "0 4px 16px rgba(0,0,0,0.6)",
                cursor: "pointer",
              }}
            >
              {/* Photo */}
              <img
                src={photo.src}
                alt={photo.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "filter 0.3s ease",
                  filter: hoveredIdx === i ? "brightness(1.05) saturate(1.1)" : "brightness(0.88) saturate(0.9)",
                }}
                draggable={false}
              />

              {/* Bottom label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "20px 10px 8px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
                  opacity: hoveredIdx === i ? 1 : 0,
                  transition: "opacity 0.2s ease",
                }}
              >
                <div style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  {photo.label}
                </div>
              </div>

              {/* Frame number */}
              <div style={{
                position: "absolute",
                top: 6,
                right: 8,
                fontFamily: "'SF Mono', monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.05em",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom sprocket row */}
        <div style={{
          background: "#111",
          borderTop: "2px solid #222",
          paddingTop: 4,
          paddingBottom: 4,
        }}>
          <SprocketStrip count={sprocketCount} />
        </div>
      </div>

      {/* Bottom hint */}
      <div style={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'SF Pro Display', sans-serif",
        fontSize: 11,
        color: "rgba(255,255,255,0.18)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        pointerEvents: "none",
        zIndex: 11,
        whiteSpace: "nowrap",
      }}>
        move cursor left or right to scroll
      </div>
    </div>
  );
}
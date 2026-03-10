import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface MacOSWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  zIndex?: number;
}

export function MacOSWindow({
  title,
  children,
  onClose,
  zIndex = 10,
}: MacOSWindowProps) {
  const [controlsHovered, setControlsHovered] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ scale: 0.94, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.94, opacity: 0, y: 12 }}
      transition={{ type: "tween", duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed flex flex-col overflow-hidden mobile-window"
      style={{
        inset: "40px 70px 88px 70px",
        zIndex,
        borderRadius: 16,
        background: "rgba(10,10,20,0.82)",
        backdropFilter: "blur(48px) saturate(1.8)",
        WebkitBackdropFilter: "blur(48px) saturate(1.8)",
        border: "1px solid rgba(255,255,255,0.12)",
        willChange: "transform, opacity",
        boxShadow: [
          "0 40px 100px rgba(0,0,0,0.65)",
          "0 0 0 0.5px rgba(255,255,255,0.06) inset",
          "0 1px 0 rgba(255,255,255,0.14) inset",
        ].join(", "),
      }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-between relative select-none mobile-window-titlebar"
        style={{
          height: 48,
          paddingLeft: 16,
          paddingRight: 16,
          background: "rgba(255,255,255,0.035)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="flex items-center gap-2"
          onMouseEnter={() => setControlsHovered(true)}
          onMouseLeave={() => setControlsHovered(false)}
        >
          <button
            onClick={onClose}
            aria-label="Close window"
            className="mobile-window-traffic-light"
            style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "#ff5f57",
              border: "0.5px solid rgba(0,0,0,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, padding: 0,
              outline: "8px solid transparent",
              transition: "filter 0.12s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.15)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "none")}
          >
            <svg width="7" height="7" viewBox="0 0 8 8" fill="none" style={{ opacity: controlsHovered ? 1 : 0, transition: "opacity 0.1s" }}>
              <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="#5a0000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <button
            onClick={onClose}
            aria-label="Close window"
            className="mobile-window-traffic-light"
            style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "#febc2e",
              border: "0.5px solid rgba(0,0,0,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, padding: 0,
              outline: "8px solid transparent",
              transition: "filter 0.12s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.15)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "none")}
          >
            <svg width="8" height="2" viewBox="0 0 8 2" fill="none" style={{ opacity: controlsHovered ? 1 : 0, transition: "opacity 0.1s" }}>
              <path d="M1 1H7" stroke="#7a5000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <button
            onClick={onClose}
            aria-label="Close window"
            className="mobile-window-traffic-light"
            style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "#28c840",
              border: "0.5px solid rgba(0,0,0,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, padding: 0,
              outline: "8px solid transparent",
              transition: "filter 0.12s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.15)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "none")}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ opacity: controlsHovered ? 1 : 0, transition: "opacity 0.1s" }}>
              <path d="M1.5 6.5L6.5 1.5M4.5 1.5H6.5V3.5" stroke="#054005" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="mobile-window-title"
            style={{
              fontFamily: "var(--font-sf-text)",
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.01em",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {title}
          </span>
        </div>

        <div
          style={{
            fontFamily: "var(--font-sf-text)",
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.03em",
            userSelect: "none",
          }}
        >
          esc
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.08) transparent",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

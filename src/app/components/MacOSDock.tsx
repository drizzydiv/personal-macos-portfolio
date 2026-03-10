import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  FinderIcon,
  SafariIcon,
  VSCodeIcon,
  SpotifyIcon,
  GitHubIcon,
  InstagramIcon,
  MailIcon,
  TerminalIcon,
  PhotosIcon,
} from "./DockIcons";

interface DockApp {
  id: string;
  icon: React.ReactNode;
  label: string;
  action?: "open" | "link";
  href?: string;
}

interface MacOSDockProps {
  onOpenApp: (appId: string) => void;
}

// ─── Single icon that computes its own scale from shared mouseX ────────────
function DockIcon({
  app,
  mouseX,
  onActivate,
}: {
  app: DockApp;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  // Distance from mouse to center of this icon
  const distance = useTransform(mouseX, (mx) => {
    const el = ref.current;
    if (!el) return 0;
    const { left, width } = el.getBoundingClientRect();
    return mx - (left + width / 2);
  });

  // Map distance → raw scale / y
  const scaleRaw = useTransform(distance, [-140, 0, 140], [1, 1.6, 1], {
    clamp: true,
  });
  const yRaw = useTransform(distance, [-120, 0, 120], [0, -20, 0], {
    clamp: true,
  });

  // Smooth spring over the raw values — stiff + light so it feels instant
  const SPRING = { stiffness: 600, damping: 34, mass: 0.5 };
  const scale = useSpring(scaleRaw, SPRING);
  const y = useSpring(yRaw, SPRING);

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ flexShrink: 0 }}
    >
      {/* Tooltip */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 5,
          scale: hovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{ bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", zIndex: 99 }}
      >
        <div
          style={{
            padding: "4px 11px",
            borderRadius: 8,
            background: "rgba(14,14,22,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.55)",
            color: "rgba(255,255,255,0.9)",
            fontSize: 12,
            fontFamily: "var(--font-sf-text)",
            fontWeight: 400,
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
          }}
        >
          {app.label}
        </div>
        {/* Caret */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            bottom: -4,
            width: 7,
            height: 7,
            background: "rgba(14,14,22,0.92)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      </motion.div>

      {/* Icon */}
      <motion.button
        ref={ref}
        className="mobile-dock-icon"
        style={{
          scale,
          y,
          transformOrigin: "bottom center",
          width: 56,
          height: 56,
          borderRadius: 14,
          overflow: "hidden",
          border: "none",
          padding: 0,
          cursor: "pointer",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform",
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={onActivate}
        whileTap={{ scale: 0.88 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {app.icon}
      </motion.button>
    </div>
  );
}

// ─── Separator ─────────────────────────────────────────────────────────────
function DockSeparator() {
  return (
    <div
      style={{
        width: 1,
        height: 40,
        background: "rgba(255,255,255,0.14)",
        borderRadius: 1,
        alignSelf: "center",
        flexShrink: 0,
        margin: "0 2px",
      }}
    />
  );
}

// ─── Dock ──────────────────────────────────────────────────────────────────
export function MacOSDock({ onOpenApp }: MacOSDockProps) {
  // Shared motion value for mouse X — updated on mousemove, no React state
  const mouseX = useMotionValue(Infinity);

  const leftApps: DockApp[] = [
    { id: "finder",   icon: <FinderIcon />,   label: "Finder",   action: "open" },
    { id: "safari",   icon: <SafariIcon />,   label: "Safari",   action: "open" },
    { id: "mail",     icon: <MailIcon />,     label: "Mail",     action: "open" },
    { id: "terminal", icon: <TerminalIcon />, label: "Terminal", action: "open" },
  ];

  const rightApps: DockApp[] = [
    { id: "photos",    icon: <PhotosIcon />,    label: "Photos",    action: "open" },
    { id: "spotify",   icon: <SpotifyIcon />,   label: "Spotify",   action: "link", href: "https://open.spotify.com/user/313jjc6tgy4xgbzdd4uzudy6d7yu?si=QbKpXXUeRTCfGkEo2qvIzw" },
    { id: "github",    icon: <GitHubIcon />,    label: "GitHub",    action: "link", href: "https://github.com" },
    { id: "instagram", icon: <InstagramIcon />, label: "Instagram", action: "link", href: "https://www.instagram.com/clippedby.div/" },
  ];

  const handleActivate = (app: DockApp) => {
    if (app.action === "link" && app.href) {
      window.open(app.href, "_blank", "noopener,noreferrer");
    } else {
      onOpenApp(app.id);
    }
  };

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 26 }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 mobile-dock-container"
      style={{ willChange: "transform" }}
    >
      {/* Glass tray — mouse tracking happens here */}
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mobile-dock-tray"
        style={{
          padding: "8px 12px",
          borderRadius: 22,
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(48px) saturate(1.9) brightness(1.15)",
          WebkitBackdropFilter: "blur(48px) saturate(1.9) brightness(1.15)",
          border: "1px solid rgba(255,255,255,0.20)",
          boxShadow: [
            "0 12px 48px rgba(0,0,0,0.5)",
            "inset 0 1.5px 0 rgba(255,255,255,0.22)",
            "inset 0 -1px 0 rgba(0,0,0,0.2)",
          ].join(", "),
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        {leftApps.map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            mouseX={mouseX}
            onActivate={() => handleActivate(app)}
          />
        ))}

        <DockSeparator />

        {rightApps.map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            mouseX={mouseX}
            onActivate={() => handleActivate(app)}
          />
        ))}
      </div>
    </motion.div>
  );
}
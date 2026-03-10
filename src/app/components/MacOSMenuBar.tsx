import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Wifi, Volume2, Battery, Search } from "lucide-react";

export function MacOSMenuBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateStr = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 h-7 z-50 flex items-center justify-between px-4 mobile-menu-bar"
      style={{
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(40px) saturate(1.5)",
        WebkitBackdropFilter: "blur(40px) saturate(1.5)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 0 rgba(0,0,0,0.2)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-1">
        <button
          className="text-white/90 px-2 py-0.5 rounded text-sm transition-all hover:bg-white/10 mobile-menu-item"
          style={{ fontWeight: 600 }}
        >
          ⌘
        </button>
        {["Finder", "File", "Edit", "View", "Go", "Window"].map((item) => (
          <button
            key={item}
            className="text-white/80 px-2 py-0.5 rounded text-xs transition-all hover:bg-white/10 mobile-menu-item mobile-menu-hide"
            style={{ fontWeight: 400 }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 text-white/80">
        {[
          { icon: <Battery size={14} />, key: "battery" },
          { icon: <Wifi size={14} />, key: "wifi" },
          { icon: <Volume2 size={14} />, key: "volume" },
          { icon: <Search size={14} />, key: "search" },
        ].map((item) => (
          <button
            key={item.key}
            className="p-1 rounded transition-all hover:bg-white/10 mobile-menu-hide"
          >
            {item.icon}
          </button>
        ))}
        <div
          className="px-2 py-0.5 rounded text-xs cursor-default transition-all hover:bg-white/10 text-white/80 mobile-menu-time"
          style={{ fontWeight: 400 }}
        >
          {dateStr} &nbsp; {timeStr}
        </div>
      </div>
    </motion.div>
  );
}
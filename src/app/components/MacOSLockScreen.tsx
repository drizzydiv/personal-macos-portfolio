import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface MacOSLockScreenProps {
  onUnlock: () => void;
}

const VIDEO_SOURCES = [
  "https://assets.mixkit.co/videos/preview/mixkit-ocean-waves-breaking-on-beach-4913-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-1164-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-sea-waves-splashing-on-the-shore-1911-large.mp4",
  "https://cdn.coverr.co/videos/coverr-ocean-blue-waves-4898/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-sea-waves-on-rocks-during-daytime-4882/1080p.mp4",
  "https://www.videvo.net/videvo_files/converted/2013_08/preview/hd0992.mp429878.mp4",
];

function OceanCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawWave = (
      yBase: number, amp: number, freq: number,
      speed: number, phase: number, color: string, shadowColor: string,
    ) => {
      const W = canvas.width, H = canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 2) {
        const nx = x / W;
        const y =
          yBase +
          Math.sin(nx * freq * Math.PI * 2 + t * speed + phase) * amp +
          Math.sin(nx * freq * 0.7 * Math.PI * 2 + t * speed * 1.3 + phase + 1.2) * amp * 0.4 +
          Math.sin(nx * freq * 1.4 * Math.PI * 2 + t * speed * 0.7 + phase + 2.4) * amp * 0.25;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, yBase - amp * 2, 0, yBase + amp * 2);
      grad.addColorStop(0, shadowColor);
      grad.addColorStop(1, color);
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      t += 0.008;

      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0,    "#020c18");
      sky.addColorStop(0.35, "#041428");
      sky.addColorStop(0.55, "#071d35");
      sky.addColorStop(0.72, "#0a2340");
      sky.addColorStop(1,    "#0d2b4e");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      drawWave(H * 0.52, H * 0.022, 2.2, 0.9, 0,   "rgba(12,40,78,0.85)",  "rgba(6,22,48,0.5)");
      drawWave(H * 0.58, H * 0.026, 1.8, 1.1, 0.8, "rgba(15,50,92,0.88)",  "rgba(8,28,58,0.5)");
      drawWave(H * 0.63, H * 0.030, 2.5, 1.3, 1.6, "rgba(18,58,105,0.90)", "rgba(10,32,66,0.55)");
      drawWave(H * 0.68, H * 0.035, 1.6, 1.5, 2.4, "rgba(20,64,115,0.92)", "rgba(12,36,72,0.55)");
      drawWave(H * 0.74, H * 0.040, 2.0, 1.7, 3.2, "rgba(22,70,125,0.93)", "rgba(14,40,80,0.60)");
      drawWave(H * 0.80, H * 0.044, 1.4, 2.0, 4.0, "rgba(24,76,135,0.95)", "rgba(15,44,86,0.62)");

      const fgY = H * 0.855, fgAmp = H * 0.048;
      drawWave(fgY, fgAmp, 1.2, 2.2, 5.0, "rgba(28,86,150,0.97)", "rgba(18,52,98,0.65)");

      ctx.globalAlpha = 0.18 + 0.10 * Math.sin(t * 2.5);
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const nx = x / W;
        const y =
          fgY +
          Math.sin(nx * 1.2 * Math.PI * 2 + t * 2.2 + 5.0) * fgAmp +
          Math.sin(nx * 0.84 * Math.PI * 2 + t * 2.86 + 6.2) * fgAmp * 0.4 +
          Math.sin(nx * 1.68 * Math.PI * 2 + t * 1.54 + 7.4) * fgAmp * 0.25;
        x === 0 ? ctx.moveTo(x, y - fgAmp * 0.15) : ctx.lineTo(x, y - fgAmp * 0.15);
      }
      const foamGrad = ctx.createLinearGradient(0, fgY - fgAmp, 0, fgY + fgAmp * 0.5);
      foamGrad.addColorStop(0,   "rgba(200,230,255,0.55)");
      foamGrad.addColorStop(0.3, "rgba(160,210,255,0.18)");
      foamGrad.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.strokeStyle = foamGrad;
      ctx.lineWidth = 2 * window.devicePixelRatio;
      ctx.stroke();
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}

export function MacOSLockScreen({ onUnlock }: MacOSLockScreenProps) {
  const [time, setTime]             = useState(new Date());
  const [clicked, setClicked]       = useState(false);
  const [pulse, setPulse]           = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [srcIndex, setSrcIndex]     = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 900);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const tryPlay = () => vid.play().catch(() => {});
    tryPlay();
    document.addEventListener("click",      tryPlay, { once: true });
    document.addEventListener("touchstart", tryPlay, { once: true });
  }, [srcIndex]);

  const handleVideoReady = () => setVideoReady(true);
  const handleVideoError = () => {
    if (srcIndex < VIDEO_SOURCES.length - 1) {
      setSrcIndex(i => i + 1);
      setVideoReady(false);
    }
  };

  const h = time.getHours().toString().padStart(2, "0");
  const m = time.getMinutes().toString().padStart(2, "0");
  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(onUnlock, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 cursor-pointer select-none overflow-hidden"
      onClick={handleClick}
      style={{ background: "#020c18", willChange: "opacity" }}
    >
      <OceanCanvas />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 2.5 }}
      >
        <video
          key={srcIndex}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          onCanPlay={handleVideoReady}
          onLoadedData={handleVideoReady}
          onError={handleVideoError}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 60%",
          }}
          src={VIDEO_SOURCES[srcIndex]}
        />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(2,10,22,0.62) 0%, rgba(2,10,22,0.08) 30%, rgba(2,10,22,0.04) 58%, rgba(2,10,22,0.58) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(2,10,22,0.35) 0%, transparent 42%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 120% 90% at 50% 50%, transparent 28%, rgba(2,10,22,0.38) 100%)" }}
      />

      <motion.div
        animate={clicked ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 flex flex-col"
        style={{ willChange: "opacity" }}
      >
        <motion.div
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            paddingTop:    "clamp(36px, 6vh, 72px)",
            paddingLeft:   "clamp(44px, 5.5vw, 88px)",
            display:       "flex",
            flexDirection: "column",
            gap:           0,
          }}
        >
          <div
            style={{
              fontFamily:    '-apple-system, "SF Pro Text", BlinkMacSystemFont, system-ui, sans-serif',
              fontSize:      "clamp(15px, 1.5vw, 21px)",
              fontWeight:    400,
              letterSpacing: "0.01em",
              color:         "rgba(255,255,255,0.82)",
              WebkitFontSmoothing: "antialiased",
              textShadow:    "0 1px 16px rgba(0,0,0,0.8)",
              marginBottom:  "0.02em",
            }}
          >
            {dateStr}
          </div>

          <div
            style={{
              fontFamily:    '-apple-system, "SF Pro Display", BlinkMacSystemFont, "Helvetica Neue", system-ui, sans-serif',
              fontSize:      "clamp(110px, 17vw, 220px)",
              fontWeight:    200,
              letterSpacing: "-0.045em",
              lineHeight:    0.88,
              color:         "rgba(255,255,255,0.72)",
              WebkitFontSmoothing: "antialiased",
              fontFeatureSettings: '"tnum" 1',
              textShadow: [
                "0 2px 0 rgba(255,255,255,0.08)",
                "0 0 100px rgba(140,200,255,0.22)",
                "0 0 220px rgba(70,140,200,0.16)",
              ].join(", "),
            }}
          >
            {h}
            <span
              style={{
                display:    "inline-block",
                width:      "0.22em",
                textAlign:  "center",
                opacity:    time.getSeconds() % 2 === 0 ? 0.85 : 0.22,
                transition: "opacity 0.14s ease",
              }}
            >
              :
            </span>
            {m}
          </div>
        </motion.div>

        <div style={{ flex: 1 }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
          style={{ paddingBottom: "clamp(32px, 7vh, 64px)", gap: 14 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none">
              <path d="M2 11L11 2L20 11" stroke="rgba(255,255,255,0.32)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <motion.div
            animate={pulse ? { scale: [1, 1.035, 1], opacity: [0.75, 1, 0.75] } : {}}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            style={{
              background:           "rgba(255,255,255,0.07)",
              backdropFilter:       "blur(30px) saturate(1.8)",
              WebkitBackdropFilter: "blur(30px) saturate(1.8)",
              border:               "1px solid rgba(255,255,255,0.14)",
              borderRadius:         999,
              padding:              "8px 28px",
              boxShadow:            "0 2px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            <span
              style={{
                fontFamily:    '-apple-system, "SF Pro Text", system-ui, sans-serif',
                fontSize:      11,
                fontWeight:    400,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.42)",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              Click anywhere to unlock
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

import { useEffect, useRef } from "react";

export function AnimatedBackground({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const setSize = () => {
      canvas.width  = Math.floor(window.innerWidth  / 2);
      canvas.height = Math.floor(window.innerHeight / 2);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const atmo = [
      { ax: 0.75, ay: 0.10, rx: 0.28, ry: 0.20, phx: 0.0, phy: 1.2, T: 55_000, size: 0.90, c: [0, 210, 200], peak: 0.48 },
      { ax: 0.18, ay: 0.42, rx: 0.22, ry: 0.30, phx: 2.5, phy: 0.5, T: 72_000, size: 0.95, c: [100, 40, 230], peak: 0.42 },
      { ax: 0.50, ay: 0.85, rx: 0.25, ry: 0.18, phx: 1.8, phy: 4.8, T: 65_000, size: 0.85, c: [30, 80, 255], peak: 0.30 },
      { ax: 0.82, ay: 0.78, rx: 0.18, ry: 0.18, phx: 4.6, phy: 3.0, T: 60_000, size: 0.70, c: [200, 40, 130], peak: 0.32 },
    ];

    const aurora = [
      { ax: 0.60, ay: 0.22, rx: 0.35, ry: 0.14, phx: 0.8, phy: 2.1, T: 22_000, size: 0.52, c: [0, 240, 220], peak: 0.55 },
      { ax: 0.30, ay: 0.35, rx: 0.20, ry: 0.22, phx: 3.2, phy: 1.0, T: 28_000, size: 0.48, c: [130, 60, 255], peak: 0.50 },
      { ax: 0.50, ay: 0.18, rx: 0.30, ry: 0.10, phx: 1.4, phy: 3.8, T: 18_000, size: 0.38, c: [0, 200, 255], peak: 0.40 },
      { ax: 0.65, ay: 0.65, rx: 0.16, ry: 0.16, phx: 5.0, phy: 0.8, T: 32_000, size: 0.36, c: [255, 80, 160], peak: 0.35 },
      { ax: 0.48, ay: 0.08, rx: 0.22, ry: 0.08, phx: 2.0, phy: 5.5, T: 24_000, size: 0.30, c: [140, 180, 255], peak: 0.38 },
    ];

    let start: number | null = null;

    const drawBlob = (cx: number, cy: number, radius: number, r: number, g: number, b: number, peak: number) => {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0.00, `rgba(${r},${g},${b},${peak})`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},${peak * 0.45})`);
      grad.addColorStop(0.65, `rgba(${r},${g},${b},${peak * 0.12})`);
      grad.addColorStop(1.00, `rgba(${r},${g},${b},0)`);
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const draw = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;

      const W = canvas.width;
      const H = canvas.height;
      const S = Math.min(W, H);

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#060712";
      ctx.fillRect(0, 0, W, H);

      for (const b of atmo) {
        const t  = elapsed / b.T;
        const cx = (b.ax + Math.sin(2 * Math.PI * t + b.phx) * b.rx) * W;
        const cy = (b.ay + Math.cos(2 * Math.PI * t + b.phy) * b.ry) * H;
        drawBlob(cx, cy, S * b.size, b.c[0], b.c[1], b.c[2], b.peak);
      }

      for (const b of aurora) {
        const t  = elapsed / b.T;
        const cx = (b.ax + Math.sin(2 * Math.PI * t + b.phx) * b.rx) * W;
        const cy = (b.ay + Math.cos(2 * Math.PI * t + b.phy) * b.ry) * H;
        const breathe = 0.80 + 0.20 * Math.sin(2 * Math.PI * elapsed / (b.T * 0.6));
        drawBlob(cx, cy, S * b.size, b.c[0], b.c[1], b.c[2], b.peak * breathe);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "#060712" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          width:  "100%",
          height: "100%",
          filter: "blur(28px) saturate(1.3) brightness(0.95)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 130% 115% at 50% 45%, transparent 20%, rgba(4,5,16,0.50) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "30%",
          background: "linear-gradient(to top, rgba(4,5,16,0.45) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.028,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
      {children}
    </div>
  );
}

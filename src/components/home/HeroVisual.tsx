import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, ShieldCheck } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // High performance particles without shadowBlur
    const nodeCount = prefersReducedMotion ? 10 : 24;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      haloColor: string;
    }[] = [];

    const palette = [
      { fill: '#00D2B4', halo: 'rgba(0, 210, 180, 0.25)' },
      { fill: '#00F0FF', halo: 'rgba(0, 240, 255, 0.25)' },
      { fill: '#818CF8', halo: 'rgba(129, 140, 248, 0.25)' },
    ];

    for (let i = 0; i < nodeCount; i++) {
      const pColor = palette[i % palette.length];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1.5,
        color: pColor.fill,
        haloColor: pColor.halo,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulseTime += 0.018;

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 44;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          if (isHovering) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              p.x += dx * 0.012;
              p.y += dy * 0.012;
            }
          }
        }

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 210, 180, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Lightweight packet flow
            if (!prefersReducedMotion && (i + j) % 4 === 0) {
              const progress = (Math.sin(pulseTime * 2.2 + i) + 1) / 2;
              const px = p.x + (p2.x - p.x) * progress;
              const py = p.y + (p2.y - p.y) * progress;

              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = '#00F0FF';
              ctx.fill();
            }
          }
        }

        // Draw particle with outer halo ring (zero expensive blur)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = p.haloColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ transform: 'translateZ(0)' }}
      className="relative w-full h-[400px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl group will-change-transform"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-crosshair" />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,210,180,0.08),transparent_70%)] pointer-events-none" />

      {/* Floating System Badges */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-dark-900/90 border border-white/10 shadow-lg backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
          <span className="text-[11px] font-mono font-medium text-brand-300">
            SYSTEM MESH ACTIVE
          </span>
          <span className="text-[10px] text-slate-400 font-mono">P99: 14ms</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900/90 border border-white/10 shadow-lg backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-mono text-slate-300">Zero-Trust Secured</span>
        </div>
      </div>

      {/* Center Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
        <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-dashed border-brand-500/20 flex items-center justify-center p-4 animate-spin-slow">
          <div className="w-full h-full rounded-full border border-brand-accent/20 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-brand-500/10 border border-brand-500/40 backdrop-blur-xl flex items-center justify-center shadow-glow-md">
              <Cpu className="w-10 h-10 text-brand-400" />
            </div>
          </div>
        </div>

        <div className="mt-4 px-3.5 py-1.5 rounded-full bg-dark-900/95 border border-white/15 text-center shadow-xl">
          <div className="text-xs font-bold text-white tracking-wide">
            Dev Pride Neural Core
          </div>
          <div className="text-[10px] text-brand-400 font-mono">
            Orchestration & Scale Engine
          </div>
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-6 inset-x-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900/90 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 text-brand-accent" />
          <span>Throughput: <strong className="text-white">24.8k req/s</strong></span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900/90 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
          <Database className="w-3.5 h-3.5 text-brand-500" />
          <span>Vector Shards: <strong className="text-white">128 nodes</strong></span>
        </div>
      </div>
    </div>
  );
};

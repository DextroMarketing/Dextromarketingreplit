import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function DynamicBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(initialParticles);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle animation
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90"
        animate={{
          background: [
            "linear-gradient(45deg, #1e3a8a 0%, #1e40af 25%, #1e3a8a 50%, #1e40af 75%, #1e3a8a 100%)",
            "linear-gradient(45deg, #1e40af 0%, #1e3a8a 25%, #1e40af 50%, #1e3a8a 75%, #1e40af 100%)",
            "linear-gradient(45deg, #1e3a8a 0%, #1e40af 25%, #1e3a8a 50%, #1e40af 75%, #1e3a8a 100%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Static geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border-2 border-dxm-orange/20 rotate-45" />
      <div className="absolute bottom-40 right-32 w-24 h-24 bg-dxm-gold/8 rounded-full opacity-30" />
      <div className="absolute top-1/2 right-20 w-16 h-16 border border-dxm-orange/20" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Static particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-dxm-orange/8 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity * 0.3,
          }}
        />
      ))}

      {/* Interactive light effect following mouse */}
      <motion.div
        className="absolute w-96 h-96 bg-dxm-orange/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* Static diagonal lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-dxm-gold/10 to-transparent"
            style={{
              width: '150%',
              top: `${20 + i * 25}%`,
              left: '-25%',
              transform: 'rotate(-15deg)',
            }}
          />
        ))}
      </div>

      {/* Static corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-dxm-orange/3 to-transparent rounded-full blur-2xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-dxm-gold/3 to-transparent rounded-full blur-2xl opacity-20" />

      {/* Circuit-like connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.path
          d="M 0,50 Q 200,100 400,50 T 800,50"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M 100,200 Q 300,150 500,200 T 900,200"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: '#f97316', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: '#fbbf24', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#fbbf24', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
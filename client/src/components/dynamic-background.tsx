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

      {/* Animated geometric shapes - moved away from headline */}
      <motion.div 
        className="absolute bottom-32 left-16 w-32 h-32 border-2 border-red-500/20"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-24 h-24 bg-red-400/8 rounded-full opacity-30"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-16 w-16 h-16 border border-red-500/20"
        animate={{ 
          rotate: [0, -180, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Additional floating shapes - repositioned */}
      <motion.div 
        className="absolute bottom-2/3 left-12 w-20 h-20 border border-red-400/15 rounded-full"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="absolute top-3/4 left-24 w-12 h-12 bg-red-500/10 transform rotate-45"
        animate={{ 
          rotate: [45, 405],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

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

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-dxm-orange/8 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [particle.opacity * 0.2, particle.opacity * 0.8, particle.opacity * 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
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

      {/* Animated diagonal lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-dxm-gold/10 to-transparent"
            style={{
              width: '150%',
              top: `${20 + i * 25}%`,
              left: '-25%',
              transform: 'rotate(-15deg)',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleX: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Ripple effect waves - moved to bottom right */}
      <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-red-500/15 rounded-full"
            style={{
              left: '-4rem',
              top: '-4rem',
            }}
            animate={{
              scale: [1, 2 + i * 0.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Morphing blob shapes */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-40 h-40 bg-red-600/8 rounded-full blur-xl"
        animate={{
          scale: [1, 1.5, 0.8, 1.2, 1],
          x: [0, 50, -30, 20, 0],
          y: [0, -20, 40, -10, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-red-500/6 rounded-full blur-2xl"
        animate={{
          scale: [1, 0.7, 1.4, 0.9, 1],
          x: [0, -40, 60, -20, 0],
          y: [0, 30, -50, 20, 0],
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Constellation connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M ${50 + i * 150},${100 + i * 80} L ${200 + i * 100},${150 + i * 60} L ${350 + i * 80},${80 + i * 100}`}
            stroke="url(#starGradient)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,10"
            animate={{
              strokeDashoffset: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1,
            }}
          />
        ))}
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating wave particles - constrained to bottom half */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-red-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight * 0.6 + Math.random() * (window.innerHeight * 0.4),
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                window.innerHeight * 0.6 + Math.random() * (window.innerHeight * 0.4),
                window.innerHeight * 0.6 + Math.random() * (window.innerHeight * 0.4),
                window.innerHeight * 0.6 + Math.random() * (window.innerHeight * 0.4),
              ],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Hexagonal grid pattern - moved to bottom area */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 border border-red-400/8"
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              left: `${10 + i * 15}%`,
              top: `${65 + (i % 2) * 15}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}
      </div>



      {/* Floating geometric elements - moved away from headline */}
      <motion.div
        className="absolute top-4/5 right-12 w-8 h-8 border border-red-500/15"
        animate={{
          rotate: [0, 180, 360],
          y: [0, -25, 0],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
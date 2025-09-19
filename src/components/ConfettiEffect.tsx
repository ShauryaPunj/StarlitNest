import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface ConfettiEffectProps {
  active: boolean;
  duration?: number;
}

const ConfettiEffect = ({ active, duration = 3000 }: ConfettiEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const colors = ['#2563EB', '#8B5CF6', '#14B8A6', '#F43F5E', '#F59E0B'];

  const createParticle = (id: number): Particle => ({
    id,
    x: Math.random() * window.innerWidth,
    y: -10,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    life: 0,
    maxLife: Math.random() * 100 + 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 4 + 2
  });

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    let animationId: number;
    let particleId = 0;
    const startTime = Date.now();

    // Create initial particles
    const initialParticles = Array.from({ length: 20 }, () => createParticle(particleId++));
    setParticles(initialParticles);

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed > duration) {
        setParticles([]);
        return;
      }

      setParticles(prevParticles => {
        let newParticles = [...prevParticles];

        // Add new particles occasionally
        if (Math.random() < 0.1 && elapsed < duration * 0.7) {
          newParticles.push(createParticle(particleId++));
        }

        // Update existing particles
        newParticles = newParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // gravity
            life: particle.life + 1
          }))
          .filter(particle => 
            particle.life < particle.maxLife && 
            particle.y < window.innerHeight + 10 &&
            particle.x > -10 && 
            particle.x < window.innerWidth + 10
          );

        return newParticles;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [active, duration]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(particle => {
        const opacity = 1 - (particle.life / particle.maxLife);
        
        return (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              transform: `rotate(${particle.life * 10}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ConfettiEffect;
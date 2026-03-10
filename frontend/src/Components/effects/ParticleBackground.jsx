import { motion } from "framer-motion";

export default function ParticleBackground() {

  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            y: [null, -100],
            opacity: [0.2, 1, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity
          }}
        />
      ))}

    </div>
  );
}
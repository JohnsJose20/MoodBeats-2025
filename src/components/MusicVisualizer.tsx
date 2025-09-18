import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MusicVisualizer: React.FC = () => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    // Initialize bars with random heights
    setBars(Array.from({ length: 50 }, () => Math.random() * 100));

    // Animate bars continuously
    const interval = setInterval(() => {
      setBars(prevBars => 
        prevBars.map(() => Math.random() * 100)
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-1 opacity-10">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ 
              duration: 0.15,
              ease: "easeInOut"
            }}
            className="w-2 bg-gradient-to-t from-purple-400 via-blue-400 to-pink-400 rounded-t-sm min-h-[4px]"
            style={{
              maxHeight: '60vh'
            }}
          />
        ))}
      </div>
      
      {/* Additional ambient particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicVisualizer;
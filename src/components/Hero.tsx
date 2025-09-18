import React from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Heart } from 'lucide-react';

interface HeroProps {
  selectedMood: string;
}

const moodGradients = {
  excited: 'from-yellow-400 via-orange-500 to-red-500',
  calm: 'from-blue-400 via-teal-500 to-green-500',
  stressed: 'from-red-400 via-purple-500 to-pink-500',
  happy: 'from-pink-400 via-purple-500 to-indigo-500',
  sad: 'from-blue-600 via-indigo-700 to-purple-800',
  energetic: 'from-green-400 via-blue-500 to-purple-600',
};

const Hero: React.FC<HeroProps> = ({ selectedMood }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Dynamic Background Gradient */}
      <motion.div
        key={selectedMood}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className={`absolute inset-0 bg-gradient-to-br ${moodGradients[selectedMood] || moodGradients.excited}`}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {i % 3 === 0 ? <Music className="text-white/20 w-8 h-8" /> :
             i % 3 === 1 ? <Sparkles className="text-white/20 w-6 h-6" /> :
             <Heart className="text-white/20 w-7 h-7" />}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-5xl">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            >
              <Music className="w-12 h-12" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              MoodBeats
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl mb-8 font-light text-blue-100"
          >
            Turn your emotions into music instantly
          </motion.p>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed"
          >
            Experience AI-powered music curation that understands your feelings
            and delivers the perfect soundtrack to your life
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try the Demo
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
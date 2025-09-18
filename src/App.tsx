
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Sparkles } from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';
import MusicVisualizer from './components/MusicVisualizer';

function App() {
  const [selectedMood, setSelectedMood] = useState('happy');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      <MusicVisualizer />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-6 mb-6 relative z-10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mr-3"
            >
              <Music className="w-6 h-6" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              MoodBeats Player
            </h1>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
          >
            <span className="text-sm">Powered by</span>
            <span className="font-bold text-green-400">Jamendo</span>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Sound
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Search and play free tracks from Jamendo by genre or mood
          </p>
        </motion.div>

        <MusicPlayer />
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 p-6 text-center relative z-10"
      >
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/20">
          <p className="text-blue-200 mb-2">
            Made with <Heart className="w-4 h-4 inline mx-1 text-pink-400" /> by the MoodBeats Team
          </p>
          <p className="text-sm text-blue-200/80">
            Powered by Jamendo | Built with React + TypeScript
          </p>
        </div>
      </motion.footer>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
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
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {i % 3 === 0 ? <Music className="text-white/10 w-6 h-6" /> :
             i % 3 === 1 ? <Sparkles className="text-white/10 w-5 h-5" /> :
             <Heart className="text-white/10 w-5 h-5" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cloud, Coffee, Sun, Heart, Battery } from 'lucide-react';

interface MoodSelectorProps {
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
}

const moods = [
  { id: 'excited', label: 'Excited', icon: Zap, color: 'from-yellow-400 to-orange-500', description: 'Ready to conquer the world!' },
  { id: 'calm', label: 'Calm', icon: Cloud, color: 'from-blue-400 to-teal-500', description: 'Peaceful and centered' },
  { id: 'stressed', label: 'Stressed', icon: Coffee, color: 'from-red-400 to-pink-500', description: 'Need some relief' },
  { id: 'happy', label: 'Happy', icon: Sun, color: 'from-pink-400 to-purple-500', description: 'Life is beautiful' },
  { id: 'romantic', label: 'Romantic', icon: Heart, color: 'from-rose-400 to-pink-500', description: 'Love is in the air' },
  { id: 'energetic', label: 'Energetic', icon: Battery, color: 'from-green-400 to-blue-500', description: 'Pumped and ready' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, setSelectedMood }) => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How are you feeling?
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Describe your mood in words, and watch the magic happen
          </p>
        </motion.div>

        {/* Interactive Text Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., 'excited for the weekend', 'feeling a bit stressed'..."
              className="w-full p-6 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Find Music
            </motion.button>
          </div>
        </motion.div>

        {/* Mood Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {moods.map((mood, index) => {
            const IconComponent = mood.icon;
            const isSelected = selectedMood === mood.id;
            
            return (
              <motion.div
                key={mood.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedMood(mood.id)}
                className="cursor-pointer"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300
                    ${isSelected 
                      ? 'bg-white/20 border-white/40 shadow-2xl' 
                      : 'bg-white/10 border-white/20 hover:bg-white/15'
                    }
                  `}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="selectedMood"
                      className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-20 rounded-2xl`}
                    />
                  )}
                  
                  <div className="relative z-10">
                    <motion.div
                      animate={isSelected ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${mood.color} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {mood.label}
                    </h3>
                    <p className="text-blue-200 text-sm">
                      {mood.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Mood Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-white/80">Current mood:</span>
            <span className="text-white font-semibold capitalize">{selectedMood}</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-green-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MoodSelector;
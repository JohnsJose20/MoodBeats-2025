import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, Music, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Brain,
    title: 'Mood Detection',
    description: 'Our AI analyzes your text input to understand your emotional state',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Search,
    title: 'Smart Curation',
    description: 'Advanced algorithms match your mood to thousands of songs',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Music,
    title: 'Perfect Playlist',
    description: 'Get a personalized playlist that perfectly fits your vibe',
    color: 'from-green-500 to-emerald-500'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            The AI Magic Behind MoodBeats
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            From emotion to music in seconds - here's how our intelligent system works
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ 
                      y: -10,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-blue-200 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Sparkle Effect on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI vs Manual Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-white/5 backdrop-blur-md p-12 rounded-3xl border border-white/20">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose AI over Manual Selection?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                  <span className="text-2xl">😔</span>
                </div>
                <h4 className="text-xl font-semibold text-red-200 mb-3">Manual Selection</h4>
                <ul className="text-red-300 space-y-2">
                  <li>• Takes 5-10 minutes to find the right song</li>
                  <li>• Limited by your current music knowledge</li>
                  <li>• Often doesn't match your actual mood</li>
                  <li>• Requires constant manual curation</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="text-xl font-semibold text-green-200 mb-3">MoodBeats AI</h4>
                <ul className="text-green-300 space-y-2">
                  <li>• Instant mood detection in seconds</li>
                  <li>• Access to millions of perfectly matched songs</li>
                  <li>• Learns your preferences over time</li>
                  <li>• Discovers new music you'll love</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
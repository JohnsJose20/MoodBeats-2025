import React from 'react';
import { motion } from 'framer-motion';
import { Play, Monitor, Smartphone, Headphones } from 'lucide-react';

const DemoSection: React.FC = () => {
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
            See MoodBeats in Action
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Watch our Java application intelligently detect emotions and curate the perfect playlist
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Demo Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-4 text-white"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </motion.div>
                  <div>
                    <p className="text-lg font-semibold">Demo Video</p>
                    <p className="text-sm text-gray-300">Click to watch</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Platform Icons */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {[Monitor, Smartphone, Headphones].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">App Features</h3>
              
              <div className="space-y-4">
                {[
                  'Real-time mood analysis from text input',
                  'AI-powered music recommendation engine',
                  'Seamless Spotify playlist integration',
                  'Personalized learning and adaptation',
                  'Beautiful, intuitive user interface'
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 text-blue-100"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-md"
            >
              <h4 className="text-lg font-semibold text-white mb-2">Built with ❤️</h4>
              <p className="text-purple-200">
                Developed using Java, JavaFX, and advanced AI algorithms for the most accurate mood detection
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
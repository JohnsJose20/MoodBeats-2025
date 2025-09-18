import React from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Calendar, MapPin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-12 rounded-3xl border border-purple-500/30 backdrop-blur-md">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center justify-center mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                <Music className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Experience MoodBeats
              </h2>
            </motion.div>
            
            <p className="text-2xl text-purple-200 mb-8">
              🎧 Live at TechFest 2025
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                Visit Our Booth
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Music className="w-8 h-8 text-white mr-3" />
              <h3 className="text-2xl font-bold text-white">MoodBeats</h3>
            </div>
            <p className="text-blue-200 leading-relaxed">
              Music that understands you. AI-powered curation for every emotion, 
              bringing the perfect soundtrack to your life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Event Details
            </h4>
            <div className="space-y-2 text-blue-200">
              <p className="flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2" />
                TechFest 2025 - Main Hall
              </p>
              <p>March 15-17, 2025</p>
              <p>Booth #42</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h4 className="text-xl font-bold text-white mb-4 flex items-center justify-center md:justify-end">
              <Mail className="w-5 h-5 mr-2" />
              Connect With Us
            </h4>
            <div className="space-y-2 text-blue-200">
              <p>team@moodbeats.app</p>
              <p>@moodbeats_official</p>
              <div className="flex justify-center md:justify-end space-x-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Heart className="w-5 h-5 text-pink-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Music className="w-5 h-5 text-blue-400" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/20 text-center"
        >
          <p className="text-blue-200 mb-4">
            Made with <Heart className="w-4 h-4 inline mx-1 text-pink-400" /> by the MoodBeats Team
          </p>
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-bold text-white"
          >
            "Music that feels you."
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
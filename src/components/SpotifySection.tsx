import React from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink, Heart, Users } from 'lucide-react';

const playlists = [
  {
    name: 'Happy Vibes',
    mood: 'Happy',
    songs: 47,
    color: 'from-yellow-400 to-orange-500',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Chill Zone',
    mood: 'Calm',
    songs: 62,
    color: 'from-blue-400 to-teal-500',
    image: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Energy Boost',
    mood: 'Energetic',
    songs: 38,
    color: 'from-green-400 to-blue-500',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const SpotifySection: React.FC = () => {
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
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mr-4"
            >
              <Music className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Powered by Spotify
            </h2>
          </div>
          
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Access millions of songs with seamless Spotify integration. 
            Your mood becomes your DJ with professionally curated playlists.
          </p>
        </motion.div>

        {/* Spotify Integration Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Music, title: 'Millions of Songs', desc: 'Access to Spotify\'s entire music library' },
            { icon: Heart, title: 'Curated Playlists', desc: 'Handpicked songs for every emotion' },
            { icon: Users, title: 'Social Discovery', desc: 'See what others with similar moods are playing' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-200">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Sample Playlists */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Sample Mood Playlists
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {playlists.map((playlist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={playlist.image}
                      alt={playlist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${playlist.color} opacity-60`} />
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20"
                    >
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Music className="w-8 h-8 text-gray-800 ml-1" />
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-white">{playlist.name}</h4>
                      <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-purple-200 text-sm mb-3">Mood: {playlist.mood}</p>
                    <p className="text-blue-200">{playlist.songs} songs</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-2xl border border-purple-500/30 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-white">50M+</p>
                <p className="text-purple-200">Songs Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">99%</p>
                <p className="text-purple-200">Mood Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{"< 2s"}</p>
                <p className="text-purple-200">Response Time</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpotifySection;
import React from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink, Heart, Users, Play } from 'lucide-react';

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
  const handleConnectSpotify = () => {
    // This would trigger the Spotify login flow
    const loginButton = document.querySelector('[onClick*="handleLogin"]') as HTMLElement;
    if (loginButton) {
      loginButton.click();
    }
  };

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
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              Spotify Integration
            </h2>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            Connect your Spotify account to discover personalized music recommendations based on your mood
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConnectSpotify}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Connect with Spotify</span>
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r ${playlist.color} text-white`}>
                    {playlist.mood}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{playlist.name}</h3>
                <div className="flex items-center space-x-4 text-blue-200">
                  <div className="flex items-center space-x-1">
                    <Music className="w-4 h-4" />
                    <span>{playlist.songs} songs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>12.4k likes</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                    <span>Play</span>
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpotifySection;
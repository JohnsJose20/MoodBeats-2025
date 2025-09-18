
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Music, Play, Pause, Volume2, Heart, Share } from 'lucide-react';
import { fetchTracksByTag, Track } from '../services/jamendoApi';

const MusicPlayer: React.FC = () => {
  const [tag, setTag] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const results = await fetchTracksByTag(tag);
      setTracks(results);
    } catch (err) {
      setError('Error fetching tracks. Please try again.');
    }
    setLoading(false);
  };

  const playTrack = (track: Track) => {
    // Stop current track if playing
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
    }

    setCurrentTrack(track);
    setIsPlaying(true);
    
    const audio = new Audio(track.audio);
    audio.play();
    setAudioElement(audio);
    
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
    };
  };

  const togglePlayPause = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <motion.form 
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative max-w-2xl mx-auto"
      >
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Search by mood or genre (e.g. rock, happy, chill)"
          className="w-full p-5 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 pr-16"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
        >
          <Search className="w-5 h-5" />
        </motion.button>
      </motion.form>

      {/* Now Playing Bar */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md border-t border-white/20 p-4 z-20"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={currentTrack.image} 
                  alt={currentTrack.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{currentTrack.name}</h4>
                  <p className="text-blue-200 text-sm">{currentTrack.artist_name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-white/70 hover:text-white transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                  <Share className="w-5 h-5" />
                </button>
                <button 
                  onClick={togglePlayPause}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>
                <div className="flex items-center space-x-2 text-white/70">
                  <Volume2 className="w-4 h-4" />
                  <div className="w-20 h-1 bg-white/30 rounded-full">
                    <div className="h-full bg-white rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading and Error States */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Music className="w-5 h-5" />
            </motion.div>
            <span>Finding the perfect tracks...</span>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-red-500/20 text-red-200 backdrop-blur-md rounded-full border border-red-500/30">
            <span>{error}</span>
          </div>
        </motion.div>
      )}

      {/* Results Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ y: -5 }}
              className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={track.image} 
                  alt={track.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button 
                    onClick={() => playTrack(track)}
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-white/30 transition-colors ml-auto"
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-1" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-1 truncate">{track.name}</h3>
                <p className="text-blue-200 text-sm mb-2">{track.artist_name}</p>
                <p className="text-blue-200/70 text-xs">{track.album_name}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-blue-200">
                    {tag}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="text-white/50 hover:text-white transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="text-white/50 hover:text-white transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {!loading && tracks.length === 0 && !error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="inline-flex flex-col items-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
              <Music className="w-8 h-8 text-white/60" />
            </div>
            <h3 className="text-xl font-semibold text-white">Discover New Music</h3>
            <p className="text-blue-200">
              Search for a genre or mood to find the perfect tracks for your current vibe
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MusicPlayer;

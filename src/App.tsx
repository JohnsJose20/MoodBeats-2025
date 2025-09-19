import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Sparkles, LogOut, User } from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';
import MusicVisualizer from './components/MusicVisualizer';
import { getDevices } from './services/spotifyApi';

function App() {
  const [selectedMood, setSelectedMood] = useState('happy');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('spotify_access_token');
    const userData = localStorage.getItem('spotify_user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      fetchDevices(token);
    }
  }, []);

  const fetchDevices = async (token: string) => {
    const devices = await getDevices(token);
    setDevices(devices);
  };

  const handleLogin = async () => {
  try {
    // Test connection first
    const testResponse = await fetch('http://localhost:3001/');
    if (!testResponse.ok) {
      throw new Error('Backend server is not responding');
    }

    // Now get the login URL
    const response = await fetch('http://localhost:3001/login', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.url) {
      throw new Error('No authentication URL received from server');
    }

    // Redirect to Spotify
    window.location.href = data.url;
  } catch (error) {
    console.error('Login error:', error);
    
    // Properly handle the unknown error type
    let errorMessage = 'Login failed';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    } else if (typeof error === 'string') {
      errorMessage += `: ${error}`;
    } else {
      errorMessage += ': Unknown error occurred';
    }
    
    alert(`${errorMessage}\n\nMake sure:\n1. Backend is running on port 3001\n2. Spotify credentials are configured\n3. No browser extensions are blocking the request`);
  }
};

  

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_user');
    setIsAuthenticated(false);
    setUser(null);
    setDevices([]);
  };

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
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                {user && (
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <img 
                      src={user.images?.[0]?.url} 
                      alt={user.display_name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm">{user.display_name}</span>
                  </div>
                )}
                {devices.length > 0 && (
                  <div className="bg-green-500/20 px-3 py-1 rounded-full text-xs text-green-300 border border-green-500/30">
                    {devices.length} device{devices.length !== 1 ? 's' : ''} connected
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full border border-green-500/30 transition-colors"
              >
                <span className="text-sm">Login with</span>
                <span className="font-bold text-white">Spotify</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 relative z-10">
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Connect Your Spotify
              </h2>
              <p className="text-xl text-blue-200 mb-8">
                Login with Spotify to discover music that matches your mood
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <span>Continue with Spotify</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <>
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
                Search and play tracks from Spotify by genre or mood
              </p>
            </motion.div>

            <MusicPlayer />
          </>
        )}
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
            Powered by Spotify | Built with React + TypeScript
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

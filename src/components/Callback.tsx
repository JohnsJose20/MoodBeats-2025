import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing login...');
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        setStatus('error');
        setMessage(`Login failed: ${error}`);
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code received');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to exchange code for tokens');
        }

        const data = await response.json();
        
        // Store tokens and user data
        localStorage.setItem('spotify_access_token', data.access_token);
        localStorage.setItem('spotify_refresh_token', data.refresh_token);
        
        // Fetch user profile
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${data.access_token}`
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem('spotify_user', JSON.stringify(userData));
        }

        setStatus('success');
        setMessage('Login successful! Redirecting...');

        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);

      } catch (err) {
        console.error('Callback error:', err);
        setStatus('error');
        setMessage('Failed to complete login. Please try again.');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center max-w-md w-full mx-4"
      >
        {status === 'loading' && (
          <Loader className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
        )}
        {status === 'success' && (
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        )}
        {status === 'error' && (
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        )}
        
        <h2 className="text-2xl font-bold text-white mb-2">
          {status === 'loading' && 'Processing...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Error'}
        </h2>
        
        <p className="text-blue-200 mb-6">{message}</p>
        
        {status === 'error' && (
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            Return to Home
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Callback;
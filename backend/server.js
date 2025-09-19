require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Add this route near the top of your server.js, after the middleware setup
app.get('/', (req, res) => {
  res.json({ 
    message: 'MoodBeats Backend API',
    status: 'Running',
    endpoints: {
      login: '/login',
      callback: '/callback (POST)',
      refresh: '/refresh (POST)'
    }
  });
});
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Handle preflight requests
app.options('*', cors());

app.use(express.json());

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:5173/callback';

// Generate Spotify login URL
// Update your /login endpoint
app.get('/login', (req, res) => {
  try {
    const scopes = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing streaming';
    const state = Math.random().toString(36).substring(7);
    
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('client_id', SPOTIFY_CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('scope', scopes);
    authUrl.searchParams.append('state', state);
    
    console.log('Generated Spotify auth URL');
    res.json({ url: authUrl.toString() });
  } catch (error) {
    console.error('Error generating login URL:', error);
    res.status(500).json({ error: 'Failed to generate login URL' });
  }
});

// Handle callback and exchange code for tokens
app.post('/callback', async (req, res) => {
  const { code } = req.body;
  
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Token exchange error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to exchange code for tokens' });
  }
});

// Refresh access token
app.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Token refresh error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
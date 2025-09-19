export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  preview_url: string | null;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
}

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  audio: string | null;
  image: string;
  duration: number;
  uri: string;
}

// Map Spotify track to our app's track format
export const mapSpotifyTrack = (spotifyTrack: SpotifyTrack): Track => ({
  id: spotifyTrack.id,
  name: spotifyTrack.name,
  artist_name: spotifyTrack.artists.map(artist => artist.name).join(', '),
  album_name: spotifyTrack.album.name,
  audio: spotifyTrack.preview_url,
  image: spotifyTrack.album.images[0]?.url || '',
  duration: spotifyTrack.duration_ms,
  uri: spotifyTrack.uri
});

// Search tracks on Spotify
export const searchSpotify = async (query: string, token: string): Promise<Track[]> => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();
    return data.tracks.items.map(mapSpotifyTrack);
  } catch (error) {
    console.error('Error searching Spotify:', error);
    throw error;
  }
};

// Play track on user's active Spotify device
export const playSpotifyTrack = async (uri: string, token: string): Promise<void> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: [uri]
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to play track: ${response.status}`);
    }
  } catch (error) {
    console.error('Error playing track:', error);
    throw error;
  }
};

// Get user's available devices
export const getDevices = async (token: string): Promise<any[]> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get devices: ${response.status}`);
    }

    const data = await response.json();
    return data.devices;
  } catch (error) {
    console.error('Error getting devices:', error);
    return [];
  }
};
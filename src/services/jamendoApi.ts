export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  audio: string;
  image: string;
}

export async function fetchTracksByTag(tag: string, limit = 10): Promise<Track[]> {
  const clientId = import.meta.env.VITE_JAMENDO_CLIENT_ID;
  const res = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${limit}&tags=${encodeURIComponent(tag)}&audioformat=mp32`
  );
  if (!res.ok) throw new Error('Failed to fetch tracks');
  const data = await res.json();
  return data.results.map((track: any) => ({
    id: track.id,
    name: track.name,
    artist_name: track.artist_name,
    album_name: track.album_name,
    audio: track.audio,
    image: track.image,
  }));
}

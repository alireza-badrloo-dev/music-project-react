export type Track = {
  id: number;
  album_id: number | null;
  title: string;
  slug: string;
  track_number: number | null;
  disc_number: number;
  duration_seconds: number | null;
  audio_path: string | null;
  cover_image: string | null;
  lyrics: string | null;
  release_date: string | null;
  musicbrainz_id: string | null;
  play_count: number;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
};
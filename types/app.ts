export type Language = 'tamil' | 'telugu' | 'malayalam' | 'kannada' | 'hindi' | 'english';

export type ProfileType = 'adult' | 'kids';

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  type: ProfileType;
  pin?: string;
}

export interface Content {
  id: string;
  title: string;
  thumbnail: string;
  banner?: string;
  video?:string;
  description: string;
  duration?: string;
  rating: string;
  year: number;
  genre: string[];
  language: Language;
  isPremium?: boolean;
  episodes?: Episode[];
  progress?: number;
  type?: 'movie' | 'series' | 'live';
}

export interface Episode {
  id: string;
  number: number;
  video?:string;
  title: string;
  duration: string;
  thumbnail: string;
  description: string;
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  currentShow: string;
  category: string;
}

export interface Download {
  id: string;
  content: Content;
  progress: number;
  size: string;
  quality: 'HD' | 'SD' | '4K';
  status: 'downloading' | 'paused' | 'completed';
}

import { PhotoItem } from "@/src/types/love-widgets";

export interface TemplateProps {
  data: {
    partnerA: string;
    partnerB: string;
    anniversary: string;
    songTitle: string;
    songArtist: string;
    songUrl: string;
    letterTitle: string;
    letterLines: string[];
    photos: PhotoItem[];
  };
  isPlaying: boolean;
  isMuted: boolean;
  activePhotoIdx: number;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
  toggleMute: () => void;
  formatTime: (sec: number) => string;
  getCardStyle: (idx: number) => { style: React.CSSProperties; className: string };
  backgroundHearts: { id: number; left: number; size: number; delay: number; duration: number }[];
  reactions: { id: number; left: number; delay: number }[];
  triggerReaction: () => void;
  storyProgress: number;
  handlePrevStory: () => void;
  handleNextStory: () => void;
  handleStoryTouchStart: () => void;
  handleStoryTouchEnd: () => void;
  handleStoryMouseDown: () => void;
  handleStoryMouseUp: () => void;
  handleStoryMouseLeave: () => void;
  isStoryPaused: boolean;
  toggleQrCode?: () => void;
}


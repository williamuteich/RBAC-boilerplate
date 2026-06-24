import { PhotoItem } from "@/src/types/love-widgets";

export interface TributeData {
  partnerA: string;
  partnerB: string;
  anniversary: string;
  songTitle: string;
  songArtist: string;
  songUrl: string;
  letterTitle: string;
  letterLines: string[];
  photos: PhotoItem[];
}

export interface TemplateProps {
  data: TributeData;
  isPublic?: boolean;
}

export interface CalendarWidgetProps {
  dateStr: string;
  size?: "sm" | "md";
  dark?: boolean;
}

export interface LoveLetterWidgetProps {
  notes?: string[];
  size?: "sm" | "md";
  dark?: boolean;
}

export interface PhotoItem {
  id: string;
  url: string;
  label: string;
}

export interface EditorContextProps {
  partnerA: string;
  setPartnerA: (val: string) => void;
  partnerB: string;
  setPartnerB: (val: string) => void;
  anniversary: string;
  setAnniversary: (val: string) => void;
  theme: "spotify" | "story";
  setTheme: (val: "spotify" | "story") => void;
  songTitle: string;
  setSongTitle: (val: string) => void;
  songArtist: string;
  setSongArtist: (val: string) => void;
  songUrl: string;
  setSongUrl: (val: string) => void;
  letterTitle: string;
  setLetterTitle: (val: string) => void;
  letterBody: string;
  setLetterBody: (val: string) => void;
  photos: PhotoItem[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (id: string) => void;
  updatePhotoLabel: (id: string, newLabel: string) => void;
  isSaving: boolean;
  saveSuccess: boolean;
  handleSave: () => void;
  pageUrl: string;
}

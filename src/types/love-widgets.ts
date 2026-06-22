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

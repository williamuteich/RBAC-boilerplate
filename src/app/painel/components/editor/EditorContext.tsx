"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PhotoItem, EditorContextProps } from "@/src/types/love-widgets";

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [partnerA, setPartnerA] = useState("Lucas");
  const [partnerB, setPartnerB] = useState("Gabriela");
  const [anniversary, setAnniversary] = useState("12/06/2023");
  const [theme, setTheme] = useState<"spotify" | "story">("spotify");

  const [songTitle, setSongTitle] = useState("Perfect");
  const [songArtist, setSongArtist] = useState("Ed Sheeran");
  const [songUrl, setSongUrl] = useState("https://open.spotify.com/track/1P52140Bq0b4d4554b732e");

  const [letterTitle, setLetterTitle] = useState("Para Minha Vida,");
  const [letterBody, setLetterBody] = useState(
    "Desde o momento em que te conheci, percebi que minha vida nunca mais seria a mesma. Cada detalhe, cada conversa e cada sorriso ao seu lado me fazem ter a certeza de que quero passar o resto dos meus dias com você."
  );

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newItems: PhotoItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newItems.push({
        id: `${Date.now()}-${i}`,
        url: url,
        label: file.name.split(".")[0] || `Foto ${photos.length + i + 1}`,
      });
    }

    setPhotos((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const updatePhotoLabel = (id: string, newLabel: string) => {
    setPhotos((prev) =>
      prev.map((photo) => (photo.id === id ? { ...photo, label: newLabel } : photo))
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1200);
  };

  const slugify = (strA: string, strB: string) => {
    const clean = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
    return `${clean(strA)}-e-${clean(strB)}`;
  };

  const pageSlug = slugify(partnerA, partnerB);
  const pageUrl = `eterno.love/${pageSlug}`;

  return (
    <EditorContext.Provider
      value={{
        partnerA,
        setPartnerA,
        partnerB,
        setPartnerB,
        anniversary,
        setAnniversary,
        theme,
        setTheme,
        songTitle,
        setSongTitle,
        songArtist,
        setSongArtist,
        songUrl,
        setSongUrl,
        letterTitle,
        setLetterTitle,
        letterBody,
        setLetterBody,
        photos,
        handleFileChange,
        removePhoto,
        updatePhotoLabel,
        isSaving,
        saveSuccess,
        handleSave,
        pageUrl,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}

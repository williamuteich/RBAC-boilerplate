"use client";

import { createContext, useContext, useState, useEffect, ReactNode, ChangeEvent } from "react";
import { PhotoItem, EditorContextProps } from "@/src/types/love-widgets";
import { getPainelData, updatePainelData } from "@/src/services/painel";

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [partnerA, setPartnerA] = useState("");
  const [partnerB, setPartnerB] = useState("");
  const [anniversary, setAnniversary] = useState("");
  const [theme, setTheme] = useState<"spotify" | "story">("spotify");

  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songUrl, setSongUrl] = useState("");

  const [letterTitle, setLetterTitle] = useState("");
  const [letterBody, setLetterBody] = useState("");

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPainelData();
        setPartnerA(data.partnerA || "Lucas");
        setPartnerB(data.partnerB || "Gabriela");
        setAnniversary(data.anniversary || "12/06/2023");
        setTheme(data.theme === "story" ? "story" : "spotify");
        setSongTitle(data.songTitle || "Perfect");
        setSongArtist(data.songArtist || "Ed Sheeran");
        setSongUrl(data.songUrl || "https://www.youtube.com/watch?v=yKNxeF4Kxyc");
        setLetterTitle(data.letterTitle || "Para Minha Vida,");
        setLetterBody(data.letterBody || "Desde o momento em que te conheci, percebi que minha vida nunca mais seria a mesma.");
        setPhotos(Array.isArray(data.photos) ? data.photos : []);
      } catch (err) {
        console.error("Erro ao carregar dados do painel:", err);
      }
    }
    loadData();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/painel/upload", {
          method: "POST",
          body: formData
        });

        if (res.ok) {
          const data = await res.json();
          const newItem: PhotoItem = {
            id: `${Date.now()}-${i}`,
            url: data.url,
            label: file.name.split(".")[0] || `Foto ${photos.length + i + 1}`,
          };
          setPhotos((prev) => [...prev, newItem]);
        } else {
          const errData = await res.json().catch(() => ({}));
          setErrorMessage(errData.error || "Erro no upload do arquivo.");
          setTimeout(() => setErrorMessage(""), 5000);
        }
      } catch (err) {
        console.error("Erro ao fazer upload da imagem:", err);
        setErrorMessage("Erro de rede ao carregar a imagem.");
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
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

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage("");
    try {
      const res = await updatePainelData({
        partnerA,
        partnerB,
        anniversary,
        theme,
        songTitle,
        songArtist,
        songUrl,
        letterTitle,
        letterBody,
        photos
      });

      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setErrorMessage(res.error || "Erro ao salvar alterações.");
      }
    } catch (err) {
      console.error("Erro ao salvar dados do painel:", err);
      setErrorMessage("Erro de conexão ao salvar.");
    } finally {
      setIsSaving(false);
    }
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

  const pageSlug = slugify(partnerA || "lucas", partnerB || "gabriela");
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
        errorMessage,
        setErrorMessage,
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

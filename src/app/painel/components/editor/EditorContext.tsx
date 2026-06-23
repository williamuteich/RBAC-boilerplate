"use client";

import { createContext, useContext, useState, useEffect, ReactNode, ChangeEvent } from "react";
import { PhotoItem, EditorContextProps } from "@/src/types/love-widgets";
import { getPainelData, updatePainelData } from "@/src/services/painel";

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [tributeId, setTributeId] = useState("");
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
  const [pendingFiles, setPendingFiles] = useState<Record<string, File>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPainelData();
        setTributeId(data.tributeId || "");
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (photos.length + files.length > 12) {
      setErrorMessage("Limite máximo de 12 fotos atingido.");
      setTimeout(() => setErrorMessage(""), 5000);
      e.target.value = "";
      return;
    }

    const romanceMessages = [
      "Você é o meu mundo",
      "O melhor lugar é o seu abraço",
      "Cada momento com você é especial",
      "Para sempre ao seu lado",
      "Você me faz sorrir todos os dias",
      "Meu amor, minha maior felicidade",
      "Te amo mais a cada dia",
      "A vida é linda com você",
      "Você é o meu sonho realizado",
      "Minha pessoa favorita no mundo",
      "Com você, tudo fica perfeito",
      "Amo a nossa história de amor"
    ];

    const newPhotos: PhotoItem[] = [];
    const newPendingFiles = { ...pendingFiles };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const localUrl = URL.createObjectURL(file);
      
      const messageIndex = (photos.length + i) % romanceMessages.length;
      const defaultLabel = romanceMessages[messageIndex];

      const newItem: PhotoItem = {
        id: `temp-${Date.now()}-${i}-${Math.random()}`,
        url: localUrl,
        label: defaultLabel,
      };
      newPhotos.push(newItem);
      newPendingFiles[localUrl] = file;
    }

    setPhotos((prev) => [...prev, ...newPhotos]);
    setPendingFiles(newPendingFiles);
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    const photoToRemove = photos.find((p) => p.id === id);
    if (photoToRemove && photoToRemove.url.startsWith("blob:")) {
      URL.revokeObjectURL(photoToRemove.url);
      setPendingFiles((prev) => {
        const copy = { ...prev };
        delete copy[photoToRemove.url];
        return copy;
      });
    }
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
      const updatedPhotos = [...photos];

      for (let i = 0; i < updatedPhotos.length; i++) {
        const photo = updatedPhotos[i];
        if (photo.url.startsWith("blob:")) {
          const file = pendingFiles[photo.url];
          if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/painel/upload", {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              throw new Error(errData.error || `Erro ao fazer upload da imagem ${photo.label}`);
            }

            const data = await res.json();
            URL.revokeObjectURL(photo.url);

            updatedPhotos[i] = {
              ...photo,
              url: data.url,
            };
          }
        }
      }

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
        photos: updatedPhotos,
      });

      if (res.success) {
        setPhotos(updatedPhotos);
        setPendingFiles({});
        setSaveSuccess(true);
      } else {
        setErrorMessage(res.error || "Erro ao salvar alterações.");
      }
    } catch (err: any) {
      console.error("Erro ao salvar dados do painel:", err);
      setErrorMessage(err.message || "Erro de conexão ao salvar.");
    } finally {
      setIsSaving(false);
    }
  };

  const pageUrl = `glamourlindoia.com.br/p/${tributeId}`;

  return (
    <EditorContext.Provider
      value={{
        tributeId,
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
        setSaveSuccess,
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

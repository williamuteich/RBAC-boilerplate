import { z } from "zod";

export const painelUpdateSchema = z.object({
  partnerA: z.string().min(1, "Nome do parceiro A é obrigatório"),
  partnerB: z.string().min(1, "Nome do parceiro B é obrigatório"),
  anniversary: z.string().min(1, "Data de aniversário é obrigatória"),
  theme: z.enum(["spotify", "story"]),
  songTitle: z.string().optional().default(""),
  songArtist: z.string().optional().default(""),
  songUrl: z.string().url("O link do YouTube deve ser uma URL válida").or(z.string().length(0)).optional().default(""),
  letterTitle: z.string().optional().default(""),
  letterBody: z.string().optional().default(""),
  photos: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      label: z.string()
    })
  ).optional().default([])
});

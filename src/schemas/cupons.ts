import { z } from "zod";

export const getCuponsQuerySchema = z.object({
  page: z.coerce.number().int().positive("Página inválida").default(1),
  limit: z.coerce.number().int().positive("Limite inválido").max(100).default(10),
  search: z.string().optional().transform(v => v || undefined),
  status: z.string().optional().transform(v => v || undefined)
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido")
});

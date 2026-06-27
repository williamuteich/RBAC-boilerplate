import { z } from "zod";

export const getCuponsQuerySchema = z.object({
  page: z.coerce.number().int().positive("Página inválida").default(1),
  limit: z.coerce.number().int().positive("Limite inválido").max(100).default(10),
  search: z.string().optional().transform(v => v || undefined),
  status: z.string().optional().transform(v => v || undefined)
});

export const generateCouponsSchema = z.object({
  quantity: z.coerce.number().int().min(1, "Quantidade mínima é 1").max(50, "Quantidade máxima é 50").default(1),
  prefix: z.string().max(10, "Prefixo muito longo").optional().transform(v => v || "LOVE"),
  expiresInDays: z.coerce.number().int().positive().nullable().optional(),
  origem: z.string().optional().default("google"),
  value: z.preprocess(v => v === "" || v === undefined || v === null ? null : v, z.coerce.number().positive().nullable().optional())
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido")
});

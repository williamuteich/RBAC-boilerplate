import { z } from "zod";

const clientStatusEnum = z.enum(["ACTIVE", "PENDING", "SUSPENDED"]);

export const getClientesQuerySchema = z.object({
  page: z.coerce.number().int().positive("Página inválida").default(1),
  limit: z.coerce.number().int().positive("Limite inválido").max(100).default(10),
  search: z.string().optional().transform(v => v || undefined),
  status: clientStatusEnum.optional(),
  plan: z.string().optional().transform(v => v || undefined)
});

export const updateClienteSchema = z.object({
  plan: z.string().optional(),
  status: clientStatusEnum.optional(),
  lastPaymentValue: z.number().nonnegative("Valor não pode ser negativo").optional(),
  expirationDate: z.string().nullable().optional()
});

export const simulateClientSchema = z.object({
  email: z.string().email("E-mail de simulação inválido")
});

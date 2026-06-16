import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "O nome do cargo é obrigatório"),
  description: z.string().optional().nullable(),
  permissions: z.array(z.object({
    resource: z.string(),
    action: z.string()
  })).min(1, "Selecione ao menos uma permissão")
});

export const adminSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  roleId: z.string().min(1, "O cargo é obrigatório"),
  active: z.boolean().default(true).optional()
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido")
});

export const getAdminsQuerySchema = z.object({
  page: z.coerce.number().int().positive("Página inválida").default(1),
  limit: z.coerce.number().int().positive("Limite inválido").max(100, "Limite máximo de 100").default(20),
  name: z.string().optional()
});

export const getAuditoriaQuerySchema = z.object({
  page: z.coerce.number().int().positive("Página inválida").default(1),
  limit: z.coerce.number().int().positive("Limite inválido").max(100, "Limite máximo de 100").default(20),
  resource: z.string().optional(),
  action: z.string().optional(),
  administratorId: z.coerce.number().int().positive("ID do administrador inválido").optional()
});

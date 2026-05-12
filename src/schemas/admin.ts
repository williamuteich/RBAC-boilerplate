import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "O nome do cargo é obrigatório"),
  description: z.string().optional(),
  permissions: z.array(z.object({
    resource: z.string(),
    action: z.string()
  })).min(1, "Selecione ao menos uma permissão")
});

export type RoleInput = z.infer<typeof roleSchema>;

export const adminSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  roleId: z.string().min(1, "O cargo é obrigatório"),
  active: z.boolean().default(true).optional()
});

export type AdminInput = z.infer<typeof adminSchema>;

export const VisitorCreateSchema = z.object({
  visitorId: z.string().min(1),
  gclid: z.string().optional().nullable(),
  utmSource: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  converted: z.boolean().optional(),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
});

export type VisitorCreateInput = z.infer<typeof VisitorCreateSchema>;

export const VisitorListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(500).default(100),
  visitorId: z.string().optional(),
  gclid: z.string().optional(),
  converted: z.enum(["true", "false"]).optional(),
});

export type VisitorListQuery = z.infer<typeof VisitorListQuerySchema>;

export const PageLimitSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(500).default(100),
});

export type PageLimit = z.infer<typeof PageLimitSchema>;

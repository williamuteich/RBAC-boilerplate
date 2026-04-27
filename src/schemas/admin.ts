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

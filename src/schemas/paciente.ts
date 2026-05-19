import { z } from "zod";

export const pacienteSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, "CPF inválido"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória").refine(d => {
    const date = new Date(d);
    const year = date.getFullYear();
    return !isNaN(date.getTime()) && year >= 1900 && year <= new Date().getFullYear();
  }, "Data de nascimento inválida (deve ser entre 1900 e o ano atual)"),
  telefone: z.string().min(10, "Telefone inválido"),
  cep: z.string().min(8, "CEP inválido"),
  estado: z.string().min(2, "Estado é obrigatório"),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  rua: z.string().min(2, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  ativo: z.boolean().default(true).optional(),
});

export type PacienteInput = z.infer<typeof pacienteSchema>;

export const pacienteQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  nome: z.string().optional(),
  cpf: z.string().optional(),
});

export type PacienteQueryInput = z.infer<typeof pacienteQuerySchema>;

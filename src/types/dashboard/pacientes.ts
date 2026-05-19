import { FormEvent } from "react";

export interface Paciente {
  id: string;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  cep: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
  complemento?: string | null;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PacientesResponse {
  pacientes: Paciente[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface PacienteFilters {
  page?: number;
  limit?: number;
  nome?: string;
  cpf?: string;
}

export type ToothStatus = "healthy" | "cavity" | "restored" | "extracted" | "missing";

export interface ToothInfo {
  id: number;
  status: ToothStatus;
  notes: string;
}

export interface EvolutionItem {
  id: number;
  date: string;
  text: string;
  author: string;
}

export interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  doctor: string;
  status: string;
  price: string;
}

export interface Budget {
  id: number;
  title: string;
  total: string;
  paid: string;
  date: string;
  status: string;
}

export interface OdontogramaTabProps {
  teeth: Record<number, ToothInfo>;
  selectedTooth: number | null;
  setSelectedTooth: (id: number | null) => void;
  onStatusUpdate: (status: ToothStatus) => void;
  onNoteUpdate: (notes: string) => void;
}

export interface EvolucaoTabProps {
  evolution: EvolutionItem[];
  newEvolutionText: string;
  onTextChange: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export interface AgendamentosTabProps {
  appointments: Appointment[];
}

export interface FinanceiroTabProps {
  budgets: Budget[];
}

export interface CadastroTabProps {
  paciente: Paciente;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  success: boolean;
  error: string;
}

import { FormEvent } from "react";

export interface Paciente {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  zipCode: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string | null;
  active: boolean;
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
  name?: string;
  cpf?: string;
}

export type ToothStatus = "healthy" | "cavity" | "restored" | "extracted" | "missing";

export interface ToothInfo {
  id: number;
  status: ToothStatus;
  notes: string;
}

export interface EvolucaoListProps {
  initialItems: HistoricoPatient[];
  patientId: string;
  apiUrl: string;
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

export interface ProntuarioContainerProps {
  paciente: Paciente;
  initialHistory: HistoricoPatient[];
  patientId: string;
  initialTab: string;
}

export interface OdontogramaTabProps {
  teeth: Record<number, ToothInfo>;
  selectedTooth: number | null;
  setSelectedTooth: (id: number | null) => void;
  onStatusUpdate: (status: ToothStatus) => void;
  onNoteUpdate: (notes: string) => void;
}

export interface AgendamentosTabProps {
  appointments: Appointment[];
}

export interface CadastroTabProps {
  paciente: Paciente;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  success: boolean;
  error: string;
}

export interface HistoricoPatient {
  id: string;
  patient?: Paciente;
  patientId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistoricoPatientResponse {
  historico: HistoricoPatient[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}



export interface CreatePacienteDialogProps {
  onCreateSuccess: () => void;
}

export interface PacienteHistoricoDialogProps {
  paciente: Paciente | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface DeleteDialogGenericProps {
  id: string;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
  onSuccess: () => void;
  title: string;
  description: string;
  successMessage?: string;
  errorMessage?: string;
  triggerButton?: React.ReactElement;
}
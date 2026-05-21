import { FormEvent } from "react";
import { IAnamnese } from "./anamnese";
import { IOdontogram } from "@/src/schemas/odontograma";

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

export type ToothStatus = "SAUDAVEL" | "CARIE" | "ENDODONTIA" | "PROTESE" | "IMPLANTE" | "EXTRAIDO" | "RETIDO" | "OUTRO";

export interface ToothInfo {
  id: number;
  status: ToothStatus;
  notes: string;
}

export interface EvolucaoListProps {
  initialItems: HistoricoPatient[];
  patientId: string;
}

export interface EvolucaoItemProps {
  evolucao: HistoricoPatient;
  onUpdate: (id: string, description: string) => void;
  onDelete: (id: string) => void;
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
  patientId: string;
  activeTab: string;
  initialHistory?: HistoricoPatient[];
  initialAnamnese?: IAnamnese | null;
  initialOdontogram?: IOdontogram | null;
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
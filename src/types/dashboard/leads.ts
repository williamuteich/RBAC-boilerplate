export interface Lead {
  id: number;
  name: string;
  email: string | null;
  emailHash: string;
  origem: string;
  value: number;
  usedAt: Date | string | null;
  code: string;
}

export interface LeadsResponse {
  success: boolean;
  leads: Lead[];
}

export interface LeadsDashboardProps {
  initialLeads: Lead[];
}

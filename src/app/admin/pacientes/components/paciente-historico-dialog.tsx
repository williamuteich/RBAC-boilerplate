"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { CalendarDays } from "lucide-react";
import { PacienteHistoricoDialogProps } from "@/src/types/dashboard/pacientes";

export function PacienteHistoricoDialog({ paciente, open, onOpenChange }: PacienteHistoricoDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-slate-800 font-semibold">
                        <CalendarDays className="h-5 w-5 text-blue-600" />
                        Histórico de Atendimento
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-400 mt-1">
                        Histórico de consultas e procedimentos realizados para <strong>{paciente?.name}</strong>.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="relative pl-6 border-l border-slate-200 space-y-6 ml-2">
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-50 border border-white" />
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <p className="font-semibold text-slate-800 text-sm">Consulta de Rotina e Profilaxia</p>
                                    <p className="text-xs text-muted-foreground">Dr. Alexandre Lima • Clínico Geral</p>
                                </div>
                                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 whitespace-nowrap">15/05/2026</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                                Realizado raspagem, profilaxia e aplicação tópica de flúor. Paciente apresenta excelente saúde bucal, orientado a manter o uso diário de fio dental.
                            </p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-50 border border-white" />
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <p className="font-semibold text-slate-800 text-sm">Restauração de Resina Fotopolimerizável</p>
                                    <p className="text-xs text-muted-foreground">Dra. Ana Mello • Estética</p>
                                </div>
                                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 whitespace-nowrap">08/04/2026</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                                Procedimento de restauração estética classe I no dente 36. Removido tecido cariado active sob anestesia local e realizado selamento oclusal perfeito.
                            </p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-50 border border-white" />
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <p className="font-semibold text-slate-800 text-sm">Consulta de Avaliação Inicial</p>
                                    <p className="text-xs text-muted-foreground">Dr. Alexandre Lima • Clínico Geral</p>
                                </div>
                                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 whitespace-nowrap">12/03/2026</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                                Primeira consulta para anamnese e exame clínico completo. Identificada necessidade de restauração pontual no dente 36 e profilaxia geral agendada.
                            </p>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full h-9 text-xs font-semibold cursor-pointer">
                        Fechar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

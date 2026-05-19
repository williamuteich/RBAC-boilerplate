"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2, User, Phone, MapPin, CalendarDays, Save, CheckCircle, AlertCircle } from "lucide-react";
import { CadastroTabProps } from "@/src/types/dashboard/pacientes";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CadastroTab({
    paciente,
    onSubmit,
    isPending,
    success,
    error
}: CadastroTabProps) {
    const [cepLoading, setCepLoading] = useState(false);
    const [addressFields, setAddressFields] = useState({
        estado: paciente.estado || "",
        cidade: paciente.cidade || "",
        rua: paciente.rua || "",
    });

    const [masks, setMasks] = useState({
        cpf: paciente.cpf || "",
        telefone: paciente.telefone || "",
        cep: paciente.cep || "",
    });

    const maskCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    };

    const maskPhone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
    };

    const maskCEP = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
    };

    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!val) return;
        setCepLoading(true);
        try {
            const clean = val.replace(/\D/g, "");
            if (clean.length === 8) {
                const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    setAddressFields({
                        estado: data.uf,
                        cidade: data.localidade,
                        rua: data.logradouro,
                    });
                }
            }
        } catch {}
        setCepLoading(false);
    };

    const handleMaskChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        maskFn: (val: string) => string,
        field: keyof typeof masks
    ) => {
        setMasks((prev) => ({ ...prev, [field]: maskFn(e.target.value) }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8 w-full animate-in fade-in duration-500">
            {success && (
                <div className="flex items-center gap-3 p-4 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                        <p className="font-semibold">Alterações salvas com sucesso!</p>
                        <p className="text-sm opacity-90">Os dados do paciente foram atualizados no sistema.</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 p-4 text-red-700 bg-red-50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                    <div>
                        <p className="font-semibold">Erro ao salvar</p>
                        <p className="text-sm opacity-90">{error}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                <div className="space-y-6 w-full">
                    <div className="border-b pb-2">
                        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            Dados Pessoais
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Identificação e contatos principais do paciente.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="nomeCompleto" className="text-sm font-medium">Nome Completo</Label>
                            <Input
                                id="nomeCompleto"
                                name="nomeCompleto"
                                defaultValue={paciente.nomeCompleto}
                                placeholder="João da Silva"
                                required
                                className="h-10 bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="cpf" className="text-sm font-medium">CPF</Label>
                                <Input
                                    id="cpf"
                                    name="cpf"
                                    value={masks.cpf}
                                    onChange={(e) => handleMaskChange(e, maskCPF, "cpf")}
                                    placeholder="000.000.000-00"
                                    required
                                    className="h-10 bg-white"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="dataNascimento" className="text-sm font-medium flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4 text-slate-500" />
                                    Nascimento
                                </Label>
                                <Input
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    type="date"
                                    defaultValue={
                                        paciente.dataNascimento
                                            ? new Date(paciente.dataNascimento).toISOString().split("T")[0]
                                            : ""
                                    }
                                    required
                                    className="h-10 bg-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="telefone" className="text-sm font-medium flex items-center gap-1.5">
                                <Phone className="h-4 w-4 text-slate-500" />
                                Telefone / WhatsApp
                            </Label>
                            <Input
                                id="telefone"
                                name="telefone"
                                value={masks.telefone}
                                onChange={(e) => handleMaskChange(e, maskPhone, "telefone")}
                                placeholder="(51) 99999-9999"
                                required
                                className="h-10 bg-white"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-4">
                            <input
                                type="checkbox"
                                name="ativo"
                                id="ativo"
                                defaultChecked={paciente.ativo}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <Label htmlFor="ativo" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                                Paciente com cadastro ativo
                            </Label>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 w-full">
                    <div className="border-b pb-2">
                        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            Endereço Residencial
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Localização atualizada para correspondências ou contatos.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="cep" className="text-sm font-medium">CEP</Label>
                                <div className="relative">
                                    <Input
                                        id="cep"
                                        name="cep"
                                        value={masks.cep}
                                        onChange={(e) => handleMaskChange(e, maskCEP, "cep")}
                                        onBlur={handleCepBlur}
                                        placeholder="00000-000"
                                        required
                                        className="h-10 bg-white"
                                    />
                                    {cepLoading && (
                                        <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-blue-500" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="estado" className="text-sm font-medium">Estado (UF)</Label>
                                <Input
                                    id="estado"
                                    name="estado"
                                    value={addressFields.estado}
                                    onChange={(e) =>
                                        setAddressFields((p) => ({ ...p, estado: e.target.value.toUpperCase() }))
                                    }
                                    placeholder="RS"
                                    maxLength={2}
                                    required
                                    className="h-10 bg-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="cidade" className="text-sm font-medium">Cidade</Label>
                            <Input
                                id="cidade"
                                name="cidade"
                                value={addressFields.cidade}
                                onChange={(e) => setAddressFields((p) => ({ ...p, cidade: e.target.value }))}
                                placeholder="Porto Alegre"
                                required
                                className="h-10 bg-white"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="rua" className="text-sm font-medium">Rua / Logradouro</Label>
                            <Input
                                id="rua"
                                name="rua"
                                value={addressFields.rua}
                                onChange={(e) => setAddressFields((p) => ({ ...p, rua: e.target.value }))}
                                placeholder="Rua das Flores"
                                required
                                className="h-10 bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="numero" className="text-sm font-medium">Número</Label>
                                <Input
                                    id="numero"
                                    name="numero"
                                    defaultValue={paciente.numero}
                                    placeholder="123"
                                    required
                                    className="h-10 bg-white"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="complemento" className="text-sm font-medium">Complemento</Label>
                                <Input
                                    id="complemento"
                                    name="complemento"
                                    defaultValue={paciente.complemento || ""}
                                    placeholder="Apto 2B"
                                    className="h-10 bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t pt-6 flex items-center justify-end gap-3">
                <Link
                    href="/admin/pacientes"
                    className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6 flex items-center justify-center")}
                >
                    Cancelar
                </Link>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 h-11 px-6 min-w-[160px] flex items-center justify-center gap-2"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Salvando...</span>
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            <span>Salvar Alterações</span>
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}

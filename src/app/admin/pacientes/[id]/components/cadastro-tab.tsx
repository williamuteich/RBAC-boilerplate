"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2, User, Phone, MapPin, CalendarDays, Save, CheckCircle, AlertCircle } from "lucide-react";
import { Paciente } from "@/src/types/dashboard/pacientes";
import { updatePaciente } from "@/src/services/pacientes";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CadastroTab({ paciente }: { paciente: Paciente }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    
    const [cepLoading, setCepLoading] = useState(false);
    const [fields, setFields] = useState({
        name: paciente.name || "",
        cpf: paciente.cpf || "",
        birthDate: paciente.birthDate
            ? new Date(paciente.birthDate).toISOString().split("T")[0]
            : "",
        phone: paciente.phone || "",
        zipCode: paciente.zipCode || "",
        state: paciente.state || "",
        city: paciente.city || "",
        street: paciente.street || "",
        number: paciente.number || "",
        complement: paciente.complement || "",
        active: paciente.active ?? true
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

    const handleCepBlur = async () => {
        const val = fields.zipCode;
        if (!val) return;
        setCepLoading(true);
        try {
            const clean = val.replace(/\D/g, "");
            if (clean.length === 8) {
                const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    setFields(prev => ({
                        ...prev,
                        state: data.uf || "",
                        city: data.localidade || "",
                        street: data.logradouro || ""
                    }));
                }
            }
        } catch {}
        setCepLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFields(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields(prev => ({ ...prev, cpf: maskCPF(e.target.value) }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields(prev => ({ ...prev, phone: maskPhone(e.target.value) }));
    };

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields(prev => ({ ...prev, zipCode: maskCEP(e.target.value) }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        startTransition(async () => {
            const payload: Partial<Paciente> = {
                name: fields.name,
                cpf: fields.cpf,
                birthDate: fields.birthDate,
                phone: fields.phone,
                zipCode: fields.zipCode,
                state: fields.state,
                city: fields.city,
                street: fields.street,
                number: fields.number,
                complement: fields.complement || null,
                active: fields.active,
            };

            const res = await updatePaciente(paciente.id, payload);

            if (res.success) {
                setSuccess(true);
                router.refresh();
                setTimeout(() => setSuccess(false), 4500);
            } else {
                setError(res.error || "Erro ao salvar alterações");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 w-full animate-in fade-in duration-500">
            {success && (
                <div className="flex items-center gap-3 p-4 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md animate-in fade-in slide-in-from-top-2 duration-300">
                    <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                        <p className="font-semibold">Alterações salvas com sucesso!</p>
                        <p className="text-sm opacity-90">Os dados do paciente foram atualizados no sistema.</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 p-4 text-red-700 bg-red-50 border border-red-200 rounded-md animate-in fade-in slide-in-from-top-2 duration-300">
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
                            <Label htmlFor="name" className="text-sm font-medium">Nome Completo</Label>
                            <Input
                                id="name"
                                name="name"
                                value={fields.name}
                                onChange={handleChange}
                                placeholder="João da Silva"
                                required
                                className="h-10 bg-white rounded-md"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="cpf" className="text-sm font-medium">CPF</Label>
                                <Input
                                    id="cpf"
                                    name="cpf"
                                    value={fields.cpf}
                                    onChange={handleCpfChange}
                                    placeholder="000.000.000-00"
                                    required
                                    className="h-10 bg-white rounded-md"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="birthDate" className="text-sm font-medium flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4 text-slate-500" />
                                    Nascimento
                                </Label>
                                <Input
                                    id="birthDate"
                                    name="birthDate"
                                    type="date"
                                    value={fields.birthDate}
                                    onChange={handleChange}
                                    required
                                    className="h-10 bg-white rounded-md"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1.5">
                                <Phone className="h-4 w-4 text-slate-500" />
                                Telefone / WhatsApp
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={fields.phone}
                                onChange={handlePhoneChange}
                                placeholder="(51) 99999-9999"
                                required
                                className="h-10 bg-white rounded-md"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-4">
                            <input
                                type="checkbox"
                                name="active"
                                id="active"
                                checked={fields.active}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <Label htmlFor="active" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
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
                                <Label htmlFor="zipCode" className="text-sm font-medium">CEP</Label>
                                <div className="relative">
                                    <Input
                                        id="zipCode"
                                        name="zipCode"
                                        value={fields.zipCode}
                                        onChange={handleZipCodeChange}
                                        onBlur={handleCepBlur}
                                        placeholder="00000-000"
                                        required
                                        className="h-10 bg-white rounded-md"
                                    />
                                    {cepLoading && (
                                        <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-blue-500" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="state" className="text-sm font-medium">Estado (UF)</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    value={fields.state}
                                    onChange={handleChange}
                                    placeholder="RS"
                                    maxLength={2}
                                    required
                                    className="h-10 bg-white rounded-md"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="city" className="text-sm font-medium">Cidade</Label>
                            <Input
                                id="city"
                                name="city"
                                value={fields.city}
                                onChange={handleChange}
                                placeholder="Porto Alegre"
                                required
                                className="h-10 bg-white rounded-md"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="street" className="text-sm font-medium">Rua / Logradouro</Label>
                            <Input
                                id="street"
                                name="street"
                                value={fields.street}
                                onChange={handleChange}
                                placeholder="Rua das Flores"
                                required
                                className="h-10 bg-white rounded-md"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="number" className="text-sm font-medium">Número</Label>
                                <Input
                                    id="number"
                                    name="number"
                                    value={fields.number}
                                    onChange={handleChange}
                                    placeholder="123"
                                    required
                                    className="h-10 bg-white rounded-md"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="complement" className="text-sm font-medium">Complemento</Label>
                                <Input
                                    id="complement"
                                    name="complement"
                                    value={fields.complement}
                                    onChange={handleChange}
                                    placeholder="Apto 2B"
                                    className="h-10 bg-white rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t pt-6 flex items-center justify-end gap-3">
                <Link
                    href="/admin/pacientes"
                    className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6 rounded-md flex items-center justify-center")}
                >
                    Cancelar
                </Link>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 h-11 px-6 rounded-md min-w-[160px] flex items-center justify-center gap-2"
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

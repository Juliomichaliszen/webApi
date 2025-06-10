/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useModal } from "@/contexts/ModalContext";
import Select from "@/components/Select";
import Input from "@/components/Input";
import ModalMainLayout from "@/components/ModalMainLayout";
import ModalButtons from "@/components/ModalButtons";
import { useState } from "react";
import { consultaSchema } from "@/lib/schemas/consultaSchema";
import { toast } from "react-toastify";
import { Consulta } from "@/lib/types/Consulta";
import { usePacientes } from "@/lib/hooks/usePacientes";
import { useMedicos } from "@/lib/hooks/useMedicos";
import { useCreateConsulta } from "@/lib/hooks/useCreateConsulta";
import { useUpdateConsulta } from "@/lib/hooks/useConsultas";

function generateTimeOptions(step = 15) {
  const options = [];
  for (let h = 7; h <= 21; h++) {
    for (let m = 0; m < 60; m += step) {
      options.push({
        value: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        text: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      });
    }
  }
  options.push({ value: "22:00", text: "22:00" });
  return options;
}

const horarioOptions = generateTimeOptions();

function Modal({
  modalId,
  consulta,
}: {
  modalId: string;
  consulta?: Consulta;
}) {
  const isEditing = !!consulta;
  const { openModal, closeModal } = useModal();

  const { data: pacientes, isLoading: isLoadingPacientes } = usePacientes();
  const { data: medicos, isLoading: isLoadingMedicos } = useMedicos();
  const { mutate: createConsulta, isPending: isCreating } = useCreateConsulta();
  const { mutate: updateConsulta, isPending: isUpdating } = useUpdateConsulta();

  const isSubmitting = isCreating || isUpdating;

  const [form, setForm] = useState({
    pacienteId: consulta?.pacienteId.toString() || "",
    medicoId: consulta?.medicoId.toString() || "",
    data: consulta
      ? new Date(consulta.dataHora).toISOString().split("T")[0]
      : "",
    hora: consulta
      ? new Date(consulta.dataHora).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
  });

  function handleChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleConfirm() {
    const payloadToValidate = {
      ...form,
      pacienteId: Number(form.pacienteId),
      medicoId: Number(form.medicoId),
    };

    const result = consultaSchema.safeParse(payloadToValidate);

    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Dados inválidos.");
      return;
    }

    const apiPayload = {
      dataHora: new Date(
        `${result.data.data}T${result.data.hora}`
      ).toISOString(),
      pacienteId: result.data.pacienteId,
      medicoId: result.data.medicoId,
    };

    const options = {
      onSettled: () => {
        closeModal();
      },
    };

    if (isEditing) {
      updateConsulta({ id: consulta.id, payload: apiPayload }, options);
    } else {
      createConsulta(apiPayload, options);
    }
  }
  const pacienteOptions =
    pacientes?.map((p) => ({ value: p.id.toString(), text: p.nome })) || [];
  const medicoOptions =
    medicos?.map((m) => ({ value: m.id.toString(), text: m.nome })) || [];

  return (
    <ModalMainLayout title="Nova Consulta">
      <div className="flex flex-col flex-1 gap-4 justify-between">
        <div className="flex-1 flex flex-col gap-[20px] px-[20px]">
          <div className="flex flex-col gap-[10px]">
            <h3 className="font-bold text-xl">Informações da Consulta</h3>

            <div className="grid grid-cols-4 gap-4 w-full">
              <Select
                id="pacienteId"
                name="pacienteId"
                title="Paciente"
                options={pacienteOptions}
                value={form.pacienteId}
                onChange={handleChange}
                cols={2}
              />
              <Select
                cols={2}
                id="medicoId"
                name="medicoId"
                title="Médico"
                options={medicoOptions}
                value={form.medicoId}
                onChange={handleChange}
              />
              <Input
                id="data"
                name="data"
                title="Data da Consulta"
                type="date"
                value={form.data}
                onChange={handleChange}
                cols={2}
              />
              <Select
                id="hora"
                name="hora"
                title="Horário"
                options={horarioOptions}
                value={form.hora}
                onChange={handleChange}
                cols={2}
              />
            </div>
          </div>
        </div>

        <ModalButtons
          onCancel={closeModal}
          onConfirm={handleConfirm}
          confirmText={isEditing ? "Salvar Alterações" : "Agendar"}
        />
      </div>
    </ModalMainLayout>
  );
}

export default Modal;

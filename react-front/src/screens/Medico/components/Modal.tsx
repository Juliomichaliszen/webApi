/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { useModal } from "@/contexts/ModalContext";
import Input from "@/components/Input";
import ModalMainLayout from "@/components/ModalMainLayout";
import ModalButtons from "@/components/ModalButtons";
import LoadingOverlay from "@/components/LoadingOverlay";

import { useCreatePaciente } from "@/lib/hooks/useCreatePaciente";
import { useUpdatePaciente } from "@/lib/hooks/useUpdatePaciente";
import { getApiErrors } from "@/lib/utils/getApiErrors";
import { Medico } from "@/lib/types/Medico";
import { medicoSchema } from "@/lib/schemas/medicoSchema";
import { createMedico, updateMedico } from "@/lib/services/medicoService";
import { useCreateMedico } from "@/lib/hooks/useCreateMedico";
import { useUpdateMedico } from "@/lib/hooks/useUpdateMedico";

interface ModalProps {
  medico?: Medico;
}

type SimpleChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | { target: { name: string; value: string | boolean } };

function Modal({ medico }: ModalProps) {
  const isEditing = !!medico;

  const { closeModal } = useModal();
  const createPaciente = useCreatePaciente();
  const updatePaciente = useUpdatePaciente();

  const [manualLoading, setManualLoading] = useState(false);
  const isSubmitting = createPaciente.isPending || updatePaciente.isPending;

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { mutate: createMedico, isPending: isCreating } = useCreateMedico();
  const { mutate: updateMedico, isPending: isUpdating } = useUpdateMedico();

  const [form, setForm] = useState({
    nome: medico?.nome || "",
    especialidade: medico?.especialidade || "",
  });

  function handleChange(e: SimpleChangeEvent) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleConfirm() {
    const result = medicoSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length) fieldErrors[err.path[0] as string] = err.message;
        toast.error(err.message);
      });
      setFormErrors(fieldErrors);
      return;
    }
    setFormErrors({});

    const apiPayload = {
      nome: result.data.nome,
      especialidade: result.data.especialidade,
    };

    setManualLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const onSuccess = () => {
      toast.success(
        isEditing
          ? "Medico atualizado com sucesso!"
          : "Medico criado com sucesso!"
      );
      closeModal();
    };
    const onError = (error: any) => {
      const apiError = error?.response?.data;
      if (apiError?.field && apiError?.message) {
        setFormErrors((prev) => ({
          ...prev,
          [apiError.field]: apiError.message,
        }));
      } else {
        getApiErrors(error);
      }
      setManualLoading(false);
    };

    if (isEditing) {
      updateMedico(
        { id: medico!.id, payload: apiPayload },
        { onSuccess, onError }
      );
    } else {
      createMedico(apiPayload, { onSuccess, onError });
    }
  }

  return (
    <ModalMainLayout title={isEditing ? "Editar Medico" : "Cadastro de Medico"}>
      {(manualLoading || isSubmitting) && (
        <LoadingOverlay text="Salvando medico..." />
      )}

      <div className="flex flex-col flex-1 gap-4 justify-between">
        <div className="flex-1 flex flex-col gap-[20px] px-[20px]">
          <div className="grid grid-cols-4 gap-4 w-full">
            <Input
              name="nome"
              id="nome"
              title="Nome Completo"
              type="text"
              placeholder="Digite o Nome Completo"
              cols={4}
              value={form.nome}
              onChange={handleChange}
              error={formErrors.nome}
            />
            <Input
              name="especialidade"
              id="especialidade"
              title="Especialidade"
              type="text"
              placeholder="Especialidade"
              cols={2}
              value={form.especialidade}
              onChange={handleChange}
              error={formErrors.especialidade}
            />
          </div>
        </div>

        <ModalButtons
          onConfirm={handleConfirm}
          onCancel={closeModal}
          confirmText={isEditing ? "Salvar" : "Cadastrar"}
        />
      </div>
    </ModalMainLayout>
  );
}

export default Modal;

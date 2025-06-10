/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalButtons from "@/components/ModalButtons";
import { useModal } from "@/contexts/ModalContext";
import { useCreateConsulta } from "@/lib/hooks/useCreateConsulta";
import { toast } from "react-toastify";
import { getApiErrors } from "@/lib/utils/getApiErrors";
import ConfirmCard from "./ConfirmCard";

type ConfirmModalProps = {
  modalId: string;
  agendamento: {
    dataHora: string;
    pacienteId: number;
    medicoId: number;
    payload: any;
  };
};

function ConfirmModal({ modalId, agendamento }: ConfirmModalProps) {
  const { closeModal } = useModal();
  const createConsulta = useCreateConsulta();

  // const [datePart, timePart] = agendamento.payload.scheduleDate.split("T");
  // const displayDatetime = `${datePart} ${timePart.slice(0, 5)}`; // "13/05/2032 18:30"

  const displayDatetime = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  }).format(new Date(agendamento.payload.scheduleDate));

  function handleConfirmarAgendamento() {
    createConsulta.mutate(agendamento.payload, {
      onSuccess: () => {
        toast.success("Consulta criado com sucesso!");
        closeModal(modalId);
        closeModal("main");
      },
      onError: (error: any) => {
        getApiErrors(error);
      },
    });
  }

  return (
    <div className="bg-[var(--branco1)]  w-[400px] h-[400px] max-h-[400px] rounded-[15px] flex flex-col gap-[10px]">
      <div className="bg-[var(--cinza200)] rounded-t-[15px] border-b border-[var(--cinza100)] pl-[10px] h-[40px] flex items-center">
        <p className="text-sm leading-[100%]">Confirmar Agendamento</p>
      </div>
      <div className="flex flex-col text-sm px-[20px] gap-[10px]">
        <ConfirmCard title="Paciente:" text={agendamento.pacienteId} />
        <ConfirmCard title="Profissional:" text={agendamento.medicoId} />
        <ConfirmCard title="Data e Hora:" text={displayDatetime} />
      </div>
      <ModalButtons
        onCancel={() => closeModal(modalId)}
        onConfirm={handleConfirmarAgendamento}
      />
    </div>
  );
}

export default ConfirmModal;

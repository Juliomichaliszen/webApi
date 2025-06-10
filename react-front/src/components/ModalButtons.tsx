import { useModal } from "@/contexts/ModalContext";
import Image from "next/image";

const cancel = "/cancel.svg";

type ModalButtonProps = {
  onCancel?: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  cancelText?: string;
  confirmText?: string;
};

function ModalButtons({
  onCancel,
  onConfirm,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  disabled = false,
}: ModalButtonProps) {
  const { closeModal } = useModal();

  return (
    <div className="flex justify-between px-[10px] md:px-[20px]">
      <button
        style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
        className="flex gap-2 items-center justify-center border border-[var(--cinza100)] rounded-[5px] bg-[var(--cinza200)] hover:bg-[var(--laranja50)]  py-2 cursor-pointer transition-all max-h-[35px] w-[175px] text-sm"
        onClick={() => {
          if (onCancel) {
            onCancel();
          } else {
            closeModal();
          }
        }}
      >
        <Image width={12} height={12} src={cancel} alt="Cancelar/fechar" />
        <p className="leading-[100%]">{cancelText}</p>
      </button>
      <button
        disabled={disabled}
        onClick={() => {
          onConfirm();
        }}
        style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
        className="flex gap-2 items-center justify-center  rounded-[5px] bg-[var(--azul100)] py-2 cursor-pointer active:bg-[var(--azul500)] w-[175px] max-h-[35px] transition text-sm"
      >
        <p>{confirmText}</p>
      </button>
    </div>
  );
}

export default ModalButtons;

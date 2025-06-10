import Image from "next/image";
import { ReactNode } from "react";

const closeIcon = "/close.svg";
const cleanFilter = "/delete.svg";
const filtro = "/filtro.svg";

type FilterDropdownProps = {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  onConfirm: () => void;
  children: ReactNode;
};

export default function FilterDropdown({
  open,
  onClose,
  children,
  onClear,
  onConfirm,
}: FilterDropdownProps) {
  if (!open) return null;

  return (
    <div
      style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
      className="absolute right-0 top-full mt-1 z-50 w-max min-w-[380px] max-w-[380px] rounded-[5px] border border-[var(--cinza100)]  bg-white shadow-lg pb-[10px]"
    >
      <div className="flex justify-between items-center bg-[var(--cinza200)] py-[5px] px-[10px] border-b border-[var(--cinza100)] ">
        <p className="leading-[100%]">Filtros</p>
        <button
          onClick={onClose}
          className=" rounded-b-md px-[4px] py-[5px] cursor-pointer"
        >
          <Image src={closeIcon} alt="fechar" width={12} height={12} />
        </button>
      </div>
      <div className="p-[10px]">{children}</div>
      <div className="px-[10px] pt-[5px] flex justify-between">
        <button
          onClick={onClear}
          style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
          className="rounded-[5px] px-[18px] py-[10px] flex items-center gap-[5px] justify-center border border-[var(--cinza100)] cursor-pointer hover:bg-[var(--cinza200)] transition-all"
        >
          <Image
            className="pb-[2px]"
            src={cleanFilter}
            alt="limpar filtro"
            width={15}
            height={12}
          />
          <p className="leading-[100%]">Limpar</p>
        </button>
        <button
          onClick={onConfirm}
          className="rounded-[5px] px-[55px] py-[10px] flex items-center gap-[5px] justify-center bg-[var(--azul100)] cursor-pointer hover:bg-[#2fa3d9] transition-all"
        >
          <Image
            className="pb-[2px]"
            src={filtro}
            alt="filtrar"
            width={15}
            height={12}
          />
          <p className="leading-[100%]">Filtrar</p>
        </button>
      </div>
    </div>
  );
}

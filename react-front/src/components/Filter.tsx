"use client";

import Image from "next/image";
import { ReactNode } from "react";

const exportarimg = "/export.svg";
const limpar = "/delete.svg";
const filtro = "/filtro.svg";

type FilterProps = {
  exportar?: boolean;
  children: ReactNode;
  onClear?: () => void;
};

function Filter({ children, exportar = true, onClear }: FilterProps) {
  return (
    <div className="border bg-[var(--cinza200)] p-4 flex flex-col gap-4">
      <h3 className="text-xl font-bold">Filtros</h3>
      <div className="w-full grid grid-cols-4 md:grid-cols-10 gap-4">
        {children}
      </div>
      <div className="grid grid-cols-10 gap-4">
        <div
          className={`${
            exportar ? "col-span-4 grid " : "hidden md:grid md:col-span-4"
          } grid-cols-3 md:col-span-6`}
        >
          {exportar && (
            <div
              style={{ boxShadow: "0px 4px 0px 0px #000000" }}
              className="col-span-3 md:col-span-2 lg:col-span-1 flex items-center justify-center gap-2 bg-[var(--azul50)] active:bg-[var(--azul100)] transition-all border py-2 cursor-pointer"
            >
              <Image
                width={12}
                height={12}
                alt="exportar lista"
                src={exportarimg}
              />
              <p className="">Exportar</p>
            </div>
          )}
        </div>
        <div
          className={`${exportar ? "col-span-3 " : "col-span-5"} md:col-span-2`}
        >
          <div
            onClick={onClear}
            style={{ boxShadow: "0px 4px 0px 0px #000000" }}
            className=" flex items-center justify-center gap-2 bg-[var(--laranja50)] active:bg-[var(--laranja200)] transition-all border py-2 cursor-pointer"
          >
            <Image width={12} height={12} alt="limpar filtro" src={limpar} />
            <p className="">Limpar</p>
          </div>
        </div>
        <div
          className={`${exportar ? "col-span-3 " : "col-span-5"} md:col-span-2`}
        >
          <div
            style={{ boxShadow: "0px 4px 0px 0px #000000" }}
            className=" flex items-center justify-center gap-2 bg-[var(--laranja)] active:bg-[var(--vermelho)] transition-all border py-2 cursor-pointer"
          >
            <Image width={12} height={12} alt="filtrar lista" src={filtro} />
            <p className="">Filtrar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

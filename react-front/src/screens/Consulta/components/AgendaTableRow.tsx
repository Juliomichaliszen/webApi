"use client";

import ActionMenu from "@/components/ActionsMenu";
import TableCell from "@/components/TableCell";
import TableRowWrapper from "@/components/TableRowWrapper";
import Image from "next/image";
import { useState } from "react";
import { Paciente } from "@/lib/types/Paciente";
import { Medico } from "@/lib/types/Medico";
import { format } from "date-fns";

const user = "/user-agenda.svg";
const chevron = "/chevronDownBlack.svg";

type AgendaTableRowProps = {
  paciente: Paciente;
  medico: Medico;
  data: string;
  onEdit: () => void;
  onDelete: () => void;
};

function AgendaTableRow({
  paciente,
  medico,
  data,
  onEdit,
  onDelete,
}: AgendaTableRowProps) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const handleToggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  const dataFormatada = data
    ? format(new Date(data), "dd/MM/yyyy 'às' HH:mm")
    : "Data indisponível";

  return (
    <>
      <TableRowWrapper>
        <TableCell
          colSpan={12}
          className="flex-col justify-center  items-start gap-0 "
        >
          <div className="col-span-12 lg:hidden flex w-full flex-col gap-[10px] ">
            <div
              onClick={handleToggleDetails}
              className="flex justify-between items-center bg-[var(--branco4)] pl-[10px] py-[5px] pr-[18px] cursor-pointer rounded-b-[15px]"
            >
              <div>
                <div className="flex gap-[5px] items-center">
                  <Image src={user} alt="" width={20} height={20} />
                  <p className="">{paciente.nome}</p>
                </div>
              </div>
              <Image
                src={chevron}
                alt="expandir"
                width={10}
                height={6}
                className={`transform transition-transform duration-200 ${
                  isDetailsVisible ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {isDetailsVisible && (
              <div className=" lg:hidden bg-[var(--cinza200)] row-span-2 flex flex-col pl-[10px] pr-[18px] pt-[23px] pb-[14px]">
                <div className="grid grid-cols-2">
                  <p className="font-semibold">Medico</p>
                  <p className="">{medico.nome}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-semibold">Data e Hora</p>
                  <p className="">{dataFormatada}</p>
                </div>
                <div className={`grid mt-[10px] grid-cols-2`}>
                  <p className="font-semibold">Ações</p>
                  <div className="col-span-1 lg:flex items-center">
                    <ActionMenu onDelete={onDelete} onEdit={onEdit} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </TableCell>
        <TableCell
          className="hidden lg:flex pl-2 flex-col justify-center items-start w-full gap-0 py-[3px]"
          colSpan={4}
        >
          <div className="flex gap-[5px] items-center">
            <Image src={user} alt="" width={20} height={20} />
            <p className="">{paciente.nome}</p>
          </div>
        </TableCell>
        <TableCell className="hidden lg:flex" colSpan={4}>
          {medico.nome}
        </TableCell>

        <TableCell colSpan={2} className="hidden lg:flex">
          {" "}
          <div className="flex flex-col">{dataFormatada}</div>
        </TableCell>
        <div className=" hidden col-span-1 lg:flex items-center py-1">
          {/* <ActionMenu onDelete={onDelete} onEdit={onEdit} /> */}
          <ActionMenu />
        </div>
      </TableRowWrapper>
    </>
  );
}

export default AgendaTableRow;

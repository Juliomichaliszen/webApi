"use client";

import { toast } from "react-toastify";
import TableRowWrapper from "@/components/TableRowWrapper";
import TableCell from "@/components/TableCell";
import UserInfoCell from "@/components/UserInfoCell";
import ActionMenu from "@/components/ActionsMenu";
import Image from "next/image";
import { useState } from "react";

const chevron = "/chevronDownBlack.svg";

type PacienteTableRowPacienteps = {
  id: number;
  name: string;
  cpf: string;
  dataNascimento: string;
  onEdit: () => void;
  onDelete: () => void;
};

function PacienteTableRow({
  id,
  name,
  cpf,
  onEdit,
  onDelete,
  dataNascimento,
}: PacienteTableRowPacienteps) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const handleToggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <TableRowWrapper>
      <TableCell
        colSpan={12}
        className="flex-col justify-center items-start gap-0 "
      >
        <div className="col-span-12 lg:hidden flex flex-col w-full gap-[10px] ">
          <div
            onClick={handleToggleDetails}
            className="flex justify-between items-center bg-[var(--branco4)] pl-[10px] py-[5px] pr-[18px] cursor-pointer rounded-b-[15px]"
          >
            <UserInfoCell name={name} />

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
            <div className=" lg:hidden bg-[var(--cinza200)] row-span-2 flex flex-col gap-[15px] pl-[10px] pr-[18px] pt-[23px] pb-[14px] ">
              <div className="grid grid-cols-2">
                <p className="font-semibold">Dt. Nascimento</p>
                <p className="">{dataNascimento}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="font-semibold">CPF</p>
                <p className="">{cpf}</p>
              </div>
              <div className={`grid mt-[10px] grid-cols-2`}>
                <p className="font-semibold">Ações</p>
                <div className="col-span-1 lg:flex items-center">
                  <ActionMenu onEdit={onEdit} onDelete={onDelete} />
                </div>
              </div>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell
        className="hidden lg:flex pl-2 flex-col justify-center items-start gap-0 py-[4px]"
        colSpan={4}
      >
        <UserInfoCell name={name} />
      </TableCell>
      <TableCell colSpan={3} className="hidden lg:flex">
        {cpf}
      </TableCell>
      <TableCell className="hidden lg:flex" colSpan={4}>
        {dataNascimento}
      </TableCell>
      <div className="hidden lg:flex items-center py-1 col-span-1">
        <ActionMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
    </TableRowWrapper>
  );
}

export default PacienteTableRow;

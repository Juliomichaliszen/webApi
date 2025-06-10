"use client";

import MainLayout from "@/components/MainLayout";
import PacienteTableRow from "./components/PacienteTableRow";
import TableLayout from "@/components/TableLayout";
import { useModal } from "@/contexts/ModalContext";
import Modal from "./components/Modal";
import { Paciente } from "@/lib/types/Paciente";
import { useState } from "react";
import { usePacientes } from "@/lib/hooks/usePacientes";
import TableError from "@/components/TableError";
import TableLoading from "@/components/TableLoading";
import { formatCpfView } from "@/lib/utils/formatters";
import TopBar from "@/components/TopBar";
import ExportButton from "@/components/ExportButton";
import SearchInput from "@/components/SearchInput";
import { format } from "date-fns";
import { useDeletePaciente } from "@/lib/hooks/useDeletePaciente";

const add = "/add.svg";

const headers = [
  { title: "Nome", cols: 4 },
  { title: "CPF", cols: 3 },
  { title: "Dt. Nascimento", cols: 4 },
  { title: "Ações", cols: 1 },
];

function Pacientes() {
  const { openModal } = useModal();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editingPacient, setEditingPacient] = useState<Paciente | null>(null);

  const { data: pacientes, isLoading, isError } = usePacientes();

  const { mutate: deletePaciente, isPending: isDeleting } = useDeletePaciente();

  function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir este paciente?")) {
      deletePaciente(id);
    }
  }

  function handleEdit(paciente: Paciente) {
    setEditingPacient(paciente);
    openModal(<Modal paciente={paciente} />);
  }

  function handleOpenCreate() {
    setEditingPacient(null);
    openModal(<Modal />);
  }

  return (
    <>
      <MainLayout>
        <TopBar
          title="Lista de Pacientes"
          btnText="Novo Paciente"
          btnImg={add}
          btnClick={handleOpenCreate}
        >
          <SearchInput
            name="busca"
            id="busca"
            value=""
            onChange={(e) => console.log(e)}
          />
          <ExportButton />
        </TopBar>

        <TableLayout headers={headers}>
          {isLoading && <TableLoading />}
          {isError && <TableError />}

          {!isLoading &&
            pacientes?.map((paciente: Paciente) => {
              // const parsedDate = parse(pacient.birthDate, 'dd/MM/yyyy', new Date());
              const formattedBirthDate = paciente.dataNascimento
                ? format(new Date(paciente.dataNascimento), "dd/MM/yyyy")
                : "--/--/----";

              return (
                <PacienteTableRow
                  key={paciente.id}
                  id={paciente.id}
                  onDelete={() => handleDelete(paciente.id)}
                  dataNascimento={formattedBirthDate}
                  name={paciente.nome}
                  cpf={formatCpfView(paciente.cpf)}
                  onEdit={() => handleEdit(paciente)}
                />
              );
            })}
        </TableLayout>
      </MainLayout>
    </>
  );
}

export default Pacientes;

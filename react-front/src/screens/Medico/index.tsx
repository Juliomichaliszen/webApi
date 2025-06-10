"use client";

import MainLayout from "@/components/MainLayout";
import TableLayout from "@/components/TableLayout";
import { useModal } from "@/contexts/ModalContext";
import Modal from "./components/Modal";
import { useState } from "react";
import TableLoading from "@/components/TableLoading";
import TopBar from "@/components/TopBar";
import ExportButton from "@/components/ExportButton";
import SearchInput from "@/components/SearchInput";
import MedicoTableRow from "./components/MedicoTableRow";
import { Medico } from "@/lib/types/Medico";
import { useMedicos } from "@/lib/hooks/useMedicos";
import { deleteMedico } from "@/lib/services/medicoService";

const add = "/add.svg";

const headers = [
  { title: "Nome", cols: 5 },
  { title: "Especialidade", cols: 5 },
  { title: "Ações", cols: 2 },
];

function Medicos() {
  const { openModal } = useModal();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editingMedico, setEditingMedico] = useState<Medico | null>(null);

  const { data: medicos, isLoading } = useMedicos();

  function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir este medico?")) {
      deleteMedico(id);
    }
  }

  function handleEdit(medico: Medico) {
    setEditingMedico(medico);
    openModal(<Modal medico={medico} />);
  }

  function handleOpenCreate() {
    setEditingMedico(null);
    openModal(<Modal />);
  }

  return (
    <>
      <MainLayout>
        <TopBar
          title="Lista de Medicos"
          btnText="Novo Medico"
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

          {!isLoading &&
            medicos?.map((medico: Medico) => {
              return (
                <MedicoTableRow
                  key={medico.id}
                  id={medico.id}
                  nome={medico.nome}
                  especialidade={medico.especialidade}
                  onDelete={() => handleDelete(medico.id)}
                  onEdit={() => handleEdit(medico)}
                />
              );
            })}
        </TableLayout>
      </MainLayout>
    </>
  );
}

export default Medicos;

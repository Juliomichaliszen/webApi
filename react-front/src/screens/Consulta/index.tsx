"use client";

import MainLayout from "@/components/MainLayout";
import AgendaTableRow from "./components/AgendaTableRow";
import TableLayout from "@/components/TableLayout";
import TableLoading from "@/components/TableLoading";
import TableError from "@/components/TableError";
import { useModal } from "@/contexts/ModalContext";
import Modal from "./components/Modal";
import { formatDate } from "@/lib/utils/date";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import SearchInput from "@/components/SearchInput";
import ExportButton from "@/components/ExportButton";
import { useConsultas, useDeleteConsulta } from "@/lib/hooks/useConsultas";
import { Consulta } from "@/lib/types/Consulta";

const docs = "./doc.svg";

const headers = [
  { title: "Nome Paciente", cols: 4 },
  { title: "Nome Medico", cols: 4 },
  { title: "Dt. Consulta", cols: 2 },
  { title: "Ações", cols: 2 },
];

function Consultas() {
  const { openModal } = useModal();
  const [editingConsulta, setEditingConsulta] = useState<Consulta | null>(null);

  const { data: consultas, isLoading, isError } = useConsultas();
  const { mutate: deleteConsulta, isPending: isDeleting } = useDeleteConsulta();

  function handleDelete(id: number) {
    // Ajuste a mensagem de confirmação.
    if (window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
      deleteConsulta(id);
    }
  }

  function handleEdit(consulta: Consulta) {
    setEditingConsulta(consulta);
    openModal(<Modal modalId="main" consulta={consulta} />);
  }

  function handleOpen() {
    openModal(<Modal modalId="main" />, "main");
  }

  return (
    <>
      <MainLayout>
        <TopBar
          title="Lista de Consultas"
          btnText="Nova Consulta"
          btnImg={docs}
          btnClick={handleOpen}
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
            consultas?.map((consulta: Consulta) => {
              return (
                <AgendaTableRow
                  key={consulta.id}
                  paciente={consulta.paciente}
                  medico={consulta.medico}
                  data={consulta.dataHora}
                  onDelete={() => handleDelete(consulta.id)}
                  onEdit={() => handleEdit(consulta)}
                />
              );
            })}
        </TableLayout>
      </MainLayout>
    </>
  );
}

export default Consultas;

"use client";
import "../globals.css";
import SideMenu from "@/components/SideMenu";

export default function ProfissionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { to: "/consulta", text: "Consultas", img: "/agenda.svg" },
    { to: "/medico", text: "Medicos", img: "/addDoctor.svg" },
    { to: "/paciente", text: "Pacientes", img: "/pacients.svg" },
  ];
  const profissional = "/doctorIcon.svg";

  return (
    <div className="flex h-screen">
      <SideMenu
        links={links}
        role={"Profissional"}
        icon={profissional}
        bgcolor="#4be2c6"
      />
      <main className="flex-1 flex bg-[var(--background)]">{children}</main>
    </div>
  );
}

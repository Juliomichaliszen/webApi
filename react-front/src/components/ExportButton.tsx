"use client";

import Image from "next/image";

const exportar = "/export.svg";

function ExportButton() {
  return (
    <button className="border min-w-[36px] min-h-[36px] flex items-center justify-center rounded-[5px] border-[var(--cinza100)] mx-[10px] bg-[var(--branco1)] cursor-pointer">
      <Image src={exportar} alt="exportar lista" width={12} height={12} />
    </button>
  );
}

export default ExportButton;

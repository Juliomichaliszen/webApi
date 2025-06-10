"use client";

import React from "react";
import TableLoading from "./TableLoading";

type LoadingOverlayProps = {
  text?: string;
};

function LoadingOverlay({ text = "Carregando..." }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <TableLoading />
        <span className="text-white font-bold text-2xl animate-pulse">
          {text}
        </span>
      </div>
    </div>
  );
}

export default LoadingOverlay;

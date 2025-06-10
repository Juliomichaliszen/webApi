"use client";

import React from "react";
import Image from "next/image";
import { useModal } from "@/contexts/ModalContext";

const closeIcon = "/close.svg";

export function ModalContainer() {
  const { modals, closeModal } = useModal();

  if (modals.length === 0) return null;

  return (
    <>
      {modals.map((modalItem, index) => {
        const isTop = index === modals.length - 1;

        return (
          <div
            key={modalItem.id}
            style={{ zIndex: 1000 + index }}
            className={`
              fixed inset-0 
              flex items-center justify-center
              transition-all duration-300
              ${
                isTop
                  ? "bg-black/50 pointer-events-auto"
                  : "bg-black/30 pointer-events-none"
              }
            `}
          >
            <div
              className="
                relative min-w-[300px] min-h-[100px]
                transition-transform
              "
            >
              {modalItem.content}

              <button
                onClick={() => closeModal(modalItem.id)}
                className="absolute top-2 right-3 w-[24px] h-[24px] font-bold flex items-center justify-center cursor-pointer"
              >
                <Image width={10} height={10} src={closeIcon} alt="Fechar" />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

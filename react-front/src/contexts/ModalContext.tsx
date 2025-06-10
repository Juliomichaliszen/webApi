"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface ModalItem {
  id: string;
  content: ReactNode;
}

interface ModalContextData {
  modals: ModalItem[];
  openModal: (content: ReactNode, forcedId?: string) => string;
  closeModal: (id?: string) => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalItem[]>([]);

  function openModal(content: ReactNode, forcedId?: string) {
    const newId = forcedId || uuidv4();
    const newModal: ModalItem = {
      id: newId,
      content,
    };
    setModals((current) => [...current, newModal]);
    return newId;
  }

  function closeModal(id?: string) {
    if (!id) {
      setModals((current) => current.slice(0, -1));
    } else {
      setModals((current) => current.filter((m) => m.id !== id));
    }
  }

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

"use client";

import { useAuth } from "@/contexts/AuthContext";
import ModalButtons from "./ModalButtons";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";

function LogoutModal() {
  const { closeModal } = useModal();
  const { logout, user } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    closeModal();
    router.push("/login");
  }

  return (
    <div className="max-w-[500px] min-w-[300px] w-[500px] h-[200px] bg-[var(--branco1)] flex flex-col rounded-[15px] pb-4">
      <div className="bg-[var(--cinza200)] py-[12px] pl-[10px] flex items-center rounded-t-[15px]">
        <h4 className={`text-sm`}>Deseja mesmo sair ?</h4>
      </div>
      <div className="flex-1 flex flex-col gap-2 text-xl">
        <div className="flex-1 flex flex-col items-center justify-center">
          <p>Sair de Dr.Fast com email:</p>
          <p className="font-semibold">{user?.email}</p>
        </div>
      </div>

      <ModalButtons onConfirm={handleLogout} />
    </div>
  );
}

export default LogoutModal;

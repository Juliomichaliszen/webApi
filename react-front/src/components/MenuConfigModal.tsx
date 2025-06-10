"use client";

import { useModal } from "@/contexts/ModalContext";
import Input from "./Input";
import ModalButtons from "./ModalButtons";
import ModalMainLayout from "./ModalMainLayout";

function MenuConfigModal() {
  const { closeModal } = useModal();

  return (
    <ModalMainLayout title="Cadastro Configurações - Alterar senha">
      <div className="flex flex-col flex-1 gap-4 justify-between">
        <div className="flex-1 flex flex-col gap-4 px-[20px]">
          <div className=" grid grid-cols-4 gap-4 w-full ">
            <Input
              name="senhaAtual"
              id="senhaAtual"
              title="Senha Atual"
              type="password"
              placeholder="Digite sua senha atual"
              cols={4}
            />
            <Input
              name="novaSenha"
              id="novaSenha"
              title="Nova Senha"
              type="password"
              placeholder="Digite a nova senha "
              cols={4}
            />
            <Input
              name="confirmeSenha"
              id="confirmeSenha"
              title="Confirme a nova senha"
              type="password"
              placeholder="Digite a nova senha "
              cols={4}
            />
          </div>
        </div>

        <ModalButtons
          onConfirm={() => console.log("confirm")}
          onCancel={closeModal}
          confirmText="Cadastrar"
        />
      </div>
    </ModalMainLayout>
  );
}

export default MenuConfigModal;

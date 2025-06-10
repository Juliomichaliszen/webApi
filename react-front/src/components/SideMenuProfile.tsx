"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MenuConfigModal from "./MenuConfigModal";
import LogoutModal from "./LogoutModal";
import Link from "next/link";

const config = "/config.svg";
const logout = "/logout.svg";
const seta = "/arrow-up.svg";

type SideMenuProfileProps = {
  icon: string;
  role: string;
  bgcolor: string;
};

function SideMenuProfile({ icon, role, bgcolor }: SideMenuProfileProps) {
  const { user } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { openModal } = useModal();

  function handleOpenConfig() {
    openModal(<MenuConfigModal />);
  }

  function handleOpenLogout() {
    openModal(<LogoutModal />);
  }

  const formatName = (name: string) => {
    if (name.includes("@")) {
      return name.split("@")[0];
    }

    const partes = name.trim().split(" ");
    return partes[0];
  };

  return (
    <div className="flex gap-4 items-center w-full ">
      <div className="w-12 h-12 flex items-center justify-center  rounded-full relative">
        <div
          ref={buttonRef}
          onClick={() => setShowMenu((prev) => !prev)}
          className="bg-[var(--branco1)] w-[40px] h-[40px] rounded-full flex items-center justify-center p-2 border border-[var(--cinza100)] cursor-pointer"
        >
          <Image width={30} height={30} src={icon} alt="Entre no seu Perfil" />
        </div>
        <div
          ref={menuRef}
          className={`absolute ml-6 -top-12/12 left-full -translate-x-5 mt-2 px-2 pb-1 -translate-y-1/12  bg-[var(--branco01)] border border-[var(--cinza100)] rounded-[5px] shadow-md z-10 w-38 text-xs flex flex-col transition-all duration-700 ease-in-out ${
            showMenu
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleOpenConfig();
              setShowMenu(false);
            }}
            className="flex gap-2 cursor-pointer  border-[var(--cinza300)] p-2 "
          >
            <Image width={20} height={20} src={config} alt="configurações" />
            <p>Configurações </p>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleOpenLogout();
              setShowMenu(false);
            }}
            className="flex items-end gap-3 cursor-pointer p-2 mt-1"
          >
            <Image
              className="w-[18px] h-[18px]"
              width={20}
              height={20}
              src={logout}
              alt="sair"
            />
            <p>Sair </p>
          </div>
          <div>
            <Link
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
              }}
              href="#"
              className="pl-2 text-xs font-light text-[var(--preto2)] "
            >
              Termos & Condições
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden w-full md:flex  items-center justify-between">
        <div className="flex flex-col justify-between text-white ">
          <p className="text-sm">
            Olá, {user?.name ? formatName(user.name) : ""}
          </p>
          <p
            style={{
              backgroundColor: bgcolor,
            }}
            className="rounded-[5px] text-[10px] font-bold px-[5px] py-[3px] w-fit"
          >
            {role}
          </p>
        </div>
        <div className="flex flex-col gap-1 ">
          <Image src={seta} alt="" width={11} height={5} />
          <Image
            className="rotate-180"
            src={seta}
            alt=""
            width={11}
            height={5}
          />
        </div>
      </div>
    </div>
  );
}

export default SideMenuProfile;

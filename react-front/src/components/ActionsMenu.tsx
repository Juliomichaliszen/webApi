import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ActionsButton from "./ActionsButton";
// import { toast } from "react-toastify";

type ActionMenuProps = {
  onEdit?: () => void;
  onToggleStatus?: () => void;
  onDelete?: () => void;
  status?: boolean;
  onDownload?: string;
};

const actionsIcon = "/acoes.svg";
const inactiveIcon = "/inactive.svg";
const editIcon = "/edit.svg";
const downloadIcon = "/link-medico.svg";
const deleteIcon = "/delete.svg";

export default function ActionMenu({
  onEdit,
  onToggleStatus,
  status,
  onDownload,
  onDelete,
}: ActionMenuProps) {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative ">
      <div className="flex ">
        <div
          ref={buttonRef}
          className="w-[40px] h-[40px] bg-[var(--branco4)] border border-[var(--cinza100)] rounded-[5px] flex items-center justify-center cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Image width={16} height={13} src={actionsIcon} alt="ações" />
        </div>

        <div className="w-12 ">
          <div
            ref={menuRef}
            className={`absolute top-12/12 left -translate-x-2 -translate-y-1/2 mr-2 bg-[var(--branco1)] rounded-[5px] border border-[var(--cinza100)] shadow-md z-10 w-29 text-xs flex flex-col transition-all duration-700 ease-in-out ${
              showMenu
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {onEdit && (
              <ActionsButton
                text="Editar"
                img={editIcon}
                click={() => {
                  setShowMenu(false);
                  onEdit();
                }}
              />
            )}

            {onDelete && (
              <ActionsButton
                text="Excluir"
                img={deleteIcon}
                click={() => {
                  setShowMenu(false);
                  onDelete();
                }}
              />
            )}
            {onToggleStatus && (
              <ActionsButton
                text={status ? "Inativar" : "Ativar"}
                img={inactiveIcon}
                click={() => {
                  setShowMenu(false);
                  onToggleStatus();
                }}
              />
            )}
            {onDownload && (
              <a
                onClick={() => {
                  setShowMenu(false);
                }}
                href={onDownload}
                target="_blank"
                className="pl-[6px] pr-[8px] py-[3px] flex gap-[4px] cursor-pointer hover:bg-[var(--cinza300)] text-left transition"
              >
                <Image
                  width={10}
                  height={10}
                  src={downloadIcon}
                  alt="download"
                />
                <p className="text-sm whitespace-nowrap">Link Gravação</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

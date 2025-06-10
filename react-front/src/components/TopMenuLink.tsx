"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TopMenuLinkProps = {
  to: string;
  text: string;
  click?: () => void;
  img: string;
};

function TopMenuLink({ to, text, click, img }: TopMenuLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      onClick={click}
      href={to}
      className={`flex gap-2 items-center w-full p-[10px] rounded-[5px] transition-all ${
        isActive ? "bg-[var(--preto2)]" : ""
      } 
        `}
    >
      <Image className="mb-1" src={img} alt={text} width={15} height={15} />
      {text}
    </Link>
  );
}

export default TopMenuLink;

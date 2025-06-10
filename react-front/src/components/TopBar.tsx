"use client";

import Image from "next/image";
import { ReactNode } from "react";

type TopBarProps = {
  children: ReactNode;
  title: string;
  btnText: string;
  btnImg: string;
  btnClick?: () => void;
};

function TopBar({ children, title, btnText, btnImg, btnClick }: TopBarProps) {
  return (
    <div
      style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
      className="w-full bg-[var(--branco3)] px-[10px] md:pl-[20px] py-[10px] 2xl:pr-[75px]  grid grid-cols-2 gap-[10px] "
    >
      <div className="col-span-2 lg:col-span-1 flex justify-between lg:justify-start w-full items-center gap-[20px]">
        <h3 className="text-sm md:text-[20px] font-bold">{title}</h3>
        {btnText && btnImg && (
          <button
            style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
            className="bg-[var(--azul400)] flex items-center h-[35px] justify-center gap-[5px] px-[18px] py-[6px] text-white rounded-[5px] hover:bg-[var(--azul600)] cursor-pointer active:bg-[var(--azul600)] transition-all text-xs"
            onClick={btnClick}
          >
            <Image width={12} height={12} src={btnImg} alt={btnText} />
            <p className="leading-[100%]">{btnText}</p>
          </button>
        )}
      </div>
      <div className="col-span-2 lg:col-span-1 flex w-full justify-end">
        {children}
      </div>
    </div>
  );
}

export default TopBar;

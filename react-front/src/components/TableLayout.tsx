"use client";

import { ReactNode } from "react";

type HeaderItem = {
  title: string;
  cols: number;
};

type TableLayoutProps = {
  headers: HeaderItem[];
  children: ReactNode;
  onPageChange?: (page: number) => void;
};

function TableLayout({ headers, children, onPageChange }: TableLayoutProps) {
  return (
    <div className="flex-1 flex flex-col justify-between pb-[13px] overflow-y-auto overflow-x-hidden">
      <div className="gap-[15px] w-full px-[10px] pt-[10px] md:pl-[20px] md:pt-[20px]  2xl:pr-[75px] pb-[10px]  ">
        <div
          style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
          className="flex flex-col row-span-11 rounded-[15px] flex-1"
        >
          <div className="hidden lg:grid grid-cols-12 bg-[var(--azul100)] rounded-t-[15px] font-semibold py-0.5">
            {headers.map((header, index) => (
              <div
                style={{
                  gridColumn: ` span ${header.cols} / span ${header.cols}`,
                }}
                key={index}
                className={`flex py-[10px] items-center justify-start ${
                  index === 0 ? "pl-2" : ""
                }`}
              >
                <p className="text-[14px] font-semibold leading-[100%]">
                  {header.title}
                </p>
              </div>
            ))}
          </div>
          <div className="flex lg:hidden bg-[var(--azul100)] rounded-t-[15px] font-semibold py-0.5">
            <div className={`flex py-[10px] items-center justify-start pl-2`}>
              <p className="text-[14px] whitespace-nowrap font-semibold leading-[100%]">
                {headers[0].title}
              </p>
            </div>
          </div>
          <div className=" flex-1 grid  rounded-b-[15px] border border-[var(--cinza100)] border-t-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableLayout;

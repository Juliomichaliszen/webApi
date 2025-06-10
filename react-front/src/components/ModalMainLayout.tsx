import { ReactNode } from "react";

type ModalMainLayoutProps = {
  children: ReactNode;
  title: string;
};

function ModalMainLayout({ children, title }: ModalMainLayoutProps) {
  return (
    <div
      style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
      className="bg-[var(--branco1)] flex flex-col border border-[var(--cinza100)] rounded-[15px] min-w-[300px] w-[380px] h-[675px] md:w-[600px] pb-[20px]"
    >
      <div className="bg-[var(--cinza200)] rounded-t-[15px] border-b border-[var(--cinza100)] pl-[10px] py-[10px] flex items-center mb-[20px]">
        <h3 className="text-sm ">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default ModalMainLayout;

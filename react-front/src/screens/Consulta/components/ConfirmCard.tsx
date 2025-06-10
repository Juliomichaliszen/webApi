"use client";

type ConfirmCardProps = {
  title: string;
  text: string | number;
};

function ConfirmCard({ title, text }: ConfirmCardProps) {
  return (
    <div className="flex items-center gap-2 h-[40px] border px-2 py-1 bg-[var(--cinza200)] rounded-[5px] border-[var(--cinza100)]">
      <p className="font-bold">{title}</p>
      <p>{text}</p>
    </div>
  );
}

export default ConfirmCard;

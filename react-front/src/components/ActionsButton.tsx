"use client";

import Image from "next/image";

type ActionsButtonProps = {
  text: string;
  img: string;
  click?: () => void;
};

function ActionsButton({ text, img, click }: ActionsButtonProps) {
  return (
    <button
      onClick={click}
      className="px-1  flex gap-2 cursor-pointer hover:bg-[var(--cinza300)] text-left transition"
    >
      <Image width={10} height={10} src={img} alt={img} />
      <p className="text-sm">{text}</p>
    </button>
  );
}

export default ActionsButton;

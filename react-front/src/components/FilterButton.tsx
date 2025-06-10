import Image from "next/image";

const filterIcon = "/filter.svg";

type FilterButtonProps = {
  click: () => void;
};

function FilterButton({ click }: FilterButtonProps) {
  return (
    <div
      onClick={click}
      className="border border-[var(--cinza100)] rounded-[5px] px-[5px] md:px-[20px] flex items-center gap-[5px] bg-[var(--branco1)] cursor-pointer hover:bg-[var(--cinza200)] transition-all min-w-[100px] justify-center"
    >
      <Image src={filterIcon} alt="filtros" width={12} height={12} />
      <p className="text-sm leading-[100%]">Filtros</p>
    </div>
  );
}

export default FilterButton;

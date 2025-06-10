"use client";

import Image from "next/image";

const busca = "/search.svg";

type SearchInputProps = {
  name: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchInput({ name, id, value, onChange }: SearchInputProps) {
  return (
    <div className="rounded-[5px] bg-[var(--branco1)] flex border border-[var(--cinza100)] pl-[5px] w-full lg:max-w-[250px]">
      <Image src={busca} alt="busca" width={15} height={15} />
      <input
        className="flex outline-none px-1 w-full"
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={(e) => {
          if (onChange) {
            const syntheticEvent = {
              ...e,
              target: {
                ...e.target,
                value: e.target.value,
                name: e.target.name,
              },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
          }
        }}
      />
      <select
        className="outline-none bg-[var(--cinza200)] text-[#767878] border-l border-[var(--cinza100)]  lg:px-[11px]"
        name="filter"
        id="filter"
      >
        <option value="name">Nome</option>
        <option value="clinic">Clínica</option>
      </select>
    </div>
  );
}

export default SearchInput;

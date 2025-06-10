"use client";

type Option = {
  value: string;
  text: string;
};

type SelectProps = {
  cols: number;
  title: string;
  name: string;
  id: string;
  options: Option[];
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

function Select({
  cols,
  title,
  name,
  id,
  options,
  placeholder,
  onChange,
  value,
}: SelectProps) {
  return (
    <div
      style={{ gridColumn: `span ${cols} / span ${cols}` }}
      className={`flex flex-col `}
    >
      <span className="text-sm">{title}</span>
      <select
        className="bg-[var(--branco3)] border border-[var(--cinza100)] rounded-[5px] min-h-[40px] outline-none text-[#7f8080]"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled>
          {placeholder || "Selecione"}
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

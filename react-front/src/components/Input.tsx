"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import {
  formatCnpjView,
  formatCpfView,
  formatNumberInput,
  formatPhoneView,
} from "@/lib/utils/formatters";
import { format } from "date-fns";

const eye = "/eye.svg";
const eyeOff = "/eye-off.svg";
const calendar = "/calendar.svg";

type CustomChangeEvent = {
  target: {
    name: string;
    value: string;
  };
};

type InputProps = {
  title: string;
  cols: number;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  img?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent
  ) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  error?: string;
};

// Isso é necessário pois o Tailwind não faz a build em tempo de complição sem isso
const colSpanMap: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
};

function formatVisual(field: string, value: string) {
  switch (field) {
    case "cpf":
      return formatCpfView(value);
    case "cnpj":
      return formatCnpjView(value);
    case "phone":
    case "telefone":
    case "celular":
      return formatPhoneView(value);
    default:
      return value;
  }
}

function cleanInput(field: string, value: string) {
  switch (field) {
    case "cpf":
      return formatNumberInput(value, 11);
    case "cnpj":
      return formatNumberInput(value, 14);
    case "phone":
    case "telefone":
    case "celular":
      return formatNumberInput(value, 11);
    default:
      return value;
  }
}

function Input({
  title,
  cols,
  type,
  name,
  id,
  placeholder,
  img,
  onChange,
  onFocus,
  value,
  error,
}: InputProps) {
  const colSpanClass = colSpanMap[cols];

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isDate = type === "date";

  const togglePassword = () => setShowPassword((prev) => !prev);

  const displayedValue = formatVisual(name, value?.toString() ?? "");

  const parsedDate =
    isDate && typeof value === "string" && value.trim() !== ""
      ? isoToLocalDate(value)
      : null;

  function isoToLocalDate(iso: string): Date {
    // aceita "YYYY-MM-DD" ou "YYYY-MM-DDTHH:MM[:SS]"
    const [datePart, timePart = "00:00"] = iso.split("T");
    const [y, m, d] = datePart.split("-").map(Number);
    const [hh, mm] = timePart.split(":").map(Number);
    return new Date(y, m - 1, d, hh, mm);
  }

  return (
    <div className={`flex flex-col col-span-2 ${colSpanClass} `}>
      <div className="flex items-center gap-4">
        <span className="text-sm">{title}</span>
        {/* {error && <p className="text-red-500 text-xs">{error}</p>} */}
      </div>
      <div
        className={`bg-[var(--branco3)] rounded-[5px] flex min-h-[40px] ${
          img || isPassword ? "pr-2" : ""
        } ${
          error ? "border  border-red-500" : "border border-[var(--cinza100)]"
        }`}
      >
        {!isDate ? (
          <input
            className="w-full px-2 h-full outline-none"
            placeholder={placeholder}
            type={isPassword && showPassword ? "text" : type}
            name={name}
            id={id}
            value={displayedValue}
            onChange={(e) => {
              const cleaned = cleanInput(name, e.target.value);
              if (onChange) {
                const syntheticEvent = {
                  ...e,
                  target: {
                    ...e.target,
                    value: cleaned,
                    name: e.target.name,
                  },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(syntheticEvent);
              }
            }}
            onFocus={onFocus}
          />
        ) : (
          <div className="w-full text-right px-2 flex items-center justify-end">
            <DatePicker
              selected={parsedDate}
              onChange={(date: Date | null) => {
                if (onChange) {
                  if (!date) {
                    onChange({ target: { name, value: "" } });
                    return;
                  }

                  const newDatePart = format(date, "yyyy-MM-dd"); // 13/05

                  const isoString = newDatePart;
                  onChange({
                    target: { name, value: isoString },
                  });
                }
              }}
              // locale={ptBR}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/aaaa"
              className="w-full outline-none"
              wrapperClassName="w-full"
              calendarClassName="calendar-right"
              popperPlacement="top-end"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
            <Image alt="selecione data" src={calendar} width={16} height={16} />
          </div>
        )}

        {img && <Image alt={title} src={img} width={20} height={20} />}

        {isPassword && (
          <button type="button" onClick={togglePassword} className="mr-2">
            <Image
              src={showPassword ? eyeOff : eye}
              alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;

function formatNumberInput(value: string, maxLength: number): string {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers.slice(0, maxLength);
}

// Formata visualmente
export function formatCpfView(value: string): string {
  const numbers = formatNumberInput(value, 11);
  return numbers.replace(
    /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
    (_, p1, p2, p3, p4) => {
      return `${p1}.${p2}.${p3}${p4 ? `-${p4}` : ""}`;
    }
  );
}

// Formata visualmente
export function formatCnpjView(value: string): string {
  const numbers = formatNumberInput(value, 14);
  return numbers.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
    (_, p1, p2, p3, p4, p5) => {
      return `${p1}.${p2}.${p3}/${p4}${p5 ? `-${p5}` : ""}`;
    }
  );
}

// Formata visualmente
export function formatPhoneView(value: string): string {
  const numbers = formatNumberInput(value, 11);
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, p1, p2, p3) => {
    return `(${p1}) ${p2}${p3 ? `-${p3}` : ""}`;
  });
}

export { formatNumberInput };

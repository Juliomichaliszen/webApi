type TableRowWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

function TableRowWrapper({ children, className = "" }: TableRowWrapperProps) {
  return (
    <div
      className={`border-t border-[var(--cinza100)] grid grid-cols-12 text-sm ${className}`}
    >
      {children}
    </div>
  );
}

export default TableRowWrapper;

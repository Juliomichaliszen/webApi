type TableCellProps = {
  children: React.ReactNode;
  colSpan?: number;
  className?: string;
};

function TableCell({ children, colSpan = 2, className = "" }: TableCellProps) {
  return (
    <div
      style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
      className={`flex items-center  ${className}`}
    >
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  );
}

export default TableCell;

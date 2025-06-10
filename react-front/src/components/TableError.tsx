import Image from "next/image";

const error = "error.svg";

function TableError() {
  return (
    <div className="row-span-10 flex flex-col items-center justify-center">
      <Image
        width={30}
        height={30}
        src={error}
        alt="Erro"
        className="w-20 h-20"
      />
      <p>Comunicação com servidor falhou !</p>
    </div>
  );
}

export default TableError;

import Image from "next/image";

const loading = "loading.svg";

function TableLoading() {
  return (
    <div className="row-span-10 flex items-center justify-center">
      <Image
        width={5}
        height={5}
        src={loading}
        alt="Carregando"
        className="w-6 h-6 animate-spin"
      />
    </div>
  );
}

export default TableLoading;

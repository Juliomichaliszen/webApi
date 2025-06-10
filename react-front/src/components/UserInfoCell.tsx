import Image from "next/image";

type UserInfoCellProps = {
  name: string;
  children?: React.ReactNode;
};

const user = "/user-agenda.svg";

export default function UserInfoCell({ name, children }: UserInfoCellProps) {
  return (
    <div className="flex flex-col justify-center gap-0">
      <div className="flex gap-[5px] items-center">
        <Image src={user} alt="user" width={20} height={20} />
        <p>{name}</p>
      </div>
      <div className="pl-[25px] h-fit">{children}</div>
    </div>
  );
}

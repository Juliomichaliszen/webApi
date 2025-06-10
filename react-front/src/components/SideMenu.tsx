"use client";

import Image from "next/image";
import TopMenuLink from "./TopMenuLink";
import Link from "next/link";
import SideMenuProfile from "./SideMenuProfile";

const logo = "/logo.svg";
const logoMobile = "/logo-mobile.svg";

type TopMenuProps = {
  links: { to: string; text: string; img: string }[];
  role: string;
  icon: string;
  bgcolor: string;
};

function SideMenu({ links, role, icon, bgcolor }: TopMenuProps) {
  return (
    <nav className="bg-[var(--preto3)] w-[60px] md:w-[250px] md:min-w-[250px]  flex flex-col items-center justify-between font-white px-[10px] md:px-[20px] pt-[20px]">
      {/* MOBILE */}
      <div className="w-full h-screen flex flex-col justify-between md:hidden">
        <div className="flex flex-col items-center gap-[40px]">
          <Image src={logoMobile} width={30} height={20} alt="logo" />
          <div className="flex flex-col gap-[35px] items-center">
            {links.map((link) => (
              <Link key={link.to} href={link.to}>
                <Image src={link.img} alt={link.text} width={20} height={20} />
              </Link>
            ))}
          </div>
        </div>
        <div className="pb-[90px]">
          <SideMenuProfile bgcolor={bgcolor} role={role} icon={icon} />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="w-full hidden md:flex flex-col gap-[30px] items-center">
        <Image alt="" src={logo} width={102} height={21} />
        <ul className="w-full flex flex-col gap-[6px] justify-around md:justify-center text-[var(--branco1)]">
          {links.map((link) => (
            <TopMenuLink
              key={link.to}
              to={link.to}
              text={link.text}
              img={link.img}
            />
          ))}
        </ul>
      </div>
      <div className="w-full hidden md:flex flex-col border-[var(--branco1)] pb-[90px] ">
        <div className="h-[2px] w-full bg-white rounded-full mb-[28px]"></div>
        <SideMenuProfile bgcolor={bgcolor} role={role} icon={icon} />
      </div>
    </nav>
  );
}

export default SideMenu;

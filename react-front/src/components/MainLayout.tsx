import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return <div className="w-full flex flex-col gap-2">{children}</div>;
}

export default MainLayout;

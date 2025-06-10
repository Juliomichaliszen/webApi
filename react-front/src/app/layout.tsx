import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dr. Fast",
  description: "Conecte-se aos seus pacientes em tempo recorde com Dr.Fast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto} overflow-x-hidden h-screen flex flex-col antialiased `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

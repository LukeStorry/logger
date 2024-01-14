import type { Metadata } from "next";
import { Merienda } from "next/font/google";
import "./globals.css";

const font = Merienda({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "log",
  description: "Basic loggger to Sheets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}

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
      <body className={font.className}>
        <main className="min-h-screen bg-slate-800 p-1 py-24 text-lg md:px-24">
          {children}
        </main>
      </body>
    </html>
  );
}

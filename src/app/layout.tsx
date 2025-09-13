import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethan Zhang | Software Engineer",
  description: "Software Engineer specializing in full-stack development, cloud technologies, and distributed systems. UC Berkeley Computer Science & Applied Mathematics student with experience at Google, Oratora, and Lumo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Navbar from "./components/Navbar"; // Assuming this path is correct
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Your professional cooking assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
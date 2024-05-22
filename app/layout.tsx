import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "HOD smart",
  description: "Become smart doing your lesson allocations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
       </body>
    </html>
  );
}

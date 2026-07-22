import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juan Carlos Llerena Huamani | Candidato a la Alcaldía de Orcopampa",
  description: "Conoce la trayectoria, propuestas y Plan de Gobierno 2027-2030 de Juan Carlos Llerena Huamani para el distrito de Orcopampa. Tradición y Futuro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-[#F5F5F5] text-[#1E1E1E]">
        {children}
      </body>
    </html>
  );
}

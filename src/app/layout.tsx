import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Carteira Digital",
  description: "Carteira digital de pontos do Ministério Jovem do Itaóca",
  authors: [{ name: "Ministério Jovem do Itaóca", url: "https://www.mjitaoca.com.br" }],
  keywords: ["carteira digital", "pontos", "ministério jovem", "itaóca"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

'use client';

import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const shouldShowGreeting = !['/extrato', '/ranking', '/perfil'].includes(pathname);
  const shouldShowEyeIcon = !['/extrato', '/ranking', '/perfil'].includes(pathname);
  const shouldShowHelpIcon = true;

  return (
    <html lang="pt-BR">
      <body>
        <Header 
          showGreeting={shouldShowGreeting}
          showEyeIcon={shouldShowEyeIcon}
          showHelpIcon={shouldShowHelpIcon}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}

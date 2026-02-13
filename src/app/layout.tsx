import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Collab - ApronLabs",
  description: "Bug tracking & idea sharing for ApronLabs team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>
          <Header />
          <main className="max-w-5xl mx-auto px-4 py-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

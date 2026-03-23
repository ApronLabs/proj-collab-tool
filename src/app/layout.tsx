import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { PageStateProvider } from "@/lib/providers/PageStateProvider";

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
          <Suspense fallback={null}>
            <PageStateProvider>
              <Header />
              <main className="max-w-5xl mx-auto px-4 py-6">
                {children}
              </main>
            </PageStateProvider>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

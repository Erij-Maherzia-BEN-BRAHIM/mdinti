import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mdinti - Preserving the Heritage of Médina Tunis",
  description:
    "Economic Interest Grouping dedicated to the preservation and revitalization of the historic Médina of Tunis",
  openGraph: {
    title: "mdinti - Preserving the Heritage of Médina Tunis",
    description:
      "Economic Interest Grouping dedicated to the preservation and revitalization of the historic Médina of Tunis",
    url: "https://mdinti.org",
    siteName: "mdinti",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

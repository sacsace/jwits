import type { Metadata } from "next";
import { Barlow, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const display = Barlow({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "JW Industrial Tech Services",
    template: "%s | JW Industrial Tech Services",
  },
  description:
    "JW Industrial Tech Services provides engineering solutions for the automotive and mobility industries, with Kia Motors as a key client.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/logo.png" }],
    shortcut: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

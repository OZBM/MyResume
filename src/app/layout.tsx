import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omar Zakaria Ben Mustapha - Resume",
  description: "Software engineer specializing in Unity, Mobile, AI, LLM, and VR technologies",
  keywords: "Omar Ben Mustapha, software engineer, Unity, mobile development, AI, VR, resume",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRkY5ODAwIi8+CjxwYXRoIGQ9Ik02IDhIMjZWMTBINlY4WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTYgMTRIMjZWMTZINlYxNFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik02IDIwSDI2VjIySDZWMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
        type: "image/svg+xml",
        sizes: "32x32"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}

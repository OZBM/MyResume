import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

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
    // Add suppressHydrationWarning for next-themes compatibility
    // Add scrollbar-custom to apply custom scrollbar styles
    <html lang="en" className="scroll-smooth scrollbar-custom" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}> {/* Added antialiased for smoother fonts */}
        {/* Use the custom ThemeProvider with its supported props */}
        <ThemeProvider
          defaultTheme="system" // 'system' is supported by the custom provider logic
          storageKey="theme"
        >
          <div className="relative flex min-h-screen flex-col"> {/* Added relative and flex-col for potential sticky footer later */}
            {/* Header could go here if needed globally */}
            <main className="flex-grow">{children}</main> {/* Wrap children in main, allow it to grow */}
            {/* Footer could go here if needed globally */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

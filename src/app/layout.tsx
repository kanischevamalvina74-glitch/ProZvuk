import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ProProvider } from "@/components/pro/pro-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Автозвук Pro — настройка системы под соревнования",
  description:
    "Калькулятор фильтров, настройка гейна по вольтметру, пресеты SQ/SPL и чек-лист стенда. Два калькулятора бесплатно, полный Pro-набор — ключ за 100 ₽.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ProProvider>{children}</ProProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

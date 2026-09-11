import { ProStatusBadge } from "@/components/pro/pro-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Volume2 } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-xl print:hidden">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 shadow-[0_4px_16px_-4px_hsl(24_94%_53%/0.6)] transition-transform group-hover:scale-105">
            <Volume2 className="h-4 w-4 text-white" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Автозвук
            <span className="ml-1.5 rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Pro
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link
            href="/pro"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Инструменты
          </Link>
          <Link
            href="/account"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Кабинет
          </Link>
          <ProStatusBadge />
          <span className="h-4 w-px bg-border" aria-hidden />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Send } from "lucide-react";

const AUTHOR_TG = "https://t.me/belka_s_adk46";

const footerLinks: { href: string; label: string; title?: string }[] = [
  { href: "/pro", label: "Инструменты" },
  { href: "/soft", label: "Софт" },
  { href: "/account", label: "Личный кабинет" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-card/40 print:hidden">
      <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Автозвук Pro — ключ один раз, 100 ₽
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.title}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={AUTHOR_TG}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:text-primary/80"
          >
            <Send className="h-3.5 w-3.5" />
            Автор: @belka_s_adk46
          </a>
        </div>
      </div>
    </footer>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ArrowRight,
  Laptop,
  Mic,
  Smartphone,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Программы для настройки автозвука — софт для АЧХ и DSP",
  description:
    "Обзор софта для настройки автозвука: REW для измерения АЧХ, фирменные программы DSP-процессоров (Helix, Audison, Pioneer, Sony) и мобильные анализаторы спектра для экспресс-диагностики.",
};

const pcTools = [
  {
    icon: Mic,
    name: "REW (Room EQ Wizard)",
    badge: "бесплатно",
    description:
      "Главная программа для акустического анализа. Работает с измерительным микрофоном (например, UMIK-1): показывает реальные провалы и пики АЧХ в салоне, считает временные задержки и параметры эквалайзера.",
  },
  {
    icon: Activity,
    name: "Visual Analyzer",
    badge: "бесплатно",
    description:
      "Виртуальный измерительный прибор: осциллограф, спектроанализатор и генератор сигналов в одном окне. Удобен для тестирования компонентов системы по отдельности.",
  },
];

const dspTools = [
  {
    name: "Helix / Brax — DSP PC-Tool",
    description:
      "Эталонный и очень гибкий софт для процессорных устройств Helix и Brax: срезы кроссовера, поканальный эквалайзер, задержки.",
  },
  {
    name: "Audison — bit Drive",
    description:
      "Профессиональная программа для настройки процессоров Audison (bit One и линейки bit).",
  },
  {
    name: "Pioneer — CarAVAssist",
    description:
      "Приложение для связи смартфона с современными головными устройствами Pioneer и настройки звука.",
  },
  {
    name: "Sony | Music Center",
    description:
      "Приложение (ранее SongPal) для детальной настройки звуковых параметров и баланса ресиверов Sony по Bluetooth.",
  },
];

const mobileTools = [
  {
    name: "Audio Tool / Spectroid (Android)",
    description:
      "Анализаторы спектра реального времени. Помогают оценить уровень шумов и примерную картину по частотам — с внешним микрофоном точность выше.",
  },
  {
    name: "Sonic Tools",
    description:
      "Набор утилит для смартфона: генератор тона и шумомер для базовой проверки системы без стационарного оборудования.",
  },
];

export default function SoftPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container flex flex-col items-center gap-5 py-16 text-center sm:py-20">
            <Badge variant="secondary" className="gap-1.5">
              <Laptop className="h-3 w-3" />
              Справочник: софт для измерений и настройки
            </Badge>
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Программы для настройки автозвука
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Грамотная настройка — это цикл из трёх шагов:{" "}
              <strong>посчитать</strong> срезы и гейн,{" "}
              <strong>внести</strong> их в процессор,{" "}
              <strong>проверить</strong> измерением. Этот справочник — про
              программы для второго и третьего шага. Первым шагом занимается{" "}
              <Link
                href="/pro"
                className="font-medium underline underline-offset-4"
              >
                наш калькулятор
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Измерение АЧХ на ПК */}
        <section className="container py-14">
          <div className="mb-8 space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Измерение АЧХ и анализ звука на ПК
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Точная настройка начинается с измерений: по графикам видно, что
              слышит ухо в салоне, а не то, что написано в спецификации.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {pcTools.map((tool) => (
              <Card key={tool.name}>
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <tool.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">{tool.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            Телефонный микрофон для таких замеров не подходит — он врёт в
            низкочастотном диапазоне. Для честной картины нужен измерительный
            микрофон вроде UMIK-1.
          </p>
        </section>

        {/* Фирменное ПО DSP */}
        <section className="border-t bg-muted/40">
          <div className="container py-14">
            <div className="mb-8 space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Фирменное ПО DSP-процессоров и магнитол
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                У каждого производителя процессоров — своя программа: именно в
                неё вносятся срезы кроссовера, поканальный эквалайзер и
                временные задержки.
              </p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              {dspTools.map((tool) => (
                <Card key={tool.name}>
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-3">
                      <SlidersHorizontal className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="mx-auto mt-8 max-w-3xl rounded-lg border bg-card p-4 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">
                  Куда вписывать цифры:
                </span>{" "}
                посчитайте HPF/LPF и целевое напряжение гейна в бесплатном
                калькуляторе — затем перенесите эти значения в фирменное
                программное обеспечение вашего процессора.
              </p>
              <Button size="sm" className="mt-3" asChild>
                <Link href="/pro">
                  Открыть калькуляторы
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Мобильные приложения */}
        <section className="container py-14">
          <div className="mb-8 space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Мобильные приложения для экспресс-диагностики
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Быстрая проверка «на слух и по экрану» прямо в машине — без
              ноутбука и измерительного микрофона.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {mobileTools.map((tool) => (
              <Card key={tool.name}>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            Телефонный анализ — грубая оценка. Для подготовки к соревнованиям
            она не заменяет ни измерительный тракт, ни расчёт: смотрите{" "}
            <Link
              href="/pro"
              className="font-medium underline underline-offset-4"
            >
              инструменты настройки
            </Link>
            .
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  AudioWaveform,
  BookOpenCheck,
  ClipboardCheck,
  Gauge,
  KeyRound,
  MessageCircle,
  Music4,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { HeroBuyButton } from "@/components/pro/hero-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const ADMIN_CONTACT = "t.me/belka_s_adk46";
const BOT_CONTACT = "t.me/avt0zvuk_pro_bot";
const PRICE = 100;

/* Детерминированные «случайные» параметры полос эквалайзера (без SSR-мисматчей) */
const EQ_BARS = Array.from({ length: 56 }, (_, i) => ({
  height: `${18 + ((i * 97) % 80)}%`,
  delay: `${(((i * 137) % 1000) / 1000).toFixed(2)}s`,
  duration: `${(0.9 + ((i * 61) % 70) / 100).toFixed(2)}s`,
}));

const features = [
  {
    icon: SlidersHorizontal,
    title: "Калькулятор фильтров",
    description:
      "HPF/LPF и крутизна под твитер, СЧ, мидбас и саб — с объяснением, почему именно так.",
    free: true,
  },
  {
    icon: Gauge,
    title: "Гейн по вольтметру",
    description:
      "Вводишь мощность и сопротивление — получаешь целевое напряжение √(P·R) и пошаговый алгоритм.",
    free: true,
  },
  {
    icon: AudioWaveform,
    title: "Пресеты SQ / SPL / Free Air",
    description:
      "Стартовые наборы параметров под тип системы: фильтры, сабсоник, гейн — с пояснением каждого значения.",
    free: false,
  },
  {
    icon: ClipboardCheck,
    title: "Чек-лист стенда",
    description:
      "12 пунктов на 5 минут до замера: питание, предохранители, фильтры, гейн. Сохраняется и печатается.",
    free: false,
  },
  {
    icon: Music4,
    title: "Генератор сигналов",
    description:
      "Синус 20–1000 Гц и свип прямо в браузере: для замера гейна мультиметром и поиска дребезга.",
    free: false,
  },
  {
    icon: BookOpenCheck,
    title: "Справочник ошибок",
    description:
      "Клиппинг, перегрев усилителя, пропавший бас, фон: причина → что делать. Без воды.",
    free: false,
  },
];

const workflow = [
  {
    icon: SlidersHorizontal,
    step: "01",
    title: "Посчитайте",
    description:
      "Калькуляторы выдают срезы кроссовера и целевое напряжение гейна — с объяснением каждого значения.",
    href: "/pro",
    link: "Открыть калькуляторы",
  },
  {
    icon: Upload,
    step: "02",
    title: "Внесите в систему",
    description:
      "Перенесите значения в DSP-процессор или усилитель. Нужное ПО — в справочнике программ.",
    href: "/soft",
    link: "Справочник софта",
  },
  {
    icon: Activity,
    step: "03",
    title: "Проверьте",
    description:
      "Прогоните свип, сверьтесь с чек-листом и вольтметром — и на замер без сюрпризов.",
    href: "/pro",
    link: "Тест-сигналы",
  },
];

const buySteps = [
  {
    icon: MessageCircle,
    title: "Оплатите 100 ₽",
    description: `Переведите ${PRICE} ₽ и напишите админу ${ADMIN_CONTACT}: сумму и свой email.`,
  },
  {
    icon: KeyRound,
    title: "Получите ключ",
    description:
      "Админ выдаст ключ через бота @avt0zvuk_pro_bot — он привязан к вашему email.",
  },
  {
    icon: KeyRound,
    title: "Активируйте",
    description: "Введите email и ключ в личном кабинете — Pro откроется сразу.",
  },
  {
    icon: AudioWaveform,
    title: "Пользуйтесь навсегда",
    description: "Разовая оплата: без подписки, продлений и ограничений устройств.",
  },
];

function EqualizerStrip() {
  return (
    <div
      aria-hidden
      className="mask-fade-x flex h-20 items-end justify-center gap-1 overflow-hidden sm:h-24"
    >
      {EQ_BARS.map((bar, index) => (
        <div
          key={index}
          className="w-1.5 origin-bottom animate-eq rounded-full bg-gradient-to-t from-orange-600/60 via-orange-500/80 to-amber-300/90 motion-reduce:animate-none sm:w-2"
          style={{
            height: bar.height,
            animationDelay: bar.delay,
            animationDuration: bar.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function IndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div
            aria-hidden
            className="bg-grid mask-fade-b absolute inset-0"
          />
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="container relative flex flex-col items-center gap-6 py-20 text-center sm:py-24">
            <Badge
              variant="secondary"
              className="gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Помощник для подготовки к SQ и SPL
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Настрой автозвук <span className="text-gradient">по цифрам</span>
              , а не на слух
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Калькуляторы фильтров и гейна, пресеты под лиги, чек-лист стенда
              и тестовые сигналы — всё, чтобы на замере система играла так,
              как вы настраивали.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="glow-primary rounded-xl font-semibold"
              >
                <Link href="/pro">
                  Открыть инструменты
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <HeroBuyButton price={PRICE} />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>
                <strong className="font-mono font-semibold text-foreground">2</strong>{" "}
                инструмента — бесплатно
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:block" aria-hidden />
              <span>
                ключ —{" "}
                <strong className="font-mono font-semibold text-foreground">{PRICE} ₽</strong>{" "}
                один раз
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:block" aria-hidden />
              <span>
                работает{" "}
                <strong className="font-mono font-semibold text-foreground">навсегда</strong>
              </span>
            </div>
            <div className="mt-8 w-full max-w-3xl">
              <EqualizerStrip />
            </div>
          </div>
        </section>

        {/* Что внутри */}
        <section className="container py-16 sm:py-20">
          <div className="mb-10 space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Что внутри
            </h2>
            <p className="text-muted-foreground">
              Два калькулятора — бесплатно и без регистрации. Остальное
              открывает Pro-ключ.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_40px_-16px_hsl(24_94%_53%/0.4)]"
              >
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-gradient-to-br from-primary/15 to-primary/5 transition-colors group-hover:border-primary/30">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </span>
                    {feature.free ? (
                      <Badge
                        variant="outline"
                        className="border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      >
                        бесплатно
                      </Badge>
                    ) : (
                      <Badge className="border-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                        Pro
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Как это работает */}
        <section className="border-t bg-muted/30">
          <div className="container py-16 sm:py-20">
            <div className="mb-10 space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Три шага до правильного звука
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Настройка — это цикл: расчёт, перенос в процессор, проверка.
                Сайт закрывает все три.
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
              {workflow.map((item, index) => (
                <Card key={item.step} className="relative">
                  <CardHeader>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">
                        /{item.step}
                      </span>
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                    <Link
                      href={item.href}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
                    >
                      {item.link}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardHeader>
                  {index < workflow.length - 1 && (
                    <ArrowRight
                      aria-hidden
                      className="absolute -right-7 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground/50 md:block"
                    />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Как купить */}
        <section id="buy" className="container py-16 sm:py-20">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-card p-6 sm:p-10">
            <div
              aria-hidden
              className="bg-grid absolute inset-0 opacity-60"
            />
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative">
              <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Pro за {PRICE} ₽ — разово
                  </h2>
                  <p className="max-w-md text-muted-foreground">
                    Ключ привязан к email и активируется в личном кабинете за
                    минуту. Дальше — навсегда.
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-5xl font-bold text-gradient">
                    {PRICE} ₽
                  </div>
                  <div className="text-xs text-muted-foreground">
                    без подписки
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {buySteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-xl border bg-background/60 p-4"
                  >
                    <div className="mb-3 flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 font-mono text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <step.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm font-semibold">{step.title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Button size="lg" asChild className="glow-primary rounded-xl font-semibold">
                  <Link href="/account">
                    Активировать ключ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-xl"
                >
                  <a href={`https://${ADMIN_CONTACT}`} rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Написать админу
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-xl"
                >
                  <a href={`https://${BOT_CONTACT}`} rel="noopener noreferrer">
                    <Bot className="h-4 w-4" />
                    Бот в Telegram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container max-w-2xl py-16">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
            Частые вопросы
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-free">
              <AccordionTrigger>Что доступно без ключа?</AccordionTrigger>
              <AccordionContent>
                Калькулятор фильтров и калькулятор гейна — бесплатно, без
                активации. Остальное — пресеты SQ/SPL/Free Air, чек-лист стенда,
                генератор тестовых сигналов и справочник ошибок — открывается
                после активации Pro-ключа.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="where-key">
              <AccordionTrigger>Где взять ключ?</AccordionTrigger>
              <AccordionContent>
                Ключ выдаёт администратор после оплаты {PRICE} ₽. Напишите админу
                в Telegram {ADMIN_CONTACT}: сумму перевода и ваш email. Ключ
                приходит через бота {BOT_CONTACT} — его нужно переслать или
                ввести самому в личном кабинете.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="wrong-email">
              <AccordionTrigger>Ключ не подходит — что делать?</AccordionTrigger>
              <AccordionContent>
                Ключ привязан к email: проверьте, что в личном кабинете введён
                именно тот адрес, который вы сообщали при оплате. Если опечатались
                при оплате — сообщите админу правильный email, и он выдаст ключ
                заново.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="devices">
              <AccordionTrigger>На скольких устройствах работает ключ?</AccordionTrigger>
              <AccordionContent>
                Один ключ — один email, но активировать его можно на любом
                количестве устройств: просто введите тот же email и ключ в личном
                кабинете с каждого устройства.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="forever">
              <AccordionTrigger>Pro закончится когда-нибудь?</AccordionTrigger>
              <AccordionContent>
                Нет. Это разовая покупка без подписки и продлений: активировали
                ключ — Pro работает навсегда, включая обновления инструментов и
                пресетов под новые правила лиг.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

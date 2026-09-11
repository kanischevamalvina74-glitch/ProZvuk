"use client";

import { ERROR_GUIDE } from "@/lib/tuning";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ErrorGuide() {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-2xl">
      {ERROR_GUIDE.map((item, index) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left text-sm font-semibold sm:text-base">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Причины
              </div>
              <ul className="list-disc space-y-1 pl-4 text-sm">
                {item.causes.map((cause) => (
                  <li key={cause}>{cause}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Что делать
              </div>
              <ul className="list-disc space-y-1 pl-4 text-sm">
                {item.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

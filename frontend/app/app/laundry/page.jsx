import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function LinkedButton({ href, text, className, machine }) {
  let url = href;
  if (machine === "dryer") {
    url += `?machine=dryer`;
  }

  return (
    <Link href={url} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          className,
          "w-full justify-between text-base py-6 border-b border-muted"
        )}
      >
        {text}
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </Button>
    </Link>
  );
}

export default function Page() {
  return (
    <Accordion type="single" collapsible className="w-[85%] mx-auto">
      <AccordionItem value="dryers">
        <AccordionTrigger>Suszarnia</AccordionTrigger>
        <AccordionContent>
          {[1, 3, 5, 7, 9, 11, 13].map((i) => (
            <LinkedButton
              key={i}
              text={`Suszarnia - piętro ${i}`}
              href={`/app/laundry/${i}`}
              machine="dryer"
            />
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="washing-machines">
        <AccordionTrigger>Pralnia</AccordionTrigger>
        <AccordionContent>
          {[2, 4, 6, 8, 10, 12, 14].map((i) => (
            <LinkedButton
              key={i}
              text={`Pralnia - piętro ${i}`}
              href={`/app/laundry/${i}`}
              machine="washing-machine"
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}


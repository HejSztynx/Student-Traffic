import Link from "next/link";

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
    <Button className={cn(className, "m-2 w-[90%]")}>
      <Link href={url}>{text}</Link>
    </Button>
  );
}

export default function Page() {
  return (
    <Accordion type="single" collapsible className="w-[85%]">
      <AccordionItem value="dryers">
        <AccordionTrigger>Suszarnia</AccordionTrigger>
        <AccordionContent>
          {[1, 3, 5, , 7, 9, 11, 13].map((i) => (
            <LinkedButton
              key={i}
              text={`Suszarnia - piętro ${i}`}
              href={`/laundry/${i}`}
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
              href={`/laundry/${i}`}
              machine="washing-machine"
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

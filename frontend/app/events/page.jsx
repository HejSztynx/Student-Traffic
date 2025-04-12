import Link from "next/link";
import { Button } from "@/components/ui/button";

function LinkedButton({ href, text }) {
  return (
    <Button className="m-2 w-[90%]">
      <Link href={href}>{text}</Link>
    </Button>
  );
}

export default function Page() {
  return (
    <>
      <LinkedButton href={"/events/football"} text="Piłka nożna" />
      <LinkedButton href={"/events/volleyball"} text="Siatkówka" />
      <LinkedButton href={"/events/basketball"} text="Koszykówka" />
      <LinkedButton href={"/events/gym"} text="Siłownia" />
      <LinkedButton href={"/events/other"} text="Inne wydarzenia" />
    </>
  );
}

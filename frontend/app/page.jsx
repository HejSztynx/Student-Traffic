import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="flex justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="text-center mt-64">
        <h1 className="text-4xl">Student Traffic</h1>
        <h2 className="text-3xl">Witamy!</h2>
      </div>
    </div>
  );
}

// export default function Page() {
//   return (

//   );
// }

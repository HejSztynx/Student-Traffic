'use client'

import { useRouter } from "next/navigation"

const sports = [
  { name: "Piłka nożna", icon: "⚽", href: "/app/events/football" },
  { name: "Siatkówka", icon: "🏐", href: "/app/events/volleyball" },
  { name: "Koszykówka", icon: "🏀", href: "/app/events/basketball" },
  { name: "Siłownia", icon: "🏋️", href: "/app/events/gym" },
  { name: "Inne wydarzenia", icon: "🎉", href: "/app/events/other" },
]

export default function Page() {
  const router = useRouter()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Wybierz wydarzenie</h1>

      <div className="flex flex-col gap-4">
        {sports.map(({ name, icon, href }) => (
          <button
            key={name}
            type="button"
            onClick={() => router.push(href)}
            className="border rounded p-4 w-full max-w-xs mx-auto text-lg flex justify-center items-center gap-2 transition hover:border-primary"
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}
      </div>
    </main>
  )
}

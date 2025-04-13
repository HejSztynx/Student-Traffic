'use client'

import { useRouter } from "next/navigation"

const announcements = [
  { name: "Przeglądaj ogłoszenia", icon: "📋", href: "/app/food_announcements" },
  { name: "Dodaj ogłoszenie", icon: "➕", href: "/app/food_giveaway" },
]

export default function AnnouncementOptions() {
  const router = useRouter()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Ogłoszenia</h1>

      <div className="flex flex-col gap-4">
        {announcements.map(({ name, icon, href }) => (
          <button
            key={name}
            type="button"
            onClick={() => router.push(href)}
            className="border rounded p-4 w-full max-w-xs mx-auto text-lg flex justify-center items-center gap-2 transition hover:border-green-600"
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}
      </div>
    </main>
  )
}

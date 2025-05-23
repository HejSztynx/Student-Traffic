"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function FoodEventsTimeline({ title }) {
  const router = useRouter()
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://hackathon-backend-hdry.onrender.com/announcements")

        if (!res.ok) {
          throw new Error("Błąd podczas pobierania ogłoszeń")
        }

        const data = await res.json()
        setEvents(data)
      } catch (error) {
        console.error("Błąd:", error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title || "Ogłoszenia"}</h1>
      </div>

      <div className="flex flex-col gap-4">
        {events.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">
            Brak ogłoszeń
          </div>
        ) : (
          events.map((event, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="font-semibold text-sm">
                  {event.offeredItem}
                  {event.price && ` - ${event.price}`}
                </div>
                {event.location && (
                  <div className="text-xs text-muted-foreground">
                    Miejsce: {event.location}
                  </div>
                )}
                {event.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {event.description}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

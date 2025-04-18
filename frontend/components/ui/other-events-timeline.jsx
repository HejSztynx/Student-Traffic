"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import AddOtherEventModal from "./add-other-event-modal"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"


export default function OtherEventsTimeline({ title }) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([]) // lista wydarzeń
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePrevDay = () => {
    const prevDate = new Date(selectedDate.getTime() - 86400000)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (prevDate >= today) {
      setSelectedDate(prevDate)
    }
  }

  const handleNextDay = () => {
    const nextDate = new Date(selectedDate.getTime() + 86400000)
    setSelectedDate(nextDate)
  }

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, { ...newEvent, date: selectedDate }])
    toast.success("Dodano nowe wydarzenie!")
    setIsModalOpen(false)
  }
  
  const filteredEvents = events.filter(
    (event) => new Date(event.date).toDateString() === selectedDate.toDateString()
  )

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return a.time.localeCompare(b.time)
  })

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevDay}
          disabled={selectedDate.toDateString() === new Date().toDateString()}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* <Button className="bg-green-500 hover:bg-green-600 text-white">
          {format(selectedDate, "d MMMM yyyy", { locale: pl })}
        </Button> */}

        <Popover>
        <PopoverTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
            {format(selectedDate, "d MMMM yyyy", { locale: pl })}
            </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0" align="center">
            <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
            initialFocus
            disabled={(date) => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return date < today
            }}
            />
        </PopoverContent>
        </Popover>



        <Button
          variant="outline"
          size="icon"
          onClick={handleNextDay}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
      {sortedEvents.length === 0 && (
        <div className="text-center text-gray-500 text-sm">
            Brak wydarzeń na ten dzień
        </div>
        )}

        {sortedEvents.map((event, index) => (
        <Card key={index}>
            <CardContent className="p-4">
            <div className="font-semibold text-sm">
                {event.time} - {event.title}
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
        ))}


      </div>

      <div className="flex justify-center mt-6">
        <Button
          size="icon"
          className="bg-black text-white hover:bg-gray-800"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {isModalOpen && (
        <AddOtherEventModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  )
}

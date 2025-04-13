"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import WashingMachineCard from "./washingMashineCard"
import ConfirmationDialog from "./confirmDialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowLeft} from "lucide-react"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"


// Godziny co 2h
const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`)

export default function VerticalTimeline({ title, machines = []}) {
  const router = useRouter()

  // const [reservations, setReservations] = useState(machines);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())

 

  const handleCardClick = (machineName, time) => {
    setSelectedMachine(machineName)
    setSelectedTime(time)
    setIsDialogOpen(true)
  }

  const handleConfirm = () => {
    toast.success(`Rezerwacja potwierdzona dla ${selectedMachine} o ${selectedTime}`)
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

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
    const today = new Date()
    today.setHours(0, 0, 0, 0)
  
    const maxDate = new Date(today.getTime() + 8 * 86400000) // dzisiaj + 7 dni
  
    if (nextDate <= maxDate) {
      setSelectedDate(nextDate)
    }
  }
  

  const isPastEvent = (eventDate, endTime) => {
    const [hours, minutes] = endTime.split(":").map(Number);
    const eventEnd = new Date(eventDate);
    eventEnd.setHours(hours, minutes, 0, 0);
  
    return eventEnd < new Date();
  };  

  return (
    <div>
      {/* Nagłówek z tytułem i strzałką cofania */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Data */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevDay}
          disabled={new Date(selectedDate).toDateString() === new Date().toDateString()}
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

                const maxDate = new Date()
                maxDate.setDate(today.getDate() + 8)
                maxDate.setHours(0, 0, 0, 0)

                return date < today || date >= maxDate
              }}
            />
          </PopoverContent>
        </Popover>



        <Button
          variant="outline"
          size="icon"
          onClick={handleNextDay}
          disabled={selectedDate.toDateString() === new Date(new Date().getTime() + 8 * 86400000).toDateString()}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>


      </div>

      {/* Timeline */}
      <div className="grid grid-cols-[80px_1fr] gap-5 h-[700px] overflow-y-auto">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="flex items-top justify-end pr-2 text-sm text-gray-500">
              {hour}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {machines.map((machine) => (
                <WashingMachineCard
                key={machine.id}
                name={machine.name}
                time={hour}
                status={machine.reservations[hour]}
                selectedDate={selectedDate}
                onClick={handleCardClick}
              />              
              ))}
            </div>
          </React.Fragment>
        ))}

        {/* Modal potwierdzenia */}
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          machineName={selectedMachine}
          time={selectedTime}
        />
      </div>
    </div>
  )
}


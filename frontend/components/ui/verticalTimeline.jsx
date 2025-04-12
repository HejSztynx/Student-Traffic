"use client"

import React, { useState } from "react"
import WashingMachineCard from "./washingMashineCard"
import ConfirmationDialog from "./confirmDialog"

// Generujemy godziny, co 2 godziny (np. 6:00, 8:00, 10:00, ...)
const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`)

export default function VerticalTimeline() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  // Maszyny i ich rezerwacje na godzinach
  const machines = [
    {
      id: 1,
      name: "Pralka 1",
      reservations: {
        "6:00": "free",
        "8:00": "reserved",
        "10:00": "reserved",
        "12:00": "free",
        "14:00": "free",
        "16:00": "reserved",
        "18:00": "free",
        "20:00": "free",
        "22:00": "free",
      },
    },
    {
      id: 2,
      name: "Pralka 2",
      reservations: {
        "6:00": "free",
        "8:00": "free",
        "10:00": "reserved",
        "12:00": "reserved",
        "14:00": "free",
        "16:00": "free",
        "18:00": "free",
        "20:00": "reserved",
        "22:00": "free",
      },
    },
    {
      id: 3,
      name: "Pralka 3",
      reservations: {
        "6:00": "reserved",
        "8:00": "free",
        "10:00": "free",
        "12:00": "free",
        "14:00": "reserved",
        "16:00": "free",
        "18:00": "free",
        "20:00": "free",
        "22:00": "reserved",
      },
    },
  ]

  const handleCardClick = (machineName, time) => {
    setSelectedMachine(machineName)
    setSelectedTime(time)
    setIsDialogOpen(true)
  }

  const handleConfirm = () => {
    // Logika rezerwacji po potwierdzeniu
    console.log(`Rezerwacja potwierdzona dla ${selectedMachine} o godzinie ${selectedTime}`)
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className="grid grid-cols-[80px_1fr] gap-5">
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          {/* Kolumna z godziną */}
          <div className="flex items-top justify-end pr-2 text-sm text-gray-500">
            {hour}
          </div>

          {/* Wiersz z 3 slotami pralek */}
          <div className="grid grid-cols-3 gap-2">
            {machines.map((machine) => (
              <WashingMachineCard
                key={machine.id}
                name={machine.name}
                time={hour}
                status={machine.reservations[hour]}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        machineName={selectedMachine}
        time={selectedTime}
      />
    </div>
  )
}
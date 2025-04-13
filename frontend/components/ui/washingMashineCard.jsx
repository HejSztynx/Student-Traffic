import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const WashingMachineCard = ({ status, name, time, onClick, selectedDate }) => {
  const isReserved = status === "reserved"

  // Sprawdź, czy czas już minął
  const [hour, minutes] = time.split(":").map(Number)
  const slotTime = new Date(selectedDate)
  slotTime.setHours(hour, minutes, 0, 0)

  const now = new Date()
  const isPast = slotTime < now

  return (
    <Card
      onClick={() => !isReserved && !isPast && onClick(name, time)}
      className={cn(
        "cursor-pointer transition border-2",
        isReserved || isPast
          ? "border-red-500 opacity-60 pointer-events-none"
          : "border-green-500 hover:shadow-md"
      )}
    >
      <CardContent className="p-4 flex flex-col items-center justify-center gap-1">
        <div className="text-xs text-muted-foreground">{time}</div>
        <div className="text-sm font-semibold">{name}</div>
        <div
          className={cn(
            "text-[10px] mt-1",
            isReserved || isPast ? "text-red-500" : "text-green-500"
          )}
        >
          {isReserved
            ? "Zajęte"
            : isPast
            ? "Czas minął"
            : "Wolne"}
        </div>
      </CardContent>
    </Card>
  )
}

export default WashingMachineCard
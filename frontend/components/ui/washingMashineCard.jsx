import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const WashingMachineCard = ({ status, name, time, onClick }) => {
  const isReserved = status === "reserved"

  return (
    <Card
      onClick={() => !isReserved && onClick(name, time)}
      className={cn(
        "cursor-pointer transition border-2",
        isReserved
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
            isReserved ? "text-red-500" : "text-green-500"
          )}
        >
          {isReserved ? "Zajęte" : "Wolne"}
        </div>
      </CardContent>
    </Card>
  )
}

export default WashingMachineCard

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const WashingMachineCard = ({ status, name, time, onClick }) => {
  // Ustal tło na podstawie statusu
  const bgColor = status === "reserved" ? "bg-red-500" : "bg-green-500"
  
  const isDisabled = status === "reserved";

  return (
    <Card className={`${bgColor} text-white`}>
      <CardContent className="p-2">
        <Button
          onClick={() => !isDisabled && onClick(name, time)}
          className="w-full text-[10px]"
          disabled={isDisabled}
        >
        {name}
        </Button>
      </CardContent>
    </Card>
  )
}

export default WashingMachineCard

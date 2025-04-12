import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`)

export default function VerticalTimeline() {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-5">
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          {/* Kolumna z godziną /}
          <div className="flex items-top justify-end pr-2 text-sm text-gray-500">
            {hour}
          </div>

          {/ Wiersz z 3 slotami pralek */}
          <div className="grid grid-cols-3 gap-2">
            <Card>
              <CardContent className="p-2">
                <Button className="w-full">Pralka 1</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-2">
                <Button className="w-full">Pralka 2</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-2">
                <Button className="w-full">Pralka 3</Button>
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
'use client'

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function GiveAwayPage() {
  const [itemName, setItemName] = useState("")
  const [exchange, setExchange] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newOffer = {
      itemName,
      exchange,
      description,
      location,
    }
    console.log("Propozycja oddania:", newOffer)
    router.back() // lub zamknięcie przez prop, jeśli używasz jako modal
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800 text-2xl text-center">
            Nowa propozycja
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="item">Co oddajesz?</Label>
              <Input
                id="item"
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="np. makaron, słoik, czajnik"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exchange">Za co?</Label>
              <Input
                id="exchange"
                type="text"
                value={exchange}
                onChange={(e) => setExchange(e.target.value)}
                placeholder="np. nic, coś innego, jabłko"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Opis</Label>
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Dodatkowe informacje"
                className="resize-none min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loc">Miejsce</Label>
              <Input
                id="loc"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="np. pokój 205"
              />
            </div>

            <div className="pt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Anuluj
              </Button>
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                Dodaj
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function GiveAwayModal({ onClose }) {
  const [itemName, setItemName] = useState("")
  const [exchange, setExchange] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newOffer = {
      itemName,
      exchange,
      description,
      location,
    }
    console.log("Propozycja oddania:", newOffer)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-white-800">Nowa propozycja</DialogTitle>
          </DialogHeader>

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
              placeholder="np. nic, inny produkt, karma dla kota 😺"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Opis</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dodatkowe informacje (np. data ważności)"
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loc">Miejsce</Label>
            <Input
              id="loc"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="np. pokój 205, kuchnia"
            />
          </div>

          <DialogFooter className="pt-2 flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Anuluj
            </Button>
            <Button type="submit" className="bg-green-700 hover:bg-green-800">
              Dodaj
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

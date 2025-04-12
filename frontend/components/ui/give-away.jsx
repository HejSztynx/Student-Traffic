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
      <DialogContent
        className="w-screen h-screen max-w-full max-h-full rounded-none p-8 overflow-y-auto"
        hideClose
      >
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-800 text-center">
              Nowa propozycja
            </DialogTitle>
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

          <DialogFooter className="pt-6 flex justify-between">
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

'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function ReportFailureModal({ open, onClose }) {
  const [deviceName, setDeviceName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const failureReport = {
      deviceName,
      description,
      location,
    }
    console.log("Zgłoszona awaria:", failureReport)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Zgłoś awarię</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label>Nazwa urządzenia</label>
            <Input
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </div>

          <div>
            <label>Opis awarii</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label>Lokalizacja</label>
            <Input
              placeholder="np. kuchnia, pokój 205"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Anuluj
            </Button>
            <Button type="submit">Zgłoś</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

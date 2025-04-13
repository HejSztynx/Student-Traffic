"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {toast} from 'sonner'

export default function AddOtherEventModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
  
    if (!title.trim()) {
      return toast.error("Uzupełnij tytuł wydarzenia!")
    }
  
    if (!time.trim()) {
      return toast.error("Podaj godzinę wydarzenia!")
    }
  
    if (!timeRegex.test(time)) {
      return toast.error("Niepoprawny format godziny! (np. 14:00)")
    }
  
    if (!location.trim()) {
      return toast.error("Podaj miejsce wydarzenia!")
    }
  
    onSubmit({ title, time, description, location })
    setTitle("")
    setTime("")
    setDescription("")
    setLocation("")
  }
  
  

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Dodaj wydarzenie</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tytuł wydarzenia*</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Godzina (np. 14:00)*</Label>
              <Input
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
            <Label>Miejsce*</Label>
            <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Np. pokój 205"
            />
            </div>

            <div className="space-y-2">
              <Label>Opis</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Anuluj
              </Button>
              <Button
                type="submit"
                disabled={!title.trim() || !time.trim() || !location.trim()}
                >
                Dodaj
                </Button>

            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

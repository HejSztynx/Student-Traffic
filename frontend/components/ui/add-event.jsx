'use client';

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const addTwoHours = (start) => {
  const [h, m] = start.split(":").map(Number);
  const newHour = h + 2;
  return `${newHour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

export default function AddEventModal({ onClose, onSubmit, defaultStartTime }) {
  const [title, setTitle] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [startHour, setStartHour] = useState(defaultStartTime || "");
  const [endHour, setEndHour] = useState("");

  useEffect(() => {
    if (defaultStartTime) {
      setStartHour(defaultStartTime);
      setEndHour(addTwoHours(defaultStartTime));
    }
  }, [defaultStartTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      maxPlayers: parseInt(maxParticipants),
      currentPlayers: 1,
      startTime: startHour,
      endTime: endHour,
    };

    onSubmit(newEvent);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Dodaj nowy event</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="title">Tytuł</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="np. Wieczorny mecz"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max">Maksymalna liczba uczestników</Label>
            <Input
              id="max"
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              placeholder="np. 12"
              className="w-24"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Godzina</Label>
            <div className="text-sm text-muted-foreground">
              {startHour} - {endHour}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Anuluj
            </Button>
            <Button type="submit">Dodaj</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

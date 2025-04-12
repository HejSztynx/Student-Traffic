'use client';

import React, { useState } from "react";
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

export default function AddEventModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      maxParticipants,
      startHour,
      endHour,
    };
    console.log("Nowy event:", newEvent);
    onClose();
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
            />
          </div>

          <div className="space-y-2">
            <Label>Godzina</Label>
            <div className="flex gap-4">
              <div className="space-y-1">
                <Label htmlFor="start">Od</Label>
                <Input
                  id="start"
                  type="text"
                  placeholder="10:00"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="w-24 text-center"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="end">Do</Label>
                <Input
                  id="end"
                  type="text"
                  placeholder="12:00"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  className="w-24 text-center"
                />
              </div>
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

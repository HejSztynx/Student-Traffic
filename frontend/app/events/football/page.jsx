"use client";

import React, { useState } from "react";
import EventSchedule from "@/components/ui/eventSchedule";
import AddEventModal from "@/components/ui/add-event";
import { toast } from "sonner";

export default function FootballPage() {
  const [events, setEvents] = useState([
    {
      title: "Robimy klatę",
      ownerName: "Tomek",
      currentPlayers: 2,
      maxPlayers: 3,
      startTime: "14:00",
      endTime: "15:30",
      date: new Date(),
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateEvent = () => {
    setIsModalOpen(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [
      ...prev,
      {
        ...newEvent,
        date: new Date(), // domyślnie dziś – można to poprawić jeśli przekażesz date z VerticalTimeline
        ownerName: "Tomek", // można wziąć z auth
      },
    ]);
    toast.success("Dodano nowy event!");
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <EventSchedule
        reservations={events}
        onCreateEvent={handleCreateEvent}
      />

      {isModalOpen && (
        <AddEventModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEvent}
        />
      )}
    </main>
  );
}

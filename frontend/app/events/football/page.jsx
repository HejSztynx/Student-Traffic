"use client";

import React, { useState } from "react";
import EventSchedule from "@/components/ui/eventSchedule";
import AddEventModal from "@/components/ui/add-event";
import { toast } from "sonner";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function FootballPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      title: "Robimy klatę",
      ownerName: "Tomek",
      currentPlayers: 3,
      maxPlayers: 3,
      startTime: "14:00",
      endTime: "15:30",
      date: new Date(),
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() - 86400000));
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() + 86400000));
  };

  const handleCreateEvent = () => {
    setIsModalOpen(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [
      ...prev,
      {
        ...newEvent,
        date: selectedDate,
        ownerName: "Tomek",
      },
    ]);
    toast.success("Dodano nowy event!");
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      {/* Nagłówek z datą */}
      <div className="flex flex-col items-center gap-4 mb-4">
        <h1 className="text-lg font-semibold">Boisko - Football</h1>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevDay}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            {format(selectedDate, "d MMMM yyyy", { locale: pl })}
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextDay}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Przycisk dodawania eventu */}
      <div className="flex justify-center mb-4">
        <Button
          size="icon"
          className="bg-black text-white hover:bg-gray-800"
          onClick={handleCreateEvent}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Oś czasu */}
      <EventSchedule
        reservations={events}
        selectedDate={selectedDate}
        onCreateEvent={handleCreateEvent}
      />

      {/* Modal dodawania eventu */}
      {isModalOpen && (
        <AddEventModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEvent}
        />
      )}
    </main>
  );
}
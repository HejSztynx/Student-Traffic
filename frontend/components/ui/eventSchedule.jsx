"use client";

import React, { useState } from "react";
import { ReservationCard } from "./reservationCard";
import JoinEventModal from "./join-event";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

// Godziny: 6:00 - 22:00 co 2 godziny
const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`);

export default function VerticalTimeline({ reservations = [], onCreateEvent }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const filteredReservations = reservations.filter(
    (res) =>
      new Date(res.date).toDateString() === selectedDate.toDateString()
  );

  const handleCardClick = (reservation) => {
    if (reservation.currentPlayers >= reservation.maxPlayers) return;

    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  const handleConfirmJoin = () => {
    toast.success("Zapisano na event!");
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  const handlePrevDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() - 86400000));
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() + 86400000));
  };

  return (
    <div className="relative">
      {/* Nagłówek z datą i przyciskiem + */}
      <div className="flex flex-col items-center gap-4 mb-6">
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

        <Button
          size="icon"
          className="bg-black text-white hover:bg-gray-800"
          onClick={onCreateEvent}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Oś czasu */}
      <div className="grid grid-cols-[60px_1fr] gap-4 px-4 py-6">
        {hours.map((hour) => {
          const reservation = filteredReservations.find(
            (res) => res.startTime === hour
          );

          return (
            <React.Fragment key={hour}>
              <div className="text-right pr-2 text-sm text-gray-500">
                {hour}
              </div>
              <div className="min-h-[60px]">
                {reservation ? (
                  <div
                    onClick={() => handleCardClick(reservation)}
                    className="cursor-pointer"
                  >
                    <ReservationCard {...reservation} />
                  </div>
                ) : (
                  <div className="h-full border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-400">
                    Wolne
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Modal dołączenia */}
      {isModalOpen && (
        <JoinEventModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmJoin}
          hasConfirm={
            selectedReservation?.currentPlayers <
            selectedReservation?.maxPlayers
          }
        />
      )}
    </div>
  );
}

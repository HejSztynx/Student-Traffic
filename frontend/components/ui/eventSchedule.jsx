"use client";

import React, { useState } from "react";
import { ReservationCard } from "./reservationCard";
import JoinEventModal from "./join-event";
import { toast } from "sonner";

// Godziny: 6:00 - 22:00 co 2 godziny
const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`);

export default function VerticalTimeline({ reservations, selectedDate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const filteredReservations = reservations.filter(
    (res) =>
      new Date(res.date).toDateString() === selectedDate?.toDateString()
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
    console.log(selectedReservation);
    toast.success("Zapisano na event!");
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <div className="relative">
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

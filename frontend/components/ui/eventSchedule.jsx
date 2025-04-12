"use client";

import React, { useState } from "react";
import { ReservationCard } from "./reservationCard";
import JoinEventModal from "./join-event";

// Godziny: 6:00 - 22:00 co 2 godziny
const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`);

// Mock rezerwacji
const reservations = [
  {
    title: "Trenujemy karne",
    ownerName: "Tomek",
    currentPlayers: 2,
    maxPlayers: 2,
    startTime: "14:00",
    endTime: "15:30",
  },
  {
    title: "Gramy meczycho",
    ownerName: "Kuba",
    currentPlayers: 5,
    maxPlayers: 14,
    startTime: "16:00",
    endTime: "18:30",
  },
];

export default function VerticalTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleCardClick = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  const handleConfirmJoin = () => {
    console.log("Zapisano na event:", selectedReservation);
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-[60px_1fr] gap-4 px-4 py-6">
        {hours.map((hour) => {
          const reservation = reservations.find(
            (res) => res.startTime === hour
          );

          return (
            <React.Fragment key={hour}>
              {/* Lewa kolumna – godziny */}
              <div className="text-right pr-2 text-sm text-gray-500">
                {hour}
              </div>

              {/* Prawa kolumna – slot */}
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
        />
      )}
    </div>
  );
}
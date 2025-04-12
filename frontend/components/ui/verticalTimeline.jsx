import React from "react";
import { ReservationCard } from "./reservationCard";

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
  return (
    <div className="grid grid-cols-[60px_1fr] gap-4 px-4 py-6">
      {hours.map((hour) => {
        const reservation = reservations.find((res) => res.startTime === hour);

        return (
          <React.Fragment key={hour}>
            {/* Lewa kolumna – godziny */}
            <div className="text-right pr-2 text-sm text-gray-500">
              {hour}
            </div>

            {/* Prawa kolumna – slot na kartę */}
            <div className="min-h-[60px]">
              {reservation ? (
                <ReservationCard {...reservation} />
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
  );
}

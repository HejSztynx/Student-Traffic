"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ReservationCard } from "./reservationCard";
import JoinEventModal from "./join-event";
import AddEventModal from "./add-event";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`);

export default function VerticalTimeline({ initialReservations = [], title }) {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState(initialReservations);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const filteredReservations = reservations.filter(
    (res) =>
      new Date(res.date).toDateString() === selectedDate.toDateString()
  );

  const handleCardClick = (reservation) => {
    if (reservation.currentPlayers >= reservation.maxPlayers) {
      return toast.error("Nie można dołączyć, bo brakuje miejsc.");
    }
    setSelectedReservation(reservation);
    setIsJoinModalOpen(true);
  };

  const handleConfirmJoin = () => {
    toast.success("Zapisano na event!");
    setIsJoinModalOpen(false);
    setSelectedReservation(null);
  };

  const handleAddEvent = (newEvent) => {
    setReservations((prev) => [
      ...prev,
      {
        ...newEvent,
        date: selectedDate,
        ownerName: "Tomek",
      },
    ]);
    toast.success("Dodano nowy event!");
    setIsAddModalOpen(false);
  };

  const handlePrevDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() - 86400000));
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() + 86400000));
  };

  return (
    <div className="relative">
      {/* Nagłówek z tytułem i strzałką powrotu */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Wybór daty */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevDay}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button className="bg-green-500 text-white">
            {format(selectedDate, "d MMMM yyyy", { locale: pl })}
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextDay}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button
          size="icon"
          className="bg-black text-white hover:bg-gray-800"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Timeline */}
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

      {/* Modale */}
      {isJoinModalOpen && (
        <JoinEventModal
          onClose={() => setIsJoinModalOpen(false)}
          onConfirm={handleConfirmJoin}
          hasConfirm={
            selectedReservation?.currentPlayers < selectedReservation?.maxPlayers
          }
        />
      )}
      {isAddModalOpen && (
        <AddEventModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  );
}


"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import ConfirmationDialog from "./confirmDialog";
import WashingMachineCard from "./washingMashineCard";

// Generujemy godziny, co 2 godziny (np. 6:00, 8:00, 10:00, ...)
const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`);

export default function VerticalTimeline() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Maszyny i ich rezerwacje na godzinach
  const machines = [
    {
      id: 1,
      name: "Pralka 1",
      reservations: {
        "6:00": "free",
        "8:00": "reserved",
        "10:00": "reserved",
        "12:00": "free",
        "14:00": "free",
        "16:00": "reserved",
        "18:00": "free",
        "20:00": "free",
        "22:00": "free",
      },
    },
    {
      id: 2,
      name: "Pralka 2",
      reservations: {
        "6:00": "free",
        "8:00": "free",
        "10:00": "reserved",
        "12:00": "reserved",
        "14:00": "free",
        "16:00": "free",
        "18:00": "free",
        "20:00": "reserved",
        "22:00": "free",
      },
    },
    {
      id: 3,
      name: "Pralka 3",
      reservations: {
        "6:00": "reserved",
        "8:00": "free",
        "10:00": "free",
        "12:00": "free",
        "14:00": "reserved",
        "16:00": "free",
        "18:00": "free",
        "20:00": "free",
        "22:00": "reserved",
      },
    },
  ];

  const handleCardClick = (machineName, time) => {
    setSelectedMachine(machineName);
    setSelectedTime(time);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    // Logika rezerwacji po potwierdzeniu
    toast.success(
      `Rezerwacja potwierdzona dla ${selectedMachine} o godzinie ${selectedTime}`
    );
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() - 24 * 60 * 60 * 1000));
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() + 24 * 60 * 60 * 1000));
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevDay}
          className="text-black"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          {format(selectedDate, "d MMMM yyyy", { locale: pl })}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextDay}
          className="text-black"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="mb-4"></div>

      <div className="grid grid-cols-[80px_1fr] gap-5 h-[650px] overflow-y-auto">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="flex items-top justify-end pr-2 text-sm text-gray-500">
              {hour}
            </div>

            {/* Kontener z kartami pralek */}
            <div className="grid grid-cols-3 gap-2">
              {machines.map((machine) => (
                <WashingMachineCard
                  key={machine.id}
                  name={machine.name}
                  time={hour}
                  status={machine.reservations[hour]}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          machineName={selectedMachine}
          time={selectedTime}
        />
      </div>
    </div>
  );
}

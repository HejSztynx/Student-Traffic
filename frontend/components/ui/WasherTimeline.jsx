"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import WashingMachineCard from "./washingMashineCard";
import ConfirmationDialog from "./confirmDialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import useUserStore from "@/lib/store/userStore";

const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getMachineName(id) {
  const parts = id.split("-");
  return `${capitalizeFirstLetter(parts[0])} ${parts[1]}`;
}

export default function WasherTimeline({ title, floor }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [machines, setMachines] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {name, surname, id} = useUserStore();

  const machineType = searchParams.get("machine") || "washer";

  // Fetch machines from API when selectedDate or machineType changes
  useEffect(() => {
    const fetchMachines = async () => {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // yyyy-mm-dd
      const res = await fetch("http://localhost:8080/objects/laundry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          localDate: formattedDate,
          floor: Number(floor),
        }),
      });
      let data = await res.json();

      data = data.map((machine) => {
        return {
          name: getMachineName(machine.id),
          id: machine.id,
          reservations: machine.reservations,
        };
      });

      setMachines(data);
    };

    fetchMachines();
  }, [selectedDate, machineType, floor]);

  const handleCardClick = (machineName, time) => {
    setSelectedMachine(machineName);
    setSelectedTime(time);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    const reqBody = {
      objectId: selectedMachine,
      title: "",
      ownerDto: {
        ownerId: id,
        name: name,
        surname: surname,
      },
      day: Number(selectedDate.toISOString().split("T")[0].split("-")[2]),
      month: Number(selectedDate.toISOString().split("T")[0].split("-")[1]),
      year: Number(selectedDate.toISOString().split("T")[0].split("-")[0]),
      hour: Number(selectedTime.split(":")[0]),
    }

    console.log(reqBody)
    try {
      fetch("http://localhost:8080/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      
      toast.success(
        `Rezerwacja potwierdzona dla ${getMachineName(selectedMachine)} o ${selectedTime}`
      );
    } catch (error) {
      toast.error("Wystąpił błąd podczas rezerwacji.");
      return;
    }
    
    setIsDialogOpen(false);
  };

  const handleCancel = () => setIsDialogOpen(false);

  const handlePrevDay = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    if (prevDate >= new Date().setHours(0, 0, 0, 0)) {
      setSelectedDate(prevDate);
    }
  };

  const handleNextDay = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    if (nextDate <= maxDate) {
      setSelectedDate(nextDate);
    }
  };

  const isPastEvent = (eventDate, endTime) => {
    const [h, m] = endTime.split(":").map(Number);
    const end = new Date(eventDate);
    end.setHours(h, m, 0, 0);
    return end < new Date();
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevDay}
          disabled={selectedDate.toDateString() === new Date().toDateString()}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              {format(selectedDate, "d MMMM yyyy", { locale: pl })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date)}
              initialFocus
              disabled={(date) => {
                const today = new Date();
                const maxDate = new Date();
                today.setHours(0, 0, 0, 0);
                maxDate.setDate(today.getDate() + 8);
                return date < today || date >= maxDate;
              }}
            />
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNextDay}
          disabled={
            selectedDate.toDateString() ===
            new Date(new Date().getTime() + 7 * 86400000).toDateString()
          }
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-[80px_1fr] gap-5 h-[700px] overflow-y-auto">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="flex items-top justify-end pr-2 text-sm text-gray-500">
              {hour}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {machines.map((machine) => (
                <WashingMachineCard
                  key={machine.id}
                  name={machine.name}
                  time={hour}
                  status={machine.reservations[hour]}
                  selectedDate={selectedDate}
                  onClick={handleCardClick}
                  id={machine.id}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          machineName={getMachineName(selectedMachine)}
          time={selectedTime}
        />
      </div>
    </div>
  );
}

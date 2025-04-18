// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ReservationCard } from "./reservationCard";
// import JoinEventModal from "./join-event";
// import AddEventModal from "./add-event";
// import RemoveEvent  from "./remove-event";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
// import { format } from "date-fns";
// import { pl } from "date-fns/locale";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import useUserStore from "@/lib/store/userStore";

// const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`);


// export default function VerticalTimeline({ initialReservations = [], title }) {
//   const router = useRouter();

//   const { username } = useUserStore();

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [reservations, setReservations] = useState(initialReservations);
//   const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [selectedReservation, setSelectedReservation] = useState(null);
//   const [clickedTime, setClickedTime] = useState("");
//   const [eventToRemove, setEventToRemove] = useState(null);
//   const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

//   const filteredReservations = reservations.filter(
//     (res) => new Date(res.date).toDateString() === selectedDate.toDateString()
//   );

//   const handleCardClick = (reservation) => {
//     if (reservation.ownerName === username) {
//       return toast.error("Nie możesz dołączyć do swojego własnego wydarzenia.");
//     }
//     if (isPastTime(reservation.startTime)) {
//       return toast.error("Nie możesz dołączyć do wydarzenia, które już się rozpoczęło.");
//     }

//     if (reservation.currentPlayers >= reservation.maxPlayers) {
//       return toast.error("Nie można dołączyć, bo brakuje miejsc.");
//     }

//     setSelectedReservation(reservation);
//     setIsJoinModalOpen(true);
//   };

//   const handleEmptySlotClick = (time) => {
//     if (isPastTime(time)) {
//       return toast.error("Nie można zarezerwować slotu w przeszłości.");
//     }
//     setClickedTime(time);
//     setIsAddModalOpen(true);
//   };

//   const handleConfirmJoin = () => {
//     toast.success("Zapisano na event!");
//     setIsJoinModalOpen(false);
//     setSelectedReservation(null);
//   };

//   const handleAddEvent = (newEvent) => {
//     setReservations((prev) => [
//       ...prev,
//       {
//         ...newEvent,
//         date: selectedDate,
//         ownerName: username,
//       },
//     ]);
//     toast.success("Dodano nowy event!");
//     setIsAddModalOpen(false);
//   };

//   const handlePrevDay = () => {
//     const prevDate = new Date(selectedDate.getTime() - 86400000);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     if (prevDate >= today) {
//       setSelectedDate(prevDate);
//     }
//   };

//   const handleNextDay = () => {
//     const nextDate = new Date(selectedDate.getTime() + 86400000)
//     const today = new Date()
//     today.setHours(0, 0, 0, 0)
  
//     const maxDate = new Date(today.getTime() + 8 * 86400000) // dzisiaj + 3 dni
  
//     if (nextDate <= maxDate) {
//       setSelectedDate(nextDate)
//     }
//   }

//   const handleRemoveEvent = (reservation) => {
//     if (isPastTime(reservation.startTime)) {
//       return toast.error("Nie można usunąć wydarzenia, które już się rozpoczęło.");
//     }
//     if (reservation.ownerName !== username) {
//       return toast.error("Nie możesz usunąć wydarzenia, którego nie stworzyłeś.");
//     }
//     setEventToRemove(reservation);
//     setIsRemoveDialogOpen(true);
//   }
//   const handleConfirmRemove = () => {
//     setReservations((prev) => prev.filter(res => res !== eventToRemove));
//     toast.success("Usunięto event!");
//     setIsRemoveDialogOpen(false);
//     setEventToRemove(null);
//   }

//   const isPastTime = (hour) => {
//     const now = new Date();
//     const selected = new Date(selectedDate);
//     const [h, m] = hour.split(":");
//     selected.setHours(h, m, 0, 0);
//     return selected < now;
//   };

//   return (
//     <div className="relative">
//       {/* Header with title and back button */}
//       <div className="flex items-center gap-2 mb-6">
//         <Button variant="ghost" size="icon" onClick={() => router.back()}>
//           <ArrowLeft className="w-5 h-5" />
//         </Button>
//         <h1 className="text-lg font-semibold">{title}</h1>
//       </div>

//       {/* Date controls */}
//       <div className="flex items-center justify-center gap-2 mb-6">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={handlePrevDay}
//           disabled={new Date(selectedDate).toDateString() === new Date().toDateString()}
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </Button>
        
        
//         <Popover>
//         <PopoverTrigger asChild>
//           <Button className="bg-green-500 hover:bg-green-600 text-white">
//             {format(selectedDate, "d MMMM yyyy", { locale: pl })}
//           </Button>
//         </PopoverTrigger>

//         <PopoverContent className="p-0" align="center">
//           <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={(date) => setSelectedDate(date)}
//             initialFocus
//             disabled={(date) => {
//               const today = new Date()
//               today.setHours(0, 0, 0, 0)

//               const maxDate = new Date()
//               maxDate.setDate(today.getDate() + 8)
//               maxDate.setHours(0, 0, 0, 0)

//               return date < today || date >= maxDate
//             }}
//           />
//         </PopoverContent>
//       </Popover>




//         <Button variant="outline" size="icon" onClick={handleNextDay}>
//           <ChevronRight className="w-4 h-4" />
//         </Button>
//       </div>

//       {/* Timeline */}
//       <div className="grid grid-cols-[60px_1fr] gap-4 px-4 py-6">
//         {hours.map((hour) => {
//           const reservation = filteredReservations.find(
//             (res) => res.startTime === hour
//           );

//           return (
//             <React.Fragment key={hour}>
//               <div className="text-right pr-2 text-sm text-gray-500">{hour}</div>
//               <div className="min-h-[60px]">
//                 {reservation ? (
//                   <div
//                     onClick={() => handleCardClick(reservation)}
//                     className="cursor-pointer"
//                   >
//                     <ReservationCard
//                       {...reservation}
//                       onDelete={() => handleRemoveEvent(reservation)}
//                     />
//                   </div>
//                 ) : isPastTime(hour) ? (
//                   <div className="h-full border border-dashed border-red-300 rounded-xl flex items-center justify-center text-sm text-red-500">
//                     Niedostępne
//                   </div>
//                 ) : (
//                   <div
//                     onClick={() => handleEmptySlotClick(hour)}
//                     className="h-full border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-400 hover:bg-gray-100 cursor-pointer"
//                   >
//                     Wolne
//                   </div>
//                 )}
//               </div>
//             </React.Fragment>
//           );
//         })}
//       </div>

//       {/* Modals */}
//       {isJoinModalOpen && (
//         <JoinEventModal
//           onClose={() => setIsJoinModalOpen(false)}
//           onConfirm={handleConfirmJoin}
//           hasConfirm={
//             selectedReservation?.currentPlayers < selectedReservation?.maxPlayers
//           }
//         />
//       )}
//       {isAddModalOpen && (
//         <AddEventModal
//           onClose={() => setIsAddModalOpen(false)}
//           onSubmit={handleAddEvent}
//           defaultStartTime={clickedTime}
//         />
//       )}
//       {isRemoveDialogOpen && (
//         <RemoveEvent
//           open={isRemoveDialogOpen}
//           onClose={() => setIsRemoveDialogOpen(false)}
//           onConfirm={handleConfirmRemove}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReservationCard } from "./reservationCard";
import JoinEventModal from "./join-event";
import AddEventModal from "./add-event";
import RemoveEvent from "./remove-event";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import useUserStore from "@/lib/store/userStore";

const hours = Array.from({ length: 9 }, (_, i) => `${6 + i * 2}:00`);


const reservations = [
  {
    title: "Gramy meczycho",
    ownerName: "Kuba",
    currentPlayers: 5,
    maxPlayers: 51,
    startTime: "14:00",
    endTime: "16:00",
    date: new Date("2025-04-13"),
  },
];

export default function VerticalTimeline({ initialReservations = [], title }) {
  const router = useRouter();
  const { username } = useUserStore();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState(initialReservations);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [clickedTime, setClickedTime] = useState("");
  const [eventToRemove, setEventToRemove] = useState(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();

        const res = await fetch("http://localhost:8080/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year,
            month,
            day,
            objectId: title.toUpperCase(),
          }),
        });

        if (!res.ok) throw new Error("Błąd podczas pobierania wydarzeń!");

        const data = await res.json();

        const mappedData = data.map(event => ({
          title: event.title,
          // ownerName: event.reservationId.split("-_-")[1] || "Nieznany",
          ownerName: event.description,
          currentPlayers: event.joinedPlayers,
          maxPlayers: event.joinedPlayers + event.playersNeeded,
          startTime: `${event.startHour.toString().padStart(2, '0')}:00`,
          endTime: `${event.endHour.toString().padStart(2, '0')}:00`,
          date: new Date(event.year, event.month - 1, event.day),
        }));

        console.log("Zmapowane eventy:", mappedData);
        setReservations(mappedData);


      } catch (error) {
        console.error(error);
        toast.error("Nie udało się pobrać wydarzeń!");
      }
    };

    fetchEvents();
  }, [selectedDate, title]);

  const filteredReservations = reservations || [];

  const handleCardClick = (reservation) => {
    if (reservation.ownerName === username)
      return toast.error("Nie możesz dołączyć do swojego własnego wydarzenia.");

    if (isPastTime(reservation.startTime))
      return toast.error("Nie możesz dołączyć do wydarzenia, które już się rozpoczęło.");

    if (reservation.currentPlayers >= reservation.maxPlayers)
      return toast.error("Nie można dołączyć, bo brakuje miejsc.");

    setSelectedReservation(reservation);
    setIsJoinModalOpen(true);
  };

  const handleEmptySlotClick = (time) => {
    if (isPastTime(time))
      return toast.error("Nie można zarezerwować slotu w przeszłości.");
    setClickedTime(time);
    setIsAddModalOpen(true);
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
        ownerName: username,
      },
    ]);
    toast.success("Dodano nowy event!");
    setIsAddModalOpen(false);
  };

  const handlePrevDay = () => {
    const prevDate = new Date(selectedDate.getTime() - 86400000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (prevDate >= today) setSelectedDate(prevDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(selectedDate.getTime() + 86400000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today.getTime() + 8 * 86400000);
    if (nextDate <= maxDate) setSelectedDate(nextDate);
  };

  const handleRemoveEvent = (reservation) => {
    if (isPastTime(reservation.startTime))
      return toast.error("Nie można usunąć wydarzenia, które już się rozpoczęło.");
    if (reservation.ownerName !== username)
      return toast.error("Nie możesz usunąć wydarzenia, którego nie stworzyłeś.");
    setEventToRemove(reservation);
    setIsRemoveDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    setReservations((prev) => prev.filter((res) => res !== eventToRemove));
    toast.success("Usunięto event!");
    setIsRemoveDialogOpen(false);
    setEventToRemove(null);
  };

  const isPastTime = (hour) => {
    const now = new Date();
    const selected = new Date(selectedDate);
    const [h, m] = hour.split(":");
    selected.setHours(h, m, 0, 0);
    return selected < now;
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center justify-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={handlePrevDay} disabled={new Date(selectedDate).toDateString() === new Date().toDateString()}>
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
                today.setHours(0, 0, 0, 0);
                const maxDate = new Date(today.getTime() + 8 * 86400000);
                maxDate.setHours(0, 0, 0, 0);
                return date < today || date >= maxDate;
              }}
            />
          </PopoverContent>
        </Popover>

        <Button variant="outline" size="icon" onClick={handleNextDay}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {filteredReservations.length === 0 && (
        <div className="text-center text-gray-500 text-sm mb-4">
          Brak wydarzeń w tym dniu
        </div>
      )}

      <div className="grid grid-cols-[60px_1fr] gap-4 px-4 py-6">
        {hours.map((hour) => {
          const reservation = filteredReservations.find(
            (res) => res.startTime === hour
          );

          return (
            <React.Fragment key={hour}>
              <div className="text-right pr-2 text-sm text-gray-500">{hour}</div>
              <div className="min-h-[60px]">
                {reservation ? (
                  <div
                    onClick={() => handleCardClick(reservation)}
                    className="cursor-pointer"
                  >
                    <ReservationCard
                      {...reservation}
                      onDelete={() => handleRemoveEvent(reservation)}
                    />
                  </div>
                ) : isPastTime(hour) ? (
                  <div className="h-full border border-dashed border-red-300 rounded-xl flex items-center justify-center text-sm text-red-500">
                    Niedostępne
                  </div>
                ) : (
                  <div
                    onClick={() => handleEmptySlotClick(hour)}
                    className="h-full border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-400 hover:bg-gray-100 cursor-pointer"
                  >
                    Wolne
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {isJoinModalOpen && (
        <JoinEventModal
          onClose={() => setIsJoinModalOpen(false)}
          onConfirm={handleConfirmJoin}
          hasConfirm={selectedReservation?.currentPlayers < selectedReservation?.maxPlayers}
        />
      )}
      {isAddModalOpen && (
        <AddEventModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddEvent}
          defaultStartTime={clickedTime}
        />
      )}
      {isRemoveDialogOpen && (
        <RemoveEvent
          open={isRemoveDialogOpen}
          onClose={() => setIsRemoveDialogOpen(false)}
          onConfirm={handleConfirmRemove}
        />
      )}
    </div>
  );
}

import EventSchedule from "@/components/ui/eventSchedule";

// Mock rezerwacji
const reservations = [
  {
    title: "Gramy meczycho",
    ownerName: "Kuba",
    currentPlayers: 5,
    maxPlayers: 14,
    startTime: "16:00",
    endTime: "18:30",
  },
  {
    title: "Trenujemy",
    ownerName: "Adam",
    currentPlayers: 4,
    maxPlayers: 6,
    startTime: "20:00",
    endTime: "21:30",
  },
];

export default function BasketballPage() {
  return <EventSchedule reservations={reservations} />;
}

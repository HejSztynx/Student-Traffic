import EventSchedule from "@/components/ui/eventSchedule";

// Mock rezerwacji
const reservations = [
  {
    title: "Robimy klatę",
    ownerName: "Tomek",
    currentPlayers: 2,
    maxPlayers: 2,
    startTime: "14:00",
    endTime: "15:30",
  },
];

export default function FootballPage() {
  return <EventSchedule reservations={reservations} />;
}
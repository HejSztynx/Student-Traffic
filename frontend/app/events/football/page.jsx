import EventSchedule from "@/components/ui/eventSchedule";

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

export default function FootballPage() {
  return <EventSchedule reservations={reservations} />;
}

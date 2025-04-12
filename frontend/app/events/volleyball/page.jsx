import EventSchedule from "@/components/ui/eventSchedule";

const reservations = [
  {
    title: "Gramy meczycho",
    ownerName: "Kuba",
    currentPlayers: 5,
    maxPlayers: 14,
    startTime: "10:00",
    endTime: "12:00",
  },
];

export default function BasketballPage() {
  return <EventSchedule reservations={reservations} />;
}

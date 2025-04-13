"use client";

import React from "react";
import VerticalTimeline from "@/components/ui/eventSchedule";

const reservations = [
  {
    title: "Gramy meczycho",
    ownerName: "Kuba",
    currentPlayers: 5,
    maxPlayers: 14,
    startTime: "10:00",
    endTime: "12:00",
    date: new Date("2025-04-14"),
  },
];

export default function FootballPage() {
  return <VerticalTimeline initialReservations={reservations} title="⚽ Boisko do piłki nożnej" />;
}


"use client";

import React from "react";
import VerticalTimeline from "@/components/ui/eventSchedule";

const reservations = [
  {
    title: "Gramy meczycho",
    ownerName: "Kuba",
    currentPlayers: 5,
    maxPlayers: 5,
    startTime: "8:00",
    endTime: "10:00",
    date: new Date("2025-04-13"),
  },
];

export default function FootballPage() {
  return <VerticalTimeline initialReservations={reservations} title="⚽ Boisko do piłki nożnej" />;
}


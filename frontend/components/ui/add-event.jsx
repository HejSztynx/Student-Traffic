'use client';

import React, { useState } from "react";

export default function AddEventModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      maxParticipants,
      startHour,
      endHour,
    };
    console.log("Nowy event:", newEvent);
    onClose();
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white border border-gray-200 rounded-xl p-6 shadow-lg w-[90%] max-w-md animate-slideUp">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-black"
      >
        <h2 className="text-xl font-bold text-center">Dodaj nowy event</h2>

        <label className="flex flex-col">
          Tytuł
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-2"
          />
        </label>

        <label className="flex flex-col">
          Maksymalna liczba uczestników
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-2 w-24"
          />
        </label>

        <div>
          <p>Godzina</p>
          <div className="flex gap-4">
            <div className="flex flex-col">
              Od:
              <input
                type="text"
                placeholder="10:00"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="border border-gray-400 rounded-xl px-2 py-1 w-20 text-center"
              />
            </div>
            <div className="flex flex-col">
              Do:
              <input
                type="text"
                placeholder="12:00"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="border border-gray-400 rounded-xl px-2 py-1 w-20 text-center"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-xl"
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
}

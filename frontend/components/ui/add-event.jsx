'use client'

import React, { useState } from "react"

export default function AddEventModal({ onClose }) {
  const [title, setTitle] = useState("")
  const [maxParticipants, setMaxParticipants] = useState("")
  const [startHour, setStartHour] = useState("")
  const [endHour, setEndHour] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEvent = {
      title,
      maxParticipants,
      startHour,
      endHour,
    }
    console.log("Nowy event:", newEvent)
    onClose() // zamyka modal
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl flex flex-col items-center gap-4 w-80 text-black"
      >
        <h2 className="text-xl font-bold text-black">Dodaj nowy event</h2>

        <label className="flex flex-col items-center w-full">
          Tytuł
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-2 w-full"
          />
        </label>

        <label className="flex flex-col items-center w-full">
          Maksymalna liczba uczestników
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-2 w-20 text-center"
          />
        </label>

        <div className="text-center w-full">
          Godzina
          <div className="flex gap-4 justify-center mt-2">
            <div className="flex flex-col items-center">
              Od:
              <input
                type="text"
                placeholder="10:00"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="border border-gray-400 rounded-xl px-2 py-1 w-16 text-center"
              />
            </div>
            <div className="flex flex-col items-center">
              Do:
              <input
                type="text"
                placeholder="12:00"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="border border-gray-400 rounded-xl px-2 py-1 w-16 text-center"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-black px-4 py-2 rounded-xl"
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
  )
}
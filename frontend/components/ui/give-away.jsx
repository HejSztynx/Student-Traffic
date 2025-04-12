'use client'

import React, { useState } from "react"

export default function GiveAwayModal({ onClose }) {
  const [itemName, setItemName] = useState("")
  const [exchange, setExchange] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newOffer = {
      itemName,
      exchange,
      description,
      location,
    }
    console.log("Propozycja oddania:", newOffer)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl flex flex-col items-center gap-4 w-80 text-black"
      >
        <h2 className="text-xl font-bold text-green-800">Nowa propozycja</h2>

        <label className="flex flex-col items-center w-full">
          Co oddajesz?
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-2 w-full"
          />
        </label>

        <label className="flex flex-col items-center w-full">
          Za co?
          <input
            type="text"
            value={exchange}
            onChange={(e) => setExchange(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-2 w-full"
          />
        </label>

        <label className="flex flex-col items-center w-full">
          Opis
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-2 w-full h-24 resize-none"
          />
        </label>

        <label className="flex flex-col items-center w-full">
          Miejsce
          <input
            type="text"
            placeholder="np. pokój 205, kuchnia"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-2 w-full"
          />
        </label>

        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-xl"
          >
            Anuluj
          </button>

          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded-xl"
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  )
}

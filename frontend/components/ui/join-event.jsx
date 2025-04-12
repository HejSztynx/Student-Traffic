import React from "react"

export default function JoinEventModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl flex flex-col items-center gap-4">
        <p className="text-black text-center text-lg">
          Czy na pewno chcesz zapisać się na event?
        </p>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="bg-red-500 px-4 py-2 rounded-xl"
          >
            Anuluj
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded-xl"
          >
            Zapisz się
          </button>
        </div>
      </div>
    </div>
  )
}

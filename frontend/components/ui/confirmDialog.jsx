import React from "react"
import { Button } from "@/components/ui/button"

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, machineName, time }) => {
  if (!isOpen) return null // Nie renderujemy, jeśli okno jest zamknięte

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          Czy potwierdzasz rezerwację {machineName} w godzinach {time}?
        </h2>
        <div className="flex justify-between">
          <Button onClick={onConfirm} className="bg-green-500 text-white">
            TAK
          </Button>
          <Button onClick={onCancel} className="bg-red-500 text-white">
            NIE
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDialog

import React from 'react';
import { Trash2 } from 'lucide-react';

export const ReservationCard = ({
  title,
  ownerName,
  currentPlayers,
  maxPlayers,
  startTime,
  endTime,
  onDelete,
}) => {
  return (
    <div className="bg-red-500 rounded-xl shadow-md p-4 text-white w-full max-w-md mx-auto flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm mt-1">{ownerName}</p>
        <p className="text-sm">{currentPlayers} / {maxPlayers}</p>
        <p className="text-sm mt-2">
          {startTime} - {endTime}
        </p>
      </div>

      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-4 hover:text-gray-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
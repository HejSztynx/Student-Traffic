import React from 'react';

export const ReservationCard = ({ title, ownerName, currentPlayers, maxPlayers, startTime, endTime }) => {
  return (
    <div className="bg-red-500 rounded-xl shadow-md p-4 text-white w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-1">{ownerName}</p>
      <p className="text-sm">{currentPlayers} / {maxPlayers}</p>
      <p className="text-sm mt-2">
        {startTime} - {endTime}
      </p>
    </div>
  );
};
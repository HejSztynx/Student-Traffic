// 'use client';

// import React, { useState } from 'react';
// import VerticalTimeline from '@/components/ui/eventSchedule';
// import { format } from 'date-fns';
// import { pl } from 'date-fns/locale';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
// import AddEventModal from '@/components/ui/add-event';

// export default function ReservationPage() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isModalOpen, setIsModalOpen] = useState(false); 

//   const handlePrevDay = () => {
//     setSelectedDate((prev) => new Date(prev.getTime() - 24 * 60 * 60 * 1000));
//   };

//   const handleNextDay = () => {
//     setSelectedDate((prev) => new Date(prev.getTime() + 24 * 60 * 60 * 1000));
//   };

//   const handleCreateEvent = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <main className="min-h-screen bg-white px-4 py-6 max-w-md mx-auto">
//       {/* Header */}
//       <div className="flex flex-col items-center gap-4 mb-6">
//         <h1 className="text-lg font-semibold">Boisko - piłka nożna</h1>

//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="icon" onClick={handlePrevDay}>
//             <ChevronLeft className="w-4 h-4" />
//           </Button>
//           <Button className="bg-green-500 hover:bg-green-600 text-white">
//             {format(selectedDate, 'd MMMM yyyy', { locale: pl })}
//           </Button>
//           <Button variant="outline" size="icon" onClick={handleNextDay}>
//             <ChevronRight className="w-4 h-4" />
//           </Button>
//         </div>

//         <Button
//           size="icon"
//           className="rounded-full bg-black text-white hover:bg-gray-800"
//           onClick={handleCreateEvent}
//         >
//           <Plus className="w-5 h-5" />
//         </Button>
//       </div>

//       {/* Timeline */}
//       <VerticalTimeline selectedDate={selectedDate} />

//       {/* Modal */}
//       {isModalOpen && <AddEventModal onClose={handleCloseModal} />}
//     </main>
//   );
// }
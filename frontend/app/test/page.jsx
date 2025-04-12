import React from 'react'
import VerticalTimeline from '@/components/ui/verticalTimeLine'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Rezerwacja Pralek</h1>
        <VerticalTimeline />
      </div>
    </div>
  )
}

export default App 

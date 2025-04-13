// 'use client'

// import { useState } from "react"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { toast } from "sonner"



// const devices = [
//   { id: "pralka", name: "Pralka", icon: "🧺" },
//   { id: "suszarka", name: "Suszarka", icon: "🌀" },
//   { id: "boisko", name: "Boisko", icon: "🏟️" },
//   { id: "kuchenka", name: "Kuchenka gazowa", icon: "🔥" },
//   { id: "piekarnik", name: "Piekarnik", icon: "♨️" },
//   { id: "lazienka", name: "Łazienka", icon: "🚿" },
//   { id: "winda", name: "Winda", icon: "🛗" },
// ]

// const floorsEven = Array.from({ length: 7 }, (_, i) => (i + 1) * 2)
// const floorsOdd = Array.from({ length: 8 }, (_, i) => i * 2 + 1)
// const allFloors = Array.from({ length: 15 }, (_, i) => i + 1)

// const sportsFields = [
//   { name: "Piłka nożna", icon: "⚽" },
//   { name: "Siatkówka", icon: "🏐" },
//   { name: "Koszykówka", icon: "🏀" },
// ]

// export default function Page() {
//   const [selectedDevice, setSelectedDevice] = useState("")
//   const [description, setDescription] = useState("")
//   const [location, setLocation] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const finalLocation =
//       typeof location === "string"
//         ? location
//         : `${selectedDevice} ${location.number}, Piętro ${location.floor}`

//     const failureReport = {
//       deviceName: selectedDevice,
//       location: finalLocation,
//       description,
//     }

//     try {
//           const res = await fetch("http://localhost:8080/announcements/post", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               offeredItem: itemName,
//               location: location,
//               price: exchange,
//               description: description,
//             }),
//           })
    
//           if (!res.ok) {
//             throw new Error("Coś poszło nie tak przy wysyłaniu!")
//           }
    
//           toast.success("Pomyślnie dodano ogłoszenie!")
    
//           setItemName("")
//           setExchange("")
//           setDescription("")
//           setLocation("")
//         } catch (error) {
//           console.error(error)
//           toast.error("Błąd podczas wysyłania ogłoszenia!")
//         }

//     console.log("Zgłoszona awaria:", failureReport)
//     toast.success("Awaria zgłoszona pomyślnie")
//     setSelectedDevice("")
//     setDescription("")
//     setLocation("")
//   }

//   return (
//     <main className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Zgłoś awarię</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-6">

//         <div className="flex flex-wrap gap-4 justify-center">
//           {devices.map(({ id, name, icon }) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => {
//                 setSelectedDevice(name)
//                 setLocation("")
//               }}
//               className={`flex flex-col items-center p-4 border rounded-lg text-2xl transition ${
//                 selectedDevice === name ? 'border-primary' : 'border-muted'
//               }`}
//             >
//               <span>{icon}</span>
//               <span className="text-xs mt-1">{name}</span>
//             </button>
//           ))}
//         </div>

//         {selectedDevice && (
//           <div className="flex flex-col gap-4">
//             {selectedDevice === "Boisko" ? (
//               <>
//                 <label>Typ boiska</label>
//                 <div className="flex gap-2">
//                   {sportsFields.map(({ name, icon }) => (
//                     <button
//                       key={name}
//                       type="button"
//                       onClick={() => setLocation(name)}
//                       className={`border rounded p-2 flex-1 text-xl ${
//                         location === name ? 'border-primary' : 'border-muted'
//                       }`}
//                     >
//                       <span>{icon}</span>
//                       <div className="text-xs">{name}</div>
//                     </button>
//                   ))}
//                 </div>
//               </>
//             ) : selectedDevice === "Łazienka" ? (
//               <>
//                 <label>Numer pokoju</label>
//                 <Input
//                   placeholder="Np. 205"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </>
//             ) : selectedDevice === "Winda" ? (
//               <>
//                 <label>Numer windy</label>
//                 <div className="flex gap-2">
//                   {[1, 2, 3, 4].map((nr) => (
//                     <button
//                       key={nr}
//                       type="button"
//                       onClick={() => setLocation(`Winda ${nr}`)}
//                       className={`border rounded p-2 w-full ${
//                         location === `Winda ${nr}` ? 'border-primary' : 'border-muted'
//                       }`}
//                     >
//                       🛗 {nr}
//                     </button>
//                   ))}
//                 </div>
//               </>
//             ) : selectedDevice === "Pralka" || selectedDevice === "Kuchenka gazowa" ? (
//               <>
//                 <label>Piętro</label>
//                 <select
//                   className="w-full border rounded p-2 bg-black text-white"
//                   value={location?.floor || ""}
//                   onChange={(e) => setLocation({ floor: e.target.value, number: "" })}
//                 >
//                   <option value="">Wybierz piętro</option>
//                   {(selectedDevice === "Pralka" ? floorsEven : allFloors).map((floor) => (
//                     <option key={floor} value={floor}>{floor}</option>
//                   ))}
//                 </select>

//                 {location?.floor && (
//                   <>
//                     <label>Numer {selectedDevice.toLowerCase()}</label>
//                     <div className="flex gap-2">
//                       {[1, 2, 3].map((nr) => (
//                         <button
//                           key={nr}
//                           type="button"
//                           onClick={() => setLocation({ ...location, number: nr })}
//                           className={`border rounded p-2 w-full ${
//                             location?.number == nr ? 'border-primary' : 'border-muted'
//                           }`}
//                         >
//                           {nr}
//                         </button>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </>
//             ) : (
//               <>
//                 <label>Piętro</label>
//                 <select
//                   className="w-full border rounded p-2 bg-black text-white"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 >
//                   <option value="">Wybierz piętro</option>
//                   {(selectedDevice === "Suszarka" ? floorsOdd : allFloors).map((floor) => (
//                     <option key={floor} value={`Piętro ${floor}`}>Piętro {floor}</option>
//                   ))}
//                 </select>
//               </>
//             )}
//           </div>
//         )}

//         <div>
//           <label>Opis awarii</label>
//           <Textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="flex justify-end gap-2">
//           <Button type="submit" disabled={!selectedDevice || !location}>
//             Zgłoś
//           </Button>
//         </div>
//       </form>
//     </main>
//   )
// }

'use client'

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const devices = [
  { id: "pralka", name: "Pralka", icon: "🧺" },
  { id: "suszarka", name: "Suszarka", icon: "🌀" },
  { id: "boisko", name: "Boisko", icon: "🏟️" },
  { id: "kuchenka", name: "Kuchenka gazowa", icon: "🔥" },
  { id: "piekarnik", name: "Piekarnik", icon: "♨️" },
  { id: "lazienka", name: "Łazienka", icon: "🚿" },
  { id: "winda", name: "Winda", icon: "🛗" },
]

const floorsEven = Array.from({ length: 7 }, (_, i) => (i + 1) * 2)
const floorsOdd = Array.from({ length: 8 }, (_, i) => i * 2 + 1)
const allFloors = Array.from({ length: 15 }, (_, i) => i + 1)

const sportsFields = [
  { name: "Piłka nożna", icon: "⚽" },
  { name: "Siatkówka", icon: "🏐" },
  { name: "Koszykówka", icon: "🏀" },
]


export default function Page() {
  const [selectedDevice, setSelectedDevice] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedDevice || !location) return toast.error("Uzupełnij wszystkie pola")

    let objectId = ""

    if (typeof location === "object" && location.floor && location.number) {
      // Pralka / Kuchenka
      objectId = `${selectedDevice.toLowerCase()}-${location.number}-${location.floor}`
    } else if (selectedDevice === "Winda") {
      // Winda np. "winda-2"
      const number = location.replace("Winda ", "")
      objectId = `winda-${number}`
    } else {
      // Inne urządzenia
      objectId = `${selectedDevice.toLowerCase()}-${location}`
    }

    try {
      const res = await fetch(`http://localhost:8080/damage/report?objectId=${objectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
        }),
      })

      if (!res.ok) {
        throw new Error("Coś poszło nie tak!")
      }

      toast.success("Awaria zgłoszona pomyślnie!")
      setSelectedDevice("")
      setLocation("")
      setDescription("")
    } catch (error) {
      console.error(error)
      toast.error("Błąd podczas zgłaszania awarii!")
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Zgłoś awarię</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

<div className="flex flex-wrap gap-4 justify-center">
  {devices.map(({ id, name, icon }) => (
    <button
      key={id}
      type="button"
      onClick={() => {
        setSelectedDevice(name)
        setLocation("")
      }}
      className={`flex flex-col items-center p-4 border rounded-lg text-2xl transition ${
        selectedDevice === name ? 'border-primary' : 'border-muted'
      }`}
    >
      <span>{icon}</span>
      <span className="text-xs mt-1">{name}</span>
    </button>
  ))}
</div>

{selectedDevice && (
  <div className="flex flex-col gap-4">
    {selectedDevice === "Boisko" ? (
      <>
        <label>Typ boiska</label>
        <div className="flex gap-2">
          {sportsFields.map(({ name, icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => setLocation(name)}
              className={`border rounded p-2 flex-1 text-xl ${
                location === name ? 'border-primary' : 'border-muted'
              }`}
            >
              <span>{icon}</span>
              <div className="text-xs">{name}</div>
            </button>
          ))}
        </div>
      </>
    ) : selectedDevice === "Łazienka" ? (
      <>
        <label>Numer pokoju</label>
        <Input
          placeholder="Np. 205"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </>
    ) : selectedDevice === "Winda" ? (
      <>
        <label>Numer windy</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((nr) => (
            <button
              key={nr}
              type="button"
              onClick={() => setLocation(`Winda ${nr}`)}
              className={`border rounded p-2 w-full ${
                location === `Winda ${nr}` ? 'border-primary' : 'border-muted'
              }`}
            >
              🛗 {nr}
            </button>
          ))}
        </div>
      </>
    ) : selectedDevice === "Pralka" || selectedDevice === "Kuchenka gazowa" || selectedDevice === "Suszarka" ? (
      <>
        <label>Piętro</label>
        <select
          className="w-full border rounded p-2 bg-black text-white"
          value={location?.floor || ""}
          onChange={(e) => setLocation({ floor: e.target.value, number: "" })}
        >
          <option value="">Wybierz piętro</option>
          {(selectedDevice === "Pralka"
            ? floorsEven
            : selectedDevice === "Suszarka"
            ? floorsOdd
            : allFloors
          ).map((floor) => (
            <option key={floor} value={floor}>
              {floor}
            </option>
          ))}
        </select>


        {location?.floor && (
          <>
            <label>Numer {selectedDevice.toLowerCase()}</label>
            <div className="flex gap-2">
              {[1, 2, 3].map((nr) => (
                <button
                  key={nr}
                  type="button"
                  onClick={() => setLocation({ ...location, number: nr })}
                  className={`border rounded p-2 w-full ${
                    location?.number == nr ? 'border-primary' : 'border-muted'
                  }`}
                >
                  {nr}
                </button>
              ))}
            </div>
          </>
        )}
      </>
    ) : (
      <>
        <label>Piętro</label>
        <select
          className="w-full border rounded p-2 bg-black text-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Wybierz piętro</option>
          {(selectedDevice === "Suszarka" ? floorsOdd : allFloors).map((floor) => (
            <option key={floor} value={`Piętro ${floor}`}>Piętro {floor}</option>
          ))}
        </select>
      </>
    )}
  </div>
)}

<div>
  <label>Opis awarii</label>
  <Textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
</div>

<div className="flex justify-end gap-2">
  <Button type="submit" disabled={!selectedDevice || !location}>
    Zgłoś
  </Button>
</div>
</form>
</main>
)
}

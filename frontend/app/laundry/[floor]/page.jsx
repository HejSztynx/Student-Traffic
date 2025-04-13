import WasherTimeline from "@/components/ui/WasherTimeline";

export default async function Page({ params, searchParams }) {
  const { floor } = await params;
  const machine = (await searchParams).machine;

  const text = machine === "dryer" ? "Suszarnia" : "Pralnia";

  const machines = [
    {
      id: 1,
      name: "Pralka 1",
      reservations: {
        "6:00": "free",
        "8:00": "reserved",
        "10:00": "reserved",
        "12:00": "free",
        "14:00": "free",
        "16:00": "reserved",
        "18:00": "free",
        "20:00": "free",
        "22:00": "free",
      },
    },
    {
      id: 2,
      name: "Pralka 2",
      reservations: {
        "6:00": "free",
        "8:00": "free",
        "10:00": "reserved",
        "12:00": "reserved",
        "14:00": "free",
        "16:00": "free",
        "18:00": "free",
        "20:00": "reserved",
        "22:00": "free",
      },
    },
    {
      id: 3,
      name: "Pralka 3",
      reservations: {
        "6:00": "reserved",
        "8:00": "free",
        "10:00": "free",
        "12:00": "free",
        "14:00": "reserved",
        "16:00": "free",
        "18:00": "free",
        "20:00": "free",
        "22:00": "reserved",
      },
    },
  ]

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        {text} - Piętro {floor}
      </h1>
  
      {machine === "dryer" ? (
        <WasherTimeline machines={machines} title="Suszarnia" />
      ) : (
        <WasherTimeline machines={machines} title="Pralnia" />
      )}
    </>
  );
}  

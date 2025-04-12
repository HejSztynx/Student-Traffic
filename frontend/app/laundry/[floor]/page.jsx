import WasherTimeline from "@/components/ui/WasherTimeline";
import DryerTimeline from "@/components/ui/dryerTimeline";

export default async function Page({ params, searchParams }) {
  const { floor } = await params;
  const machine = (await searchParams).machine;

  const text = machine === "dryer" ? "Suszarnia" : "Pralnia";

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        {text} - Piętro {floor}
      </h1>
      {machine === "dryer" ? <DryerTimeline /> : <WasherTimeline />}
    </>
  );
}

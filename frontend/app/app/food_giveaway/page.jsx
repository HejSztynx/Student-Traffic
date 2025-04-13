import GiveAwayModal  from "@/components/ui/give-away";

export default function FoodPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black-100">
        <h1 className="text-3xl font-bold mb-4">Too good to go</h1>
        <GiveAwayModal />
        </div>
    );
}
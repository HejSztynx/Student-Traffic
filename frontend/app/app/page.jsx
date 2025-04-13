"use client";

import useUserStore from "@/lib/store/userStore";

export default function Home() {
  const { username } = useUserStore();

  return (
    <div className="flex justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="text-center mt-64">
        <h1 className="text-4xl">Student Traffic</h1>
        <h2 className="text-3xl">Witaj, {username}!</h2>
      </div>
    </div>
  );
}

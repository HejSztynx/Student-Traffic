"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserStore from "@/lib/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const { setUser } = useUserStore();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.info("Wypełnij wszystkie pola!");
      return;
    }

    try {
      const res = await fetch("https://hackathon-backend-hdry.onrender.com/login/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, passedPassword: password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error("Błąd logowania: " + errorText);
        return;
      }

      const data = await res.json();
      toast.success("Zalogowano pomyślnie!");

      setUser(username, data.ownerId, data.name, data.surname);

      router.push("/app");
    } catch (err) {
      console.error("Błąd połączenia:", err);
      toast.error("Wystąpił błąd podczas logowania.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Zaloguj się</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username">Nazwa użytkownika</Label>
              <Input
                id="username"
                type="text"
                placeholder="np. adam233"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full mt-2">
              Zaloguj się
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

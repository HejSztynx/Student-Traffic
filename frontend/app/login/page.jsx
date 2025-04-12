"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.info("Wypełnij wszystkie pola!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/login/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, passedPassword: password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error("Błąd logowania: " + errorText);
        return;
      }

      const data = await res.json();
      toast.success("Zalogowano pomyślnie!");
      console.log("Logowanie udane:", data);

      // Możesz zapisać token/session info jeśli trzeba

      router.push("/");
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="adres@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

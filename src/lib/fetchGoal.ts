// src/lib/fetchGoal.ts
import { cookies } from "next/headers";

export async function fetchGoal(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${baseUrl}/api/goals/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // <-- pass session cookies
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch goal", await res.text());
    return null;
  }

  return res.json();
}

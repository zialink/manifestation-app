"use client"; // needed because we’re using signOut and client-side hooks
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Target,
  Quote,
  Moon,
  LogOut,
  User,
  Settings,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      {/* Top bar */}
      <header className="h-16 bg-white shadow flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">Welcome back 👋</span>
        </div>
      </header>
      {/* Content area */}
      <section className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Manifestation Hub
          </h2>
          <p className="text-gray-600">
            This is your private dashboard. From here, you can set new goals,
            repeat affirmations, and access hypnosis scripts to shape your
            mindset.
          </p>
        </div>
      </section>
    </>
  );
}

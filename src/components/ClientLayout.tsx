"use client";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 overflow-y-auto min-h-screen relative">
        {children}
      </main>
    </div>
  );
}

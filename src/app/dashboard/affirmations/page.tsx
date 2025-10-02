"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AffirmationsPage() {
  return (
    <div className="p-6">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold">Affirmations</h1>
      <p className="mt-2 text-gray-600">
        Here you will see and manage your affirmations.
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HypnosisPage() {
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

      <h1 className="text-2xl font-bold">Hypnosis</h1>
      <p className="mt-2 text-gray-600">
        Here you will find and manage your hypnosis scripts.
      </p>
    </div>
  );
}

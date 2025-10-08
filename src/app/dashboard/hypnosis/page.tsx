import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function HypnosisPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <div className="p-6">You must be signed in to view hypnosis scripts.</div>
    );
  }
  const scripts = await prisma.hypnosis.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  const generatedHypnosisScripts = [
    "Imagine yourself deeply relaxed as calm confidence fills your mind...",
    "As you breathe in peace and exhale doubt, you visualize your goal vividly...",
  ];
  return (
    <div className="p-6">
      <Link
        href="/dashboard"
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold">Hypnosis</h1>
      <ul className="mt-4 space-y-2">
        {scripts.length === 0
          ? generatedHypnosisScripts.map((text, idx) => (
              <li
                key={idx}
                className="bg-white rounded shadow p-3 text-gray-800"
              >
                {text}
              </li>
            ))
          : scripts.map((s) => (
              <li
                key={s.id}
                className="bg-white rounded shadow p-3 text-gray-800"
              >
                {s.content}
              </li>
            ))}
      </ul>
    </div>
  );
}

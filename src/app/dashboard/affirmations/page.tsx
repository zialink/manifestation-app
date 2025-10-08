import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function AffirmationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <div className="p-6">You must be signed in to view affirmations.</div>
    );
  }
  const affirmations = await prisma.affirmation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  const generatedAffirmations = [
    "I am fully aligned with my goal and attract success easily.",
    "Every day I move closer to fulfilling my divine purpose.",
    "My faith and focus open doors to limitless opportunities.",
    "I am worthy of abundance and consistent growth.",
    "My actions today create lasting blessings for tomorrow.",
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
      <h1 className="text-2xl font-bold">Affirmations</h1>
      <ul className="mt-4 space-y-2">
        {affirmations.length === 0
          ? generatedAffirmations.map((text, idx) => (
              <li
                key={idx}
                className="bg-white rounded shadow p-3 text-gray-800"
              >
                {text}
              </li>
            ))
          : affirmations.map((a) => (
              <li
                key={a.id}
                className="bg-white rounded shadow p-3 text-gray-800"
              >
                {a.content}
              </li>
            ))}
      </ul>
    </div>
  );
}

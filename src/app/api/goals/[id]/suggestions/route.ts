import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// POST — Save a user-selected suggestion
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, content, suggestionId } = await req.json();
  if (!type || !content || !suggestionId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Save selected suggestion
  const saved = await prisma.goalSuggestion.create({
    data: {
      goalId: params.id,
      userId: session.user.id,
      type,
      content,
      suggestionId,
    },
  });

  return NextResponse.json(saved);
}

// GET — Fetch saved + generated suggestions
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const saved = await prisma.goalSuggestion.findMany({
    where: { goalId: params.id, userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  // Simulated generated suggestions
  const generatedAffirmations = [
    "I am fully aligned with my goal and attract success easily.",
    "Every day I move closer to fulfilling my divine purpose.",
    "My faith and focus open doors to limitless opportunities.",
    "I am worthy of abundance and consistent growth.",
    "My actions today create lasting blessings for tomorrow.",
  ];

  const generatedHypnosisScripts = [
    "Imagine yourself deeply relaxed as calm confidence fills your mind...",
    "As you breathe in peace and exhale doubt, you visualize your goal vividly...",
  ];

  const generatedVisualization = [
    "Visualize yourself having achieved your goal — every detail vivid and real."
  ];

  // Limit + filter out duplicates
  const savedContents = new Set(saved.map(s => s.content));
  const suggestions = [
    ...saved.map((s) => ({ ...s, saved: true })),
    ...generatedAffirmations.filter(t => !savedContents.has(t)).slice(0, 5).map((text) => ({
      type: "affirmation",
      content: text,
      saved: false,
    })),
    ...generatedHypnosisScripts.filter(t => !savedContents.has(t)).slice(0, 2).map((text) => ({
      type: "hypnosis",
      content: text,
      saved: false,
    })),
    ...generatedVisualization.filter(t => !savedContents.has(t)).slice(0, 1).map((text) => ({
      type: "visualization",
      content: text,
      saved: false,
    })),
  ];

  return NextResponse.json(suggestions);
}

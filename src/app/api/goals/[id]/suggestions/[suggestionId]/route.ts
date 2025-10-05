import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ PATCH — update a suggestion (e.g., edited text or saved status)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string; suggestionId: string } }
) {
  try {
    const { id, suggestionId } = params;
    const data = await req.json();

    // Confirm goal and suggestion exist
    const goal = await prisma.goal.findUnique({
      where: { id },
    });
    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    const suggestion = await prisma.goalSuggestion.findUnique({
      where: { id: suggestionId },
    });
    if (!suggestion) {
      return NextResponse.json({ error: "Suggestion not found" }, { status: 404 });
    }

    // Update the suggestion (supports editing text or toggling saved state)
    const updated = await prisma.goalSuggestion.update({
      where: { id: suggestionId },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH suggestion error:", error);
    return NextResponse.json({ error: "Failed to update suggestion" }, { status: 500 });
  }
}

// ✅ DELETE — remove a suggestion
export async function DELETE(
  req: Request,
  { params }: { params: { id: string; suggestionId: string } }
) {
  try {
    const { id, suggestionId } = params;

    const goal = await prisma.goal.findUnique({ where: { id } });
    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    await prisma.goalSuggestion.delete({
      where: { id: suggestionId },
    });

    return NextResponse.json({ message: "Suggestion deleted successfully" });
  } catch (error) {
    console.error("DELETE suggestion error:", error);
    return NextResponse.json({ error: "Failed to delete suggestion" }, { status: 500 });
  }
}

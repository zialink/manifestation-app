import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { goalSchema } from "../../../lib/validations/goal";
import { getCurrentUser } from "../../../lib/auth";

// GET /api/goals (only for logged-in users)
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const goals = await prisma.goal.findMany({
    where: { userId: user.id },
  });

  return NextResponse.json(goals, { status: 200 });
}

// POST /api/goals (only for logged-in users)
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = goalSchema.safeParse({ ...body, userId: user.id });

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const goal = await prisma.goal.create({
    data: parsed.data,
  });

  return NextResponse.json(goal, { status: 201 });
}

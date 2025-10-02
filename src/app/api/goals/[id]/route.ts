import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { goalSchema } from "../../../../lib/validations/goal";

// GET /api/goals/[id] → Fetch a single goal
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const goal = await prisma.goal.findUnique({
      where: { id: params.id },
      include: { user: true },
    });

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json(goal, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

// PUT /api/goals/[id] → Update a goal
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsed = goalSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await prisma.goal.update({
      where: { id: params.id },
      data: parsed.data,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

// DELETE /api/goals/[id] → Delete a goal
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.goal.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Goal deleted" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

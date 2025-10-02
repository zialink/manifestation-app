import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { userSchema } from "../../../lib/validations/user";
import { hash } from "bcryptjs";

// GET /api/users → Get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

// POST /api/users → Create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = userSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // inside POST, before prisma.user.create:
    const hashedPassword = await hash(parsed.data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...parsed.data,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  const affirmations = [
    "I am worthy of love and success.",
    "My mind is calm, focused, and clear.",
    "I attract opportunities that help me grow.",
    "I believe in myself and my abilities.",
    "Every day, I am becoming stronger and more confident.",
  ];

  return NextResponse.json(affirmations, { status: 200 });
}

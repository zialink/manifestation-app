import { NextResponse } from "next/server";

export async function GET() {
  const scripts = [
    "Close your eyes, take a deep breath, and imagine yourself standing in a place of peace...",
    "With each breath, you feel lighter, calmer, and more connected to your inner strength...",
  ];

  return NextResponse.json(scripts, { status: 200 });
}

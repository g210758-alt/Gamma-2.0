import { NextResponse } from "next/server";
import { addEmail } from "@/lib/emailStore";

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body?.email || "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  await addEmail(email);
  return NextResponse.json({ ok: true });
}
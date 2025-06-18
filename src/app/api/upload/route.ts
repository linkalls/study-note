import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();
    const f = fd.get("file") as File | null;

    if (!f) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const buf = Buffer.from(await f.arrayBuffer());
    const name = `${Date.now()}-${f.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`; // Sanitize filename
    const dir = path.join(process.cwd(), "data", "uploads");

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name), buf);

    return NextResponse.json({ url: `/uploads/${name}` });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Something went wrong during file upload." }, { status: 500 });
  }
}

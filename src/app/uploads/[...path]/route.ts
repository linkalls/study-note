import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { lookup } from "mime-types"; // For setting Content-Type

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePathParts = params.path;
    if (!filePathParts || filePathParts.length === 0) {
      return NextResponse.json({ error: "File path is missing." }, { status: 400 });
    }

    // IMPORTANT: Sanitize or validate filePathParts to prevent directory traversal attacks
    // For this example, we assume it is clean, but in production, add checks.
    // A simple check could be to ensure no ".." parts are present.
    if (filePathParts.some(part => part.includes(".."))) {
        return NextResponse.json({ error: "Invalid path." }, { status: 400 });
    }

    const relativePath = path.join(...filePathParts);
    const absolutePath = path.join(process.cwd(), "data", "uploads", relativePath);

    // Check if file exists
    try {
      await fs.access(absolutePath);
    } catch (error) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(absolutePath);
    const mimeType = lookup(absolutePath) || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        // Add other headers like Content-Disposition if needed for downloads
        // "Content-Disposition": `attachment; filename="${path.basename(absolutePath)}"`,
      },
    });

  } catch (error) {
    console.error("File serving error:", error);
    return NextResponse.json({ error: "Something went wrong while serving the file." }, { status: 500 });
  }
}

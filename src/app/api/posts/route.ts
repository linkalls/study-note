import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { z } from "zod";

// Zod schema for input validation
const postSchema = z.object({
  authorId: z.string().min(1, "Author ID is required."),
  subjectId: z.number().int().positive("Subject ID must be a positive integer."),
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  links: z.array(z.string().url("Invalid URL in links.")).optional().default([]),
  files: z.array(z.string()).optional().default([]), // Assuming file paths or URLs
});

export async function POST(req: NextRequest) {
  try {
    const j = await req.json();
    const validation = postSchema.safeParse(j);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input.", issues: validation.error.issues }, { status: 400 });
    }

    const { authorId, subjectId, title, content, links, files } = validation.data;

    const res = await db.insert(posts).values({
      authorId,
      subjectId,
      title,
      content,
      links,
      files,
    }).returning();

    if (res.length === 0) {
      return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
    }

    return NextResponse.json(res[0]);
  } catch (error) {
    console.error("Posts API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input.", issues: error.issues }, { status: 400 });
    }
    // Potentially check for specific database errors here
    return NextResponse.json({ error: "Something went wrong while creating the post." }, { status: 500 });
  }
}

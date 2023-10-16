import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@prisma/client";
import { db } from "@/app/lib/db";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const issue = await db.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(issue, { status: 201 });
}

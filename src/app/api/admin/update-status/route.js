import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id, projectStatus, progressPercent } = await req.json();

  const project = await prisma.projectLead.update({
    where: { id },
    data: { projectStatus, progressPercent },
  });

  return NextResponse.json(project);
}
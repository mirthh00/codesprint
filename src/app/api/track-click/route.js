import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    "unknown";

  await prisma.referralClick.create({
    data: {
      slug: body.slug,
      ip,
      device: body.userAgent || "unknown",
    },
  });

  return Response.json({ ok: true });
}

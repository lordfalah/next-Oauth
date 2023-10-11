import { connectDB } from "@utils/libs/database";
import prisma from "@utils/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    const response = await prisma.user.findFirst({
      where: {
        id: parseInt(session?.user?.id),
      },

      include: {
        prompt: true,
      },
    });

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompt", {
      status: 500,
    });
  }
}

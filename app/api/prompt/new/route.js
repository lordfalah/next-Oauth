import { connectDB } from "@utils/libs/database";
import prisma from "@utils/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { tag, prompt, userId } = await req.json();

  try {
    await connectDB();

    const prompts = await prisma.prompt.create({
      data: {
        user: {
          connect: {
            id: parseInt(userId),
          },
        },
        prompt,
        tag,
      },
    });

    return NextResponse.json(prompts, {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", {
      status: 500,
    });
  }
}

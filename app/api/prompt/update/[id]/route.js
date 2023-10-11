import { connectDB } from "@utils/libs/database";
import prisma from "@utils/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const response = await prisma.prompt.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompt", {
      status: 404,
    });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { tag, prompt } = await req.json();
    const response = await prisma.prompt.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        tag,
        prompt,
      },
    });

    console.log({ response });

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompt", {
      status: 404,
    });
  }
}

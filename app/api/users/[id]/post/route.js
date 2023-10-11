import { connectDB } from "@utils/libs/database";
import prisma from "@utils/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const response = await prisma.user.findFirst({
      where: {
        id: parseInt(params.id),
      },

      include: {
        prompt: true,
      },
    });

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompt", {
      status: 404,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    await prisma.prompt.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ data: "Success delete" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get prompt", {
      status: 404,
    });
  }
}

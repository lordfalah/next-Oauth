import prisma from "./prisma";

export async function connectDB() {
  try {
    await prisma.$disconnect();

    console.log("CONNECt");
  } catch (error) {
    console.error({ error });
    await prisma.$disconnect();
    process.exit(1);
  }
}

import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Profile from "@components/Profile";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export const getMyPrompt = async () => {
  try {
    const session = await getServerSession(authOptions);
    const response = await prisma.user.findFirst({
      where: {
        id: parseInt(session?.user?.id),
      },

      include: {
        prompt: true,
      },
    });

    return response;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const MyProfile = async () => {
  const prompt = await getMyPrompt();

  return <Profile state={{ data: prompt }} name="Profile" desc="Des" />;
};

export default MyProfile;

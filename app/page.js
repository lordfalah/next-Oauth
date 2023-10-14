import Container from "@components/Container";
import Feed from "@components/Feed";
import PromptCard from "@components/PromptCard";
import prisma from "@utils/libs/prisma";

export const dynamic = "force-dynamic";

const getAllPrompt = async () => {
  try {
    const request = await prisma.user.findMany({
      include: {
        prompt: {
          orderBy: {
            id: "desc",
          },
        },
      },
    });

    return request;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const prompt = await getAllPrompt();

  return (
    <section className="p-5 my-10">
      <Container className="space-y-8">
        <h1 className="text-5xl font-black tracking-wide text-center flex flex-col gap-y-2">
          Discover & Share{" "}
          <span className="text-orange-400">AI-Powered Prompts</span>
        </h1>

        <article className="w-full">
          <div>
            <p className="text-black/70">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
              sequi aliquam nobis, laborum in, quibusdam ad mollitia neque
              deleniti porro quos magnam quidem possimus nulla, quaerat et autem
              exercitationem illo.
            </p>
          </div>

          <Feed />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 lg:gap-4">
            {prompt?.map((data, idx) => (
              <PromptCard state={{ data }} key={idx} />
            ))}
          </div>
        </article>
      </Container>
    </section>
  );
}

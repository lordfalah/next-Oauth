import Container from "@components/Container";
import Feed from "@components/Feed";
import PromptCard from "@components/PromptCard";

export default async function Home() {
  return (
    <section className="p-5">
      <Container className="space-y-8">
        <h1 className="text-5xl font-black tracking-wide text-center flex flex-col gap-y-2">
          Discover & Share{" "}
          <span className="text-orange-400">AI-Powered Promts</span>
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

          <PromptCard />
        </article>
      </Container>
    </section>
  );
}

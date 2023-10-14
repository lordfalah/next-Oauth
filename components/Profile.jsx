"use client";

import { useRouter } from "next/navigation";
import PromptCard from "./PromptCard";

const Profile = ({ state, name, desc }) => {
  const router = useRouter();

  const onDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}/post`, {
        method: "DELETE",
      });
      await response.json();

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = () => {};

  return (
    <section className="w-full">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-black">My {name}</h1>
          <p className="text-black/70 text-lg">
            {desc} Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium temporibus sequi dolore provident labore qui quaerat
            maiores, molestias excepturi, necessitatibus nam facere magnam, eius
            quod cum quibusdam consectetur dolores omnis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 lg:gap-4">
          <PromptCard state={state} onDelete={onDelete} onEdit={onEdit} />
        </div>
      </div>
    </section>
  );
};

export default Profile;

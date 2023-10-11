"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Profile = ({ data, name, desc, onDelete, onEdit }) => {
  return (
    <section className="w-full">
      <div className="">
        <div className="space-y-4">
          <h1 className="text-5xl font-black">My {name}</h1>
          <p className="text-black/70 text-lg">
            {desc} Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium temporibus sequi dolore provident labore qui quaerat
            maiores, molestias excepturi, necessitatibus nam facere magnam, eius
            quod cum quibusdam consectetur dolores omnis.
          </p>
        </div>

        <div className="flex flex-col mt-10 gap-y-6">
          {data?.data?.prompt?.map(({ prompt, tag, id }, idx) => (
            <div
              key={idx}
              className="w-full p-3.5 rounded-sm space-y-3 glassmorphism"
            >
              <div className="flex justify-between">
                <div className="flex gap-x-3">
                  <Image
                    src={data?.data?.image || ""}
                    alt={data?.data?.username}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold">{data?.data?.username}</h4>
                    <span>{data?.data?.email}</span>
                  </div>
                </div>

                <div
                  className="rounded-full bg-white/10 p-1.5 w-7 h-7 cursor-pointer"
                  onClick={() => onCopy(prompt)}
                >
                  <Image
                    src={"/assets/icons/copy.svg"}
                    width={12}
                    height={12}
                    className="mx-auto my-auto stroke-gray-500"
                    alt="img"
                  />
                </div>
              </div>

              <article className="text-sm space-y-3">
                <p>{prompt}</p>
                <p className="text-blue-400/80">{tag}</p>
              </article>

              <div className="mx-auto text-center flex justify-center gap-x-4">
                <Link href={`/update-prompt/${id}`}>Edit</Link>
                <button onClick={() => onDelete(id)} type="button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;

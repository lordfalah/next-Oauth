"use client";

import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";

const PromptCard = ({ state, onDelete, onEdit }) => {
  const [copy, setCopy] = useState("");

  const onCopy = (prompt) => {
    setCopy(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => {
      setCopy("");
    }, 3000);
  };

  return (
    <Fragment>
      {state?.data?.prompt?.map(({ prompt, tag, id }, idx) => (
        <div
          key={idx}
          className="w-full p-3.5 rounded-sm space-y-3 glassmorphism"
        >
          <div className="flex justify-between">
            <div className="flex gap-x-3">
              <Image
                src={state?.data?.image || ""}
                alt={state?.data?.username}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
                loading="lazy"
              />
              <div>
                <h4 className="font-semibold">{state?.data?.username}</h4>
                <span>{state?.data?.email}</span>
              </div>
            </div>

            <div
              className="rounded-full bg-white/10 p-1.5 w-7 h-7 cursor-pointer"
              onClick={() => onCopy(prompt)}
            >
              <Image
                src={
                  copy === prompt
                    ? "/assets/icons/tick.svg"
                    : "/assets/icons/copy.svg"
                }
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

          {Boolean(onDelete || onEdit) && (
            <div className="mx-auto text-center flex justify-center gap-x-4">
              <Link href={`/update-prompt/${id}`}>Edit</Link>
              <button onClick={() => onDelete(id)} type="button">
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default PromptCard;

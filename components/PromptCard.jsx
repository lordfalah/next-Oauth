"use client";

import useDispatch from "@utils/hooks/useDispatch";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const PromptCard = () => {
  const { state, dispatch } = useDispatch();
  const { data: session } = useSession();
  const [copy, setCopy] = useState("");

  const getPrompt = async () => {
    try {
      const response = await fetch("/api/prompt");
      const result = await response.json();

      dispatch({
        type: "GET",
        data: result?.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        error: error,
      });
    } finally {
      dispatch({
        type: "FINAL",
      });
    }
  };

  const onCopy = (prompt) => {
    setCopy(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => {
      setCopy("");
    }, 3000);
  };

  useEffect(() => {
    if (session?.user) getPrompt();
  }, [session]);

  return (
    <div className="flex flex-col gap-y-5">
      {session?.user ? (
        state?.data?.prompt?.map(({ prompt, tag }, idx) => (
          <div
            key={idx}
            className="w-full p-3.5 rounded-sm space-y-3 glassmorphism"
          >
            <div className="flex justify-between">
              <div className="flex gap-x-3">
                <Image
                  src={state?.data?.image}
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

            <article className="text-sm ">
              <p>{prompt}</p>
              <p className="text-blue-400/80">{tag}</p>
            </article>
          </div>
        ))
      ) : (
        <div>nothing</div>
      )}
    </div>
  );
};

export default PromptCard;

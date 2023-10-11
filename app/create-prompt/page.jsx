"use client";

import Form from "@components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tag: "",
    prompt: "",
  });

  const { data: session } = useSession();
  const router = useRouter();

  const onChanges = ({ target }) => {
    setPost((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const repsonse = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (repsonse.ok) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      title="Create"
      type="post"
      submitting={submitting}
      post={post}
      setPost={setPost}
      handleSubmit={onSubmit}
      onChanges={onChanges}
    />
  );
};

export default CreatePrompt;

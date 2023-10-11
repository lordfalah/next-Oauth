"use client";

import Form from "@components/Form";
import useDispatch from "@utils/hooks/useDispatch";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const { state, dispatch } = useDispatch();
  const params = useParams();
  const router = useRouter();

  const [post, setPost] = useState({
    tag: state?.data?.tag || "",
    prompt: state?.data?.prompt || "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const response = await fetch(`/api/prompt/update/${params?.id}`, {
        body: JSON.stringify(post),
        method: "PATCH",
      });

      if (response.ok) router.push("/");
    } catch (error) {
      dispatch({
        type: "ERROR",
        error: error,
      });
    } finally {
      dispatch({
        type: "FINAL",
      });
      setSubmitting(false);
    }
  };

  const getPost = async () => {
    try {
      const response = await fetch(`/api/prompt/update/${params?.id}`);
      const result = await response.json();

      setPost((prev) => ({
        ...prev,
        tag: result?.data?.tag,
        prompt: result?.data?.prompt,
      }));
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

  useEffect(() => {
    if (params?.id) getPost();
  }, [params?.id]);

  const onChanges = ({ target }) => {
    setPost((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <Form
      title="Edit"
      type="patch"
      submitting={submitting}
      post={post}
      setPost={setPost}
      handleSubmit={onSubmit}
      onChanges={onChanges}
    />
  );
};

export default UpdateForm;

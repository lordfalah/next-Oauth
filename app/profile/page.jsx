"use client";

import Profile from "@components/Profile";
import useDispatch from "@utils/hooks/useDispatch";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const { state, dispatch } = useDispatch();
  const router = useRouter();

  const getProfile = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user?.id}/post`);
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

  useEffect(() => {
    if (session?.user?.id) getProfile();
  }, [session?.user?.id]);

  const onDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}/post`, {
        method: "DELETE",
      });
      await response.json();
      const filterPrompt = state?.data?.prompt.filter(
        (prompt) => prompt.id !== id
      );

      dispatch({
        type: "GET",
        data: {
          ...state?.data,
          prompt: filterPrompt,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = () => {};

  return (
    <Profile
      data={state}
      name="Profile"
      desc="Des"
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
};

export default MyProfile;

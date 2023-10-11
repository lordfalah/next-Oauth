"use client";

import Link from "next/link";
import React from "react";

const Form = ({ type, title, submitting, post, onChanges, handleSubmit }) => {
  return (
    <div className="max-w-full space-y-7">
      <div className="space-y-5">
        <h2 className="text-5xl font-black">{title} Post</h2>
        <p className="text-black/70 text-lg">
          {title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
          quibusdam molestias excepturi placeat obcaecati maxime natus dolorem
          accusantium necessitatibus eveniet?
        </p>
      </div>

      <form
        method={type.toString().toUpperCase()}
        onSubmit={handleSubmit}
        className="space-y-8 bg-slate-200/40 p-4 rounded-md"
      >
        <div>
          <label className="space-y-3.5">
            <h4>Your AI Prompt</h4>

            <textarea
              name="prompt"
              id=""
              rows="10"
              className="bg-white w-full p-3 rounded-md"
              placeholder="Write your prompt here..."
              value={post.prompt}
              onChange={(e) => onChanges(e)}
              required
            ></textarea>
          </label>
        </div>

        <div>
          <label className="space-y-3.5" id="tag">
            <h4>Your AI Prompt</h4>

            <input
              type="text"
              name="tag"
              id="tag"
              className="bg-white w-full p-3 rounded-md"
              placeholder="Write your prompt here..."
              value={post.tag}
              onChange={(e) => onChanges(e)}
              required
            />
          </label>
        </div>

        <div className="flex justify-end text-sm gap-x-4 items-center">
          <Link href="/" className="text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="py-1.5 px-4 bg-orange-400 rounded-full text-white"
          >
            {submitting ? `Submit...` : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

"use client";

import React, { useState } from "react";

const Feed = () => {
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mt-14 mb-20">
      <label className="bg-white" id="search">
        <input
          className="w-full px-4 py-1.5 border-0 ring-inset rounded-md shadow-md"
          type="text"
          id="search"
          value={search}
          onChange={onChange}
          placeholder="Search for tag or a username"
          autoComplete="off"
        />
      </label>
    </div>
  );
};

export default Feed;

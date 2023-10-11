import React from "react";

const Container = ({ className, children }) => {
  const addClass = className ? className : "";
  return <div className={`mx-auto container ${addClass}`}>{children}</div>;
};

export default Container;

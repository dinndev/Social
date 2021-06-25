import React, { useState, useEffect } from "react";
import { useDataContext } from "./State/DataProvider";
import { getSeconds } from "./helperFunctions";
import Post from "./Post";

function Posts() {
  const value = useDataContext();
  const [{ posts }, dispatch] = value.reducer;
  const deletePost = (_) => {
    dispatch({ type: "DELETE_POST" });
  };

  return (
    <ul className="posts">
      {posts &&
        Array.from(posts).map(({ date, body }, index) => (
          <Post key={index} body={body} index={index} date={date} />
        ))}
    </ul>
  );
}

export default Posts;

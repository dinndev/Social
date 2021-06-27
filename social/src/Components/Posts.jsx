import React, { useState, useEffect } from "react";
import { useDataContext } from "./State/DataProvider";
import { getSeconds } from "./helperFunctions";
import Post from "./Post";

function Posts() {
  const { reducer } = useDataContext();
  const [{ posts }, dispatch] = reducer;

  return (
    <ul className="posts">
      {posts &&
        Array.from(posts).map(({ time, body, postId }) => (
          <Post key={postId} body={body} postId={postId} time={time} />
        ))}
    </ul>
  );
}

export default Posts;

import React from "react";
import { useDataContext } from "./State/DataProvider";
import styles from "./Styles/Sass/posts.module.scss";
import Post from "./Post";

function Posts() {
  const { reducer } = useDataContext();
  const [{ posts }, dispatch] = reducer;

  return (
    <ul className={styles.posts}>
      {posts &&
        Array.from(posts).map(({ time, body, postId }) => (
          <Post key={postId} body={body} postId={postId} time={time} />
        ))}
    </ul>
  );
}

export default Posts;

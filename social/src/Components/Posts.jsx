import React, { useState } from "react";
import { useDataContext } from "./State/DataProvider";
import styles from "./Styles/Sass/posts.module.scss";
import Post from "./Post";
import { database } from "./helperFunctions";

function Posts() {
  const [showModal, setShowModal] = useState(false);
  const { user, reducer } = useDataContext();
  const [{ posts }, dispatch] = reducer;
  const toggleModal = (postId) => {
    console.log(postId);
    setShowModal(!showModal);
  };

  return (
    <ul className={styles.posts}>
      {posts &&
        Array.from(posts).map(({ body, postId, isLike, postImg }) => (
          <Post
            postImg={postImg}
            isLike={isLike}
            toggleModal={() => toggleModal(postId)}
            modal={showModal}
            key={postId}
            body={body}
            postId={postId}
          />
        ))}
    </ul>
  );
}

export default Posts;

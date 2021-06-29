import React from "react";
import { useDataContext } from "./State/DataProvider";
import { database } from "./helperFunctions";
import styles from "./Styles/Sass/post.module.scss";

function Post({ body, postId }) {
  const { reducer, user } = useDataContext();
  const [_, dispatch] = reducer;
  const deletePost = () => {
    dispatch({
      type: "DELETE_POST",
      postId,
    });
    database.ref(`posts/${user.uId}/${postId}`).remove();
  };
  return (
    <>
      <li className={styles.post}>
        <div className={styles.userInfo}>
          <div className={styles.user}>
            <img
              className={styles.displayPhoto}
              src={user.displayPhoto}
              alt={`${user.displayName}profile picture`}
            />

            <span className={styles.name}>
              {user.displayName} <br />
              <span className={styles.email}>{user.email}</span>
            </span>
          </div>
          <div className={styles.option}>
            <div></div>
          </div>
        </div>
        <div className={styles.postContainer}>
          <p className={styles.postDescription}>{body}</p>
        </div>
        {/* <button onClick={() => deletePost()}> Delete </button> */}
      </li>
    </>
  );
}

export default Post;

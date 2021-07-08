import React, { useState } from "react";
import { useDataContext } from "./State/DataProvider";
import { database } from "./helperFunctions";
import styles from "./Styles/Sass/post.module.scss";
import { AnimatePresence, motion } from "framer-motion";

function Post({ body, postId, isLike, postImg }) {
  const [toBeEditPost, setToBeEditData] = useState("");

  const [toggleModal, setToggleModal] = useState(false);
  const { reducer, user } = useDataContext();
  const [{ posts }, dispatch] = reducer;
  const deletePost = () => {
    dispatch({
      type: "DELETE_POST",
      postId,
    });
    database.ref(`posts/${user.uId}/${postId}`).remove();
  };
  const likeToggle = async (_) => {
    try {
      await database.ref(`posts/${user.uId}/${postId}`).update({
        isLike: !isLike,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updatePost = (e) => {
    e.preventDefault();
    try {
      database.ref(`posts/${user.uId}/${postId}/`).update({
        body: toBeEditPost,
      });
      setToggleModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getTobeEditPost = (_) => {
    try {
      database
        .ref(`posts/${user.uId}/${postId}`)
        .once("value")
        .then((snapshot) => {
          setToBeEditData(snapshot.val().body);
        });
    } catch (error) {
      console.log(error);
    }
    setToggleModal(true);
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
        </div>
        <div className={styles.postContainer}>
          <p className={styles.postDescription}>{body}</p>
          <img src={postImg} className={styles.postImg} alt="" />
        </div>
        <div className={styles.options}>
          <svg
            onClick={likeToggle}
            className={isLike ? styles.liked : styles.unlike}
            viewBox="0 0 16 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.3906 0C10.1417 0 8.90869 0.408846 8.00012 1.10989C7.09143 0.408846 5.8584 0 4.60938 0C2.02466 0 0 1.64231 0 3.73892C0 6.18942 3.48242 8.88687 7.68958 11.9046C7.7782 11.9682 7.88916 12 8.00012 12C8.11108 12 8.22192 11.9682 8.31067 11.9045C12.5176 8.88667 16 6.18922 16 3.73892C16 1.64231 13.9753 0 11.3906 0V0ZM8.00012 11.1118C4.24133 8.40515 0.9375 5.81276 0.9375 3.73892C0.9375 2.06878 2.55042 0.760459 4.60938 0.760459C5.7417 0.760459 6.90381 1.2004 7.64221 1.90857C7.7312 1.99403 7.86218 2.04324 8.00012 2.04324C8.13806 2.04324 8.26892 1.99403 8.35803 1.90857C9.09631 1.2004 10.2584 0.760459 11.3906 0.760459C13.4496 0.760459 15.0625 2.06878 15.0625 3.73892C15.0625 5.81256 11.7588 8.40505 8.00012 11.1118Z" />
          </svg>
          <svg
            onClick={getTobeEditPost}
            className={styles.edit}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8954 2.76323L11.2336 0.104933C11.0936 -0.0349776 10.8676 -0.0349776 10.7277 0.104933L8.47122 2.35785L1.4757 9.33901C1.42548 9.38206 1.38961 9.43588 1.36808 9.49686L0.0192016 13.5256C-0.0453724 13.7121 0.0586635 13.9166 0.245211 13.9812C0.320547 14.0063 0.399471 14.0063 0.47122 13.9812L4.50351 12.6323C4.56449 12.6108 4.6183 12.5749 4.66135 12.5247L11.6425 5.52915L13.8954 3.26906C14.0353 3.12915 14.0353 2.90314 13.8954 2.76323ZM0.926825 13.0735L1.86315 10.2753L3.72503 12.1372L0.926825 13.0735ZM4.38871 11.7821L2.2183 9.61166L8.72234 3.11839L10.882 5.27803L4.38871 11.7821ZM11.3878 4.7722L9.23176 2.61256L10.9824 0.865471L13.1349 3.01794L11.3878 4.7722Z"
              fill="#76797E"
            />
          </svg>
          <svg
            onClick={deletePost}
            className={styles.delete}
            viewBox="0 0 13 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.4 5.60001C8.17906 5.60001 8 5.77136 8 5.98278V13.2172C8 13.4285 8.17906 13.6 8.4 13.6C8.62094 13.6 8.8 13.4285 8.8 13.2172V5.98278C8.8 5.77136 8.62094 5.60001 8.4 5.60001Z"
              fill="#666666"
            />
            <path
              d="M4.4 5.60001C4.17906 5.60001 4 5.77136 4 5.98278V13.2172C4 13.4285 4.17906 13.6 4.4 13.6C4.62094 13.6 4.8 13.4285 4.8 13.2172V5.98278C4.8 5.77136 4.62094 5.60001 4.4 5.60001Z"
              fill="#666666"
            />
            <path
              d="M1.04826 4.76335V13.9953C1.04826 14.541 1.24535 15.0534 1.58964 15.4211C1.93234 15.7898 2.40926 15.9991 2.9084 16H9.89161C10.3909 15.9991 10.8678 15.7898 11.2104 15.4211C11.5547 15.0534 11.7517 14.541 11.7517 13.9953V4.76335C12.4361 4.57893 12.8796 3.90768 12.7881 3.19471C12.6964 2.48189 12.0982 1.94867 11.39 1.94852H9.50032V1.48014C9.50248 1.08626 9.34908 0.708039 9.07443 0.42979C8.79978 0.151688 8.42665 -0.0031709 8.03868 4.92333e-05H4.76132C4.37335 -0.0031709 4.00022 0.151688 3.72557 0.42979C3.45092 0.708039 3.29752 1.08626 3.29968 1.48014V1.94852H1.41C0.701813 1.94867 0.103635 2.48189 0.0119401 3.19471C-0.0796103 3.90768 0.363869 4.57893 1.04826 4.76335V4.76335ZM9.89161 15.2506H2.9084C2.27735 15.2506 1.78643 14.7002 1.78643 13.9953V4.79629H11.0136V13.9953C11.0136 14.7002 10.5227 15.2506 9.89161 15.2506ZM4.03785 1.48014C4.0354 1.28503 4.11095 1.09724 4.24734 0.959502C4.38358 0.821768 4.56899 0.746095 4.76132 0.749461H8.03868C8.23101 0.746095 8.41642 0.821768 8.55266 0.959502C8.68905 1.09709 8.7646 1.28503 8.76215 1.48014V1.94852H4.03785V1.48014ZM1.41 2.69793H11.39C11.7569 2.69793 12.0544 2.99989 12.0544 3.3724C12.0544 3.74491 11.7569 4.04687 11.39 4.04687H1.41C1.04307 4.04687 0.745641 3.74491 0.745641 3.3724C0.745641 2.99989 1.04307 2.69793 1.41 2.69793V2.69793Z"
              fill="#666666"
            />
          </svg>
        </div>
      </li>
      {toggleModal && (
        <form onSubmit={(e) => updatePost(e)}>
          <textarea
            onChange={(e) => setToBeEditData(e.target.value)}
            value={toBeEditPost}
            type="text"
            placeholder="new post"
          />
          <button type="submit">Post</button>
          <span onClick={(_) => setToggleModal(false)}>X</span>
        </form>
      )}
    </>
  );
}

export default Post;

import React, { useRef, useEffect, useState } from "react";
import { useDataContext } from "./State/DataProvider";
import { database } from "./helperFunctions";
import uniqid from "uniqid";
import styles from "./Styles/Sass/modal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
function PostForm({ toggleModal }) {
  const postValue = useRef({});
  const { user, reducer } = useDataContext();
  const [{ posts, isLoading }, dispatch] = reducer;

  const writePosts = async (e) => {
    e.preventDefault();
    try {
      let id = uniqid("post-");
      database
        .ref(`posts/${user.uId}/${id}`)
        .set({
          body: postValue.current.captionVal.value,
          time: new Date().getTime(),
          postId: id,
          isLike: false,
          postImg: postValue.current.imgUrl.value,
        })
        .then(() => {
          postValue.current.captionVal.value = "";
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.postFormModal}
      >
        <form onSubmit={writePosts}>
          <input
            aria-required
            ref={(el) => (postValue.current["captionVal"] = el)}
            name="post-form"
            type="text"
            placeholder="What's on your mind?"
          />
          <input
            ref={(el) => (postValue.current["imgUrl"] = el)}
            type="text"
            placeholder="url"
          />
          <button type="submit">Post</button>
          <span onClick={toggleModal}>X</span>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

export default PostForm;

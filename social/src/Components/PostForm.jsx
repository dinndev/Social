import React, { useRef, useEffect, useState } from "react";
import { useDataContext } from "./State/DataProvider";
import { database } from "./helperFunctions";
import uniqid from "uniqid";
import styles from "./Styles/Sass/modal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
function PostForm({ toggleModal }) {
  const postValue = useRef("");
  const { user, reducer } = useDataContext();
  const [{ posts, isLoading }, dispatch] = reducer;
  const [value, setValue] = useState("");
  const writePosts = async (e) => {
    e.preventDefault();

    try {
      let id = uniqid("post-");
      database
        .ref(`posts/${user.uId}/${id}`)
        .set({
          body: postValue.current.value,
          time: new Date().getTime(),
          postId: id,
          isLike: false,
        })
        .then(() => {
          postValue.current.value = "";
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      <motion.form
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.postFormModal}
      >
        <input
          onChange={(e) => setValue(e.target.value)}
          aria-required
          ref={postValue}
          name="post-form"
          type="text"
          placeholder="What's on your mind?"
        />
        <button disabled={!value} onClick={(e) => writePosts(e)} type="submit">
          Post
        </button>
        <span onClick={toggleModal}>X</span>
      </motion.form>
    </AnimatePresence>
  );
}

export default PostForm;

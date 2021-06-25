import React, { useRef, useEffect } from "react";
import { useDataContext } from "./State/DataProvider";
import { database } from "./helperFunctions";
import uniqid from "uniqid";
function PostForm() {
  const postValue = useRef("");
  const { user, reducer } = useDataContext();
  const [{ posts }, dispatch] = reducer;

  useEffect(() => {
    const postRef = database.ref(`/posts/${user.uId}/`);
    postRef.on("value", (snapshot) => {
      snapshot.forEach((snap) => {
        const { body, postId } = snap.val();
        dispatch({
          type: "SET_POST",
          posts: { body, postId },
        });
      });
    });
  }, []);
  const writePosts = (e) => {
    e.preventDefault();
    let id = uniqid("post-");
    database.ref(`posts/${user.uId}/${id}`).set({
      body: postValue.current.value,
      time: new Date().getTime(),
      postId: id,
    });

    postValue.current.value = "";
  };

  return (
    <div className="post-form">
      <form>
        <input
          aria-required
          ref={postValue}
          name="post-form"
          type="text"
          placeholder="What's on your mind?"
        />
        <button onClick={(e) => writePosts(e)} type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;

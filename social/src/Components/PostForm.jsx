import React, { useRef, useEffect } from "react";
import { useDataContext } from "./State/DataProvider";
import { database } from "./helperFunctions";
import uniqid from "uniqid";
function PostForm() {
  const postValue = useRef("");
  const { user, reducer } = useDataContext();
  const [{ posts }, dispatch] = reducer;

  const writePosts = async (e) => {
    e.preventDefault();
    if (postValue.current.value.length > 0) {
      try {
        let id = uniqid("post-");
        database
          .ref(`posts/${user.uId}/${id}`)
          .set({
            body: postValue.current.value,
            time: new Date().getTime(),
            postId: id,
          })
          .then(() => {
            postValue.current.value = "";
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Form must be filled up");
    }
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

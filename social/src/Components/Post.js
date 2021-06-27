import React from "react";
import { useDataContext } from "./State/DataProvider";
import { database } from "./helperFunctions";

function Post({ time, body, postId }) {
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
    <ul>
      <li className="post">
        {body}
        {time}
        <button onClick={() => deletePost()}> Delete </button>
      </li>
    </ul>
  );
}

export default Post;

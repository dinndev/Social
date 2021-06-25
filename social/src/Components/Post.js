import React from "react";
import { useDataContext } from "./State/DataProvider";

function Post({ date, body, index }) {
  const value = useDataContext();
  const [_, dispatch] = value.reducer;
  const deletePost = (_) => {
    dispatch({
      type: "DELETE_POST",
      index: index,
    });
  };
  return (
    <ul>
      <li className="post">
        {body}
        {date}
        <button onClick={() => deletePost()}> Delete </button>
      </li>
    </ul>
  );
}

export default Post;

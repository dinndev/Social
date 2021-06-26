import React from "react";
import PostForm from "./PostForm";
import Posts from "./Posts";
import { useDataContext } from "./State/DataProvider";
import { useHistory } from "react-router-dom";
import { database } from "./helperFunctions";

function NewsFeed() {
  const { signout, user, reducer } = useDataContext();
  const [{ posts }, dispatch] = reducer;
  const { displayName, email, displayPhoto } = user;
  const history = useHistory();
  const handleClick = async () => {
    try {
      await signout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Signout</button>
      {displayName ? displayName : email}
      <img src={displayPhoto} alt="profile pic" />
      <PostForm />
      <Posts />
    </div>
  );
}

export default NewsFeed;

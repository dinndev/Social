import React from "react";
import PostForm from "./PostForm";
import Posts from "./Posts";
import { useDataContext } from "./State/DataProvider";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";

function NewsFeed() {
  const { signout, reducer } = useDataContext();

  const history = useHistory();
  const handleClickSignout = async () => {
    try {
      await signout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Nav signout={handleClickSignout} />
      <PostForm />
      <Posts />
    </div>
  );
}

export default NewsFeed;

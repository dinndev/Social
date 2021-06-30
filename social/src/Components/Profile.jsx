import React, { useEffect } from "react";
import PostForm from "./PostForm";
import Posts from "./Posts";
import styles from "./Styles/Sass/profile.module.scss";
import { useDataContext } from "./State/DataProvider";
import { useHistory } from "react-router-dom";
import { getDisplayNamefromEmail, database } from "./helperFunctions";
import EditProfileForm from "./EditProfileForm";
import EmptyPost from "./EmptyPost";
function Profile() {
  const { signout, user, reducer } = useDataContext();
  const [{ posts }, dispatch] = reducer;
  const { displayName, email, displayPhoto, phoneNumber } = user;
  const history = useHistory();
  useEffect(async () => {
    try {
      const postRef = database.ref(`/posts/${user.uId}/`);
      postRef.on("value", (snapshot) => {
        let value = [];
        snapshot.forEach((snap) => {
          value.push(snap.val());
        });
        dispatch({
          type: "SET_POST",
          posts: value,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleClickSignout = async () => {
    try {
      await signout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.profileContainer}>
        <img
          src={displayPhoto}
          className={styles.profilePicture}
          alt="profile pic"
        />
        <div className={styles.userInfo}>
          <span className={styles.displayName}>
            {displayName ? displayName : getDisplayNamefromEmail(email)}
          </span>
          <br />
          <span className={styles.email}>{email}</span> <br />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.updateProfile}>Update profile</button>
          <button className={styles.signout} onClick={handleClickSignout}>
            Signout
          </button>
        </div>
      </div>
      {posts.length > 0 ? <Posts /> : <EmptyPost />}
    </>
  );
}

export default Profile;

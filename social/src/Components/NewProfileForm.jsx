import React, { useRef, useState } from "react";
import { auth, database } from "./helperFunctions";
import { useDataContext } from "./State/DataProvider";

function NewProfileForm() {
  const inputRef = useRef({});
  const [toEditprofile, setToEditprofile] = useState();
  const { user, getUserToUpdate } = useDataContext();
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await auth.currentUser.updateProfile({
        displayName: inputRef.current.newDisplayName.value,
        photoURL: inputRef.current.newDisplayPhoto.value,
      });
      database.ref(`users/${user.uId}/${user.displayName}`).update({
        displayName: user.currentUser.displayName,
        displayPhoto: user.currentUser.displayPhoto,
      });
      console.log("profile updated refresh the 📄 ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => updateProfile(e)}>
      <input
        ref={(el) => (inputRef.current["newDisplayName"] = el)}
        type="text"
        id="displayName"
        name="displayName"
        placeholder="Set new display name"
      />
      <input
        ref={(el) => (inputRef.current["newDisplayPhoto"] = el)}
        type="text"
        name="stringUrl"
        id="stringUrl"
        placeholder="Provide valid url for display picture"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default NewProfileForm;

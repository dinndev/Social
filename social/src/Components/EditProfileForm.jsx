import React, { useRef, useState } from "react";
import { auth, database } from "./helperFunctions";
import { useDataContext } from "./State/DataProvider";

function EditProfileForm() {
  const inputRef = useRef({});

  const { user } = useDataContext();
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await auth.currentUser.updateProfile({
        displayName: inputRef.current.newDisplayName.value,
        photoURL: inputRef.current.newDisplayPhoto.value,
      });
      await database.ref(`users/${user.uId}`).update({
        displayName: inputRef.current.newDisplayName.value,
        displayPhoto: inputRef.current.newDisplayPhoto.value,
      });

      console.log("profile updated refresh the 📄 ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => updateProfile(e)}>
      <input
        required
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
      <input
        ref={(el) => (inputRef.current["gender"] = el)}
        type="text"
        name="gender"
        placeholder="Gender"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default EditProfileForm;

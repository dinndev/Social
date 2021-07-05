import React, { useRef, useState } from "react";
import { auth, database } from "./helperFunctions";
import { useDataContext } from "./State/DataProvider";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Styles/Sass/modal.module.scss";

function EditProfileForm() {
  const inputRef = useRef({});
  const { user } = useDataContext();
  const [value, setValue] = useState("");
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      if (
        inputRef.current.newPassword.value ===
        inputRef.current.newConfirmPassword.value
      ) {
        await auth.currentUser.updateProfile({
          displayName: inputRef.current.newDisplayName.value,
          photoURL: inputRef.current.newDisplayPhoto.value,
        });
        await auth.currentUser.updatePassword(
          inputRef.current.newPassword.value
        );
      } else {
        inputRef.current.newPassword.value = "";
        inputRef.current.newDisplayPhoto.value = "";
        setValue("");
        console.log("password did not match");
        return;
      }
      await database.ref(`users/${user.uId}`).update({
        displayName: inputRef.current.newDisplayName.value,
        displayPhoto: inputRef.current.newDisplayPhoto.value,
      });

      console.log("profile updated refresh the 📄 ");
    } catch (error) {
      console.log(error.message);
    }
    console.log(inputRef.current.newConfirmPassword.value);
  };

  return (
    <AnimatePresence>
      <motion.form
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.modalContainer}
        onSubmit={(e) => updateProfile(e)}
      >
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
          onChange={(e) => setValue(e.target.value)}
          ref={(el) => (inputRef.current["newPassword"] = el)}
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="Password"
        />{" "}
        <input
          ref={(el) => (inputRef.current["newConfirmPassword"] = el)}
          type="password"
          name="newConfirmPassword"
          id="newConfirmPassword"
          placeholder="Confirm password"
        />
        <button
          disabled={!value}
          ref={(el) => (inputRef.current["submit"] = el)}
          type="submit"
        >
          Update Profile
        </button>
        d
      </motion.form>
      )
    </AnimatePresence>
  );
}

export default EditProfileForm;

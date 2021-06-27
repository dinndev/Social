import React from "react";
import { useDataContext } from "./State/DataProvider";
import { getDisplayNamefromEmail } from "./helperFunctions";
import EditProfileForm from "./EditProfileForm";

export default function Nav({ signout }) {
  const { user } = useDataContext();
  const { displayName, email, displayPhoto } = user;
  return (
    <div>
      {displayName ? displayName : getDisplayNamefromEmail(email)}
      <img src={displayPhoto} alt="profile pic" />
      <EditProfileForm />
      <button onClick={signout}>Signout</button>
    </div>
  );
}

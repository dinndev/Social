import React, { useReducer, useContext, useEffect, useState } from "react";
import { auth, provider, database } from "../helperFunctions";

const dataContext = React.createContext();
export function DataProvider({ children, initialState, reducer }) {
  const [user, setUser] = useState({
    displayName: "",
    displayPhoto: "",
    uId: null,
    email: "",
  });

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const facebookLoginPopup = async () => {
    return auth.signInWithPopup(provider);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signout = () => {
    return auth.signOut();
  };
  const writeData = () => {
    const users = database.ref(`users/${user.uId}/${user.displayName}`);
    if (user.uId) {
      users.set({
        displayName: user.displayName,
        displayPhoto: user.displayPhoto,
        uId: user.uId,
        email: user.email,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user === null) return;
      setUser({
        displayName: user.displayName,
        displayPhoto: user.photoURL,
        uId: user.uid,
        email: user.email,
      });
    });
    writeData();
    return unsubscribe;
  }, [user]);

  const val = {
    reducer: useReducer(reducer, initialState),
    user,
    signout,
    signup,
    login,
    facebookLoginPopup,
    writeData,
  };
  return <dataContext.Provider value={val}>{children}</dataContext.Provider>;
}

export const useDataContext = () => useContext(dataContext);

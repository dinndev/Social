import userEvent from "@testing-library/user-event";
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
  const writeData = async () => {
    const users = database.ref(`users/${user.uId}`);
    try {
      if (user.uId) {
        await users.set({
          displayName: user.displayName,
          displayPhoto: user.displayPhoto,
          uId: user.uId,
          email: user.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser({
        displayName: user.displayName,
        displayPhoto: user.photoURL
          ? user.photoURL
          : "https://freesvg.org/img/abstract-user-flat-1.png",
        uId: user.uid,
        email: user.email,
      });
    });

    writeData();
    return unsubscribe;
  }, [user.displayName]);
  console.log(user);
  const val = {
    reducer: useReducer(reducer, initialState),
    user,
    signout,
    signup,
    login,
    facebookLoginPopup,
  };
  return <dataContext.Provider value={val}>{children}</dataContext.Provider>;
}

export const useDataContext = () => useContext(dataContext);

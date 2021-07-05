import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import env from "react-dotenv";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDataContext } from "./State/DataProvider";

// email validation function
export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const getDisplayNamefromEmail = (email) => {
  return email.substring(0, email.indexOf("@"));
};

export function phonenumber(inputtxt) {
  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    alert("message");
    return false;
  }
}

export const app = firebase.initializeApp({
  apiKey: env.SOCIAL_FIREBASE_KEY,
  authDomain: env.SOCIAL_FIRBASE_DOMAIN,
  projectId: env.SOCIAL_FIREBASE_PROJECT_ID,
  storageBucket: env.SOCIAL_STORAGE_BUCKET,
  messagingSenderId: env.SOCIAL_MESSAGING_SENDER,
  appId: env.SOCIAL_APP_ID,
  databaseURL: env.SOCIAL_DATABASE_URL,
  measurementId: env.SOCIAL_MEASUREMENT_ID,
});

export const auth = app.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const database = app.database();
export function PrivateRoute({ component: Component, ...rest }) {
  const { user, reducer } = useDataContext();

  return user.uId ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
}
export function PublicRoute({ component: Component, restricted, ...rest }) {
  const { user } = useDataContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.currentUser && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

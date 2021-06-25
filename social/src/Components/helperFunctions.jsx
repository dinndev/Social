import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import env from "react-dotenv";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDataContext } from "./State/DataProvider";

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
  const { user } = useDataContext();
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

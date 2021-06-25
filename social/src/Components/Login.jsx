import React, { useRef, useState, useEffect } from "react";
import { useDataContext } from "./State/DataProvider";

import { useHistory, Link } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const { login, facebookLoginPopup, writeData } = useDataContext();
  const [error, setError] = useState("");
  const history = useHistory();
  const inputRef = useRef({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(
        inputRef.current.Email.value,
        inputRef.current.Password.value
      );
      history.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const handleClickfacebookLoginPopup = async () => {
    try {
      setError("");
      setLoading(true);
      await facebookLoginPopup();
      history.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      {error && error}
      <p>Log in</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          required={true}
          ref={(el) => (inputRef.current["Email"] = el)}
          type="text"
          placeholder="Name"
        />
        <input
          required={true}
          ref={(el) => (inputRef.current["Password"] = el)}
          type="password"
          placeholder="Password"
        />
        <button disabled={loading} type="submit">
          Login
        </button>
      </form>
      <p>Log in with Facebook</p>
      <button onClick={handleClickfacebookLoginPopup}>Fb</button>
      <p>Don't have an account ?</p> <Link to="/signup">Sign up</Link>
    </>
  );
}

export default Login;

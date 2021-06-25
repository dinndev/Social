import React, { useRef, useState } from "react";
import { useDataContext } from "./State/DataProvider";
import { useHistory, Link } from "react-router-dom";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { signup, user, facebookLoginPopup } = useDataContext();
  const inputRef = useRef({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputRef.current.Password.value != inputRef.current.ConfirmPassword.value
    ) {
      return setError("Password did not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        inputRef.current.Email.value,
        inputRef.current.Password.value
      );
      history.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      inputRef.current.Email.value = "";
      inputRef.current.Password.value = "";
      inputRef.current.ConfirmPassword.value = "";
    }
  };
  const handleClickfacebookLoginPopup = async (_) => {
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
      <p>Sign up</p>
      <form onSubmit={handleSubmit}>
        <input
          required={true}
          ref={(el) => (inputRef.current["Email"] = el)}
          type="text"
          placeholder="Name"
        />
        <input
          required={true}
          ref={(el) => (inputRef.current["Password"] = el)}
          type="text"
          placeholder="Password"
        />
        <input
          required={true}
          ref={(el) => (inputRef.current["ConfirmPassword"] = el)}
          type="text"
          placeholder="Confirm password"
        />
        <button disabled={loading} type="submit">
          Signup
        </button>
      </form>
      <p>sign up with facebook</p>{" "}
      <button onClick={handleClickfacebookLoginPopup}>Fb</button>
      <p>Already have an account ?</p> <Link to="/login">Log in</Link>
    </>
  );
}

export default Signup;

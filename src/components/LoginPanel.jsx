import React, { createRef, useContext } from "react";
import { styled } from "styled-components";
import { color } from "./config/theme.js";
import { AppContext } from "../context/AppContext.jsx";

function LoginPanel() {
  const context = useContext(AppContext);
  var userID = createRef();
  var password = createRef();
  const loginFunction = (e) => {
    e.preventDefault();
    if (userID.current.value == "" || password.current.value == "") {
      // is not allowed to try to sign in
      console.log("Can't logging");

    } else {
      // is allowed try to sign in
      context.setUser({username: userID.current.value})
      userID.current.value = "";
      password.current.value = "";
      console.log("logging");
     

    }
  };
  return (
    <LoginPanelStyled>
      <div className="login-panel">
        <label htmlFor="user-field" className="label">
          UserID
        </label>
        <input
          ref={userID}
          name="user-field"
          type="text"
          placeholder="User ID"
          className="input"
        />
        <label htmlFor="pass-field" className="label">
          Password
        </label>
        <input
          ref={password}
          name="pass-field"
          type="text"
          placeholder="Password"
          className="input"
        />
        <button className="summit" onClick={loginFunction}>
          Login
        </button>
      </div>
    </LoginPanelStyled>
  );
}

export default LoginPanel;
const LoginPanelStyled = styled.form`
  label {
    color: ${color.fontsC};
    padding-left: 15px;
  }
  .login-panel {
    padding: 1%;
    width: 250px;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
    background-color: ${color.background};
    border: 3px solid ${color.border};
  }
  .input {
    margin: auto;
    width: 85%;
    border: none;
    height: 35%;
    background-color: ${color.input};
    padding-left: 10px;
    color: ${color.fontsW};
    caret-color: ${color.fontsC};
  }
  .input:focus {
    border: none;
    outline: none;
  }
  .input:active {
    border: none;
    outline: none;
  }
  .summit {
    margin: auto;

    width: 60%;
    height: 50%;
    background-color: ${color.background};
    border: 3px solid ${color.border};
    color: ${color.fontsC};
  }
  .summit:active {
    background-color: ${color.border};
    border: 3px solid ${color.background};
    color: ${color.fontsB};
  }
`;

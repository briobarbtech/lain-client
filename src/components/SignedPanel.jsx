import React, { useContext } from "react";
import { styled } from "styled-components";
import { color } from "./theme";
import { AppContext } from "../context/AppContext";
function SignedPanel({ username }) {
  const context = useContext(AppContext);

  const logoutUser = (e) =>{
    e.preventDefault()
    context.setUser({})
  }
  return (
    <SignedPanelStyled>
      <div className="container">
        <p className="username">{username}</p>
        <button className="summit" onClick={logoutUser} >Logout</button>
      </div>
    </SignedPanelStyled>
  );
}

export default SignedPanel;
const SignedPanelStyled = styled.div`
  .container {
    width: 250px;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: ${color.background};
    border: 3px solid ${color.border};
  }
  .username {
    font-size: 1.5em;
    color: ${color.fontsC};
  }
  .summit {
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

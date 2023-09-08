import React, { useContext } from "react";
import ParticlesBackground from "./components/ParticlesBackground";
import MessagesPanel from "./components/MessagesPanel";
import LoginPanel from "./components/LoginPanel";
import InputPanel from "./components/InputPanel";
import SignedPanel from "./components/SignedPanel";
import { styled } from "styled-components";
import { AppContext } from "./context/AppContext";

function App() {
  const context = useContext(AppContext);

  return (
    <div className="App">
      {/* <ParticlesBackground> */}
      <PanelStyled>
        <div className="panel">
          <MessagesPanel />
          <InputPanel />
          {context.user.username ? <SignedPanel username={context.user.username}/> : <LoginPanel />}
        </div>
      </PanelStyled>
    </div>
  );
}

export default App;
const PanelStyled = styled.div`
  .panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

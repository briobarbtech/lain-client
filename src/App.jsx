import React, { useContext } from "react";
import ParticlesBackground from "./components/ParticlesBackground";
import MessagesPanel from "./components/MessagesPanel";
import LoginPanel from "./components/LoginPanel";
import InputPanel from "./components/InputPanel";
import SignedPanel from "./components/SignedPanel";
import { styled } from "styled-components";
import { AppContext } from "./context/AppContext";
import ProfilePanel from "./components/ProfilePanel";
function App() {
  const context = useContext(AppContext);

  return (
    <div className="App">
      
      <PanelStyled>
        <div className="panel">
          <div className="messages-panel">
            <MessagesPanel />
          </div>
          <div className="input-message">
            <InputPanel />
          </div>
          <div className="user-panel">
            {context.user.username ? (
              <SignedPanel username={context.user.username} />
            ) : (
              <LoginPanel />
            )}
          </div>
          <div className="profile-panel">
            <ProfilePanel />
          </div>
        </div>
      </PanelStyled>
      <ParticlesBackground/> 
    </div>
  );
}

export default App;
const PanelStyled = styled.div`
  .panel {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, .2fr);
    grid-gap: 50px;
  }
  .messages-panel {
    grid-column: 2 / 3;
    grid-row: 2;
  }
  .profile-panel {
    grid-column: 3 / 4;
    grid-row: 2;
  }
  .input-message {
    grid-column: 2 / 3;
    grid-row: 3;
  }
  .user-panel {
    grid-column: 3 / 4;
    grid-row:3;
  }
`;

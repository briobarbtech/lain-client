import React, { useContext } from "react";
import styled from "styled-components";

import { color,reactions } from "./theme";
import { AppContext } from "../context/AppContext";
function ProfilePanel() {
  const context = useContext(AppContext)
  return (
    <ProfilePanelStyled>
      <div className="frame">
        <div className="nav">
          <p className="title">[IMAGE]</p>
          <div className="box"></div>
        </div>
        <img src={reactions[context.reaction]} alt="" className="photo" />
        <div className="sound-values"><div className="voice-title">Voice:</div></div>
      </div>
    </ProfilePanelStyled>
  );
}

export default ProfilePanel;
const ProfilePanelStyled = styled.div`
  .box {
    width: 25px;
    height: 25px;
    margin-right: 5%;
    margin-left: 30%;
    background-color: ${color.border};
    border: 3px solid ${color.background};
  }
  .nav {
    width:100%;
    height: 60px;
    display: flex;
    justify-content: right;
    
    align-items: center;
    background-color: ${color.background};
    border: 3px solid ${color.border};
  }
  .title {
    color: ${color.fontsC};
    font-size: 1.4em;
    padding: 0 5px;
  }
  .frame {
    width: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${color.background};
    border: 3px solid ${color.border};
  }
  .photo {
    width: 400px;
    height: 400px;
  }
  .sound-values{
    width:100%;
    height: 60px;
    background-color: ${color.fontsB};
    border: 3px solid ${color.border};
    border-top-width: 9px;
  }
  .voice-title{
    color: ${color.fontsW};
    padding: 4px;
  }
`;

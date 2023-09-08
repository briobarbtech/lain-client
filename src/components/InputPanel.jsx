import React, { createRef, useContext } from "react";
import { styled } from "styled-components";
import { color } from "./theme.js";
import { AppContext } from "../context/AppContext.jsx";
function InputPanel() {
  const context = useContext(AppContext);

  const sendMessage = (e) => {
    e.preventDefault();
    if (context.user.username) {
      // is allowed to send message
      context.socket.emit("message", context.message, context.user.username);
      const newMessage = {
        content: context.message,
        role: "user",
        user: context.user.username,
        date: Date.now()
      };
      context.setMessages([newMessage], ...context.messages);

      // HTTP Request: POST http://localhost:3015/api/v1/save
      // Send message
      context.axios.post(context.url + "/save", newMessage);
      context.setMessage("");
    } else {
      // is not allowed to send message
      console.log("cant send message");
    }
  };

  return (
    <InputPanelStyled>
      <div className="container">
        {/* Input Message */}
        <div className="input-panel">
          <input
            type="text"
            className="input"
            placeholder="Type something..."
            onChange={(e) => context.setMessage(e.target.value)}
            value={context.message}
          
          />
          {/* Submit Button */}

          <button type="submit" className="submit" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </InputPanelStyled>
  );
}

export default InputPanel;
const InputPanelStyled = styled.form`
  .container {
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .input-panel {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${color.background};
    border: 3px solid ${color.border};
  }
  .input {
    width: 85%;
    border: none;
    height: 30px;
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
  .submit {
    width: 10%;
    height: 75%;
    background-color: ${color.background};
    border: 3px solid ${color.border};
    color: ${color.fontsC};
  }
  .submit:active {
    background-color: ${color.border};
    border: 3px solid ${color.background};
    color: ${color.fontsB};
  }
`;

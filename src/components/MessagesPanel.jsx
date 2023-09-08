import { React, useContext, useEffect } from "react";
import { styled } from "styled-components";
import { color } from "./theme";
import { AppContext } from "../context/AppContext";

function MessagesPanel() {
  const context = useContext(AppContext);
  useEffect(() => {
    const receivedMessage = (message) => {
      context.setMessage([message, ...context.messages]);
    };
    context.socket.on("message", receivedMessage);
    return () => {
      context.socket.off("message", receivedMessage);
    };
  }, [context.messages]);
  if (!context.firstTime) {
    // HTTP Request: GET http://localhost:3015/api/v1/messages
    // Get all messages
    context.setFirstTime(true);
    context.axios.get(context.url + "/messages").then((res) => {
      context.setStoredMessages(res.data.messages);
    });
  }

  return (
    <MessagesPanelStyled>
      <div className="container">
        <nav className="nav">
          <div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
          </div>
          <h1 className="chat-title">[CHAT]</h1>
          <div className="square"></div>
        </nav>
        <div className="card">
          <div className="card-body">
            {/* {context.storedMessages.map((message,index) => <div>{message.content}</div>)} */}
            {context.storedMessages.map((message, index) => (
              <div
							className={`${
								message.user === context.user.username ? "me-bubble" : "ia-bubble"
							}`}
              >
                <div
                  className={`${
                    message.user === context.user.username ? "me" : "ia"
                  }`}
                >
                  <div className="">
                    {message.user}: {message.content}
                  </div>
                </div>
              </div>
            ))}
            {context.messages.map((message, index) => (
              <div
							className={`${
								message.user === context.user.username ? "me-bubble" : "ia-bubble"
							}`}
              >
                <div
                  className={`${
                    message.user === context.user.username ? "me" : "ia"
                  }`}
                >
                  <div className="">
                    {message.user}: {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MessagesPanelStyled>
  );
}

export default MessagesPanel;

const MessagesPanelStyled = styled.div`
  .container {
    width: 700px;
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  .nav {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${color.border};
    border: 3px solid ${color.border};
  }
  .chat-title {
    color: ${color.fontsB};
    font-weight: bold;
    font-size: 1.2em;
    font-height; 1.2em;
  }
  .nav div {
    display: flex;
  }
  .square {
    margin: 0 4px;
    width: 20px;
    height: 20px;
    background-color: ${color.border};
    border: 3px solid ${color.background};
  }
  .card {
    width: 100%;
    height: 500px;
    background-color: ${color.background};
    border: 3px solid ${color.border};
  }
  .me{
    color: ${color.fontsW};
		background-color: ${color.background};
		border: 2px solid ${color.border};
		width: max-content;
		padding: 10px;
		border-radius: 10px;
  }
  .ia {
    color: ${color.fontsC};
		background-color: ${color.fontsW};
		border: 2px solid ${color.fontsW};
		width: max-content;
		padding: 10px;
		border-radius: 10px;
  }
  .me-bubble {
		padding: 5px;
		display:flex;
		align-items:center;
		justify-content: end;

	}
  .ia-bubble {
		padding: 5px;
		display:flex;
		align-items:center;
    justify-content: start;
  }
`;

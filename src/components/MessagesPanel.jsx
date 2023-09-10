import { React, useContext, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { color } from "./config/theme";
import { AppContext } from "../context/AppContext";
import postAudio from "./post.audio";

function MessagesPanel() {
  // get the context
  const context = useContext(AppContext);
  // a ref is created to get the input content
  const messagesContainerRef = useRef(null);

  // useEffect is used to scroll to the bottom when a new message arrive
  useEffect(() => {
    const container = messagesContainerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [context.storedMessages]);
  // in this part we define a function to save in a variable the new messages
  useEffect(() => {
    const receivedMessage = async (message, nickname, reaction) => {
      context.setReaction(reaction);
      context.setVoice(message);
      context.setMessages([
        ...context.messages,
        { user: nickname, content: message },
      ]);
    };
    // When socket io to listen a new message receivedMessage() is executed to save the message in the status variable messages
    context.socket.on("message", receivedMessage);
    // When a message is saved the next code to make to scroll to the bottom
    const container = messagesContainerRef.current;
    container.scrollTop = container.scrollHeight;
    // idk kjjj
    return () => {
      context.socket.off("message", receivedMessage);
    };
  }, [context.messages]);

  // We'll to get all messages to charge the message history
  // this part will be executed just when the app start, so we'll set the next bool in true
  if (!context.firstTime) {
    // HTTP Request: GET http://localhost:3015/api/v1/messages

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
          <div className="card-body" ref={messagesContainerRef}>
            {context.storedMessages.map((message, index) => (
              <div
                className={`${
                  message.user === context.user.username
                    ? "me-bubble"
                    : "ia-bubble"
                }`}
              >
                <div
                  className={`${
                    message.user === context.user.username ? "me" : "ia"
                  }`}
                >
                  {message.user}:<div className="">{message.content}</div>
                </div>
              </div>
            ))}
            {context.messages.map((message, index) => (
              <div
                className={`${
                  message.user === context.user.username
                    ? "me-bubble"
                    : "ia-bubble"
                }`}
              >
                <div
                  className={`${
                    message.user === context.user.username ? "me" : "ia"
                  }`}
                >
                  {message.user}:<div className="">{message.content}</div>
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
    width:100%;
    height: 500px;
    background-color: ${color.background};
    border: 3px solid ${color.border};
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  .card-body{
    width: 90%;
    height: 500px;
    display:flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    scroll-behavior: auto;
    scroll-behavior: smooth;
    
  }
  .card-body::-webkit-scrollbar {
    width: 6px;
  }
  
  /* Track */
  .card-body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }
   
  /* Handle */
  .card-body::-webkit-scrollbar-thumb {
    background: #137683; 
    border-radius: 10px;
  }
  
  /* Handle on hover */
  .card-body::-webkit-scrollbar-thumb:hover {
    background: #8acbee; 
  }
  .me{
    color: ${color.fontsW};
		background-color: ${color.background};
		border: 2px solid ${color.border};
		width: max-content;
    width: 80%;
		padding: 10px;
		border-radius: 10px;
  }
  .ia {
    color: ${color.fontsC};
		background-color: ${color.fontsW};
		border: 2px solid ${color.fontsW};
		width: max-content;
    width: 80%;
		padding: 10px;
		border-radius: 10px;
  }
  .me-bubble {
    width: 100%;
		padding: 10px 0;
		display:flex;
		justify-content: end;

	}
  .ia-bubble {
    width: 100%;
    padding: 10px 0;
		display:flex;
		align-items:center;
    justify-content: start;
  }
`;

import { React, createContext, createRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
export const AppContext = createContext();
// Define address to server
const socket = io("http://localhost:3015");

export function AppContextProvider(props) {
  const [user, setUser] = useState({ username: "Brio" });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const url = "http://localhost:3015/api/v1";
  const [storedMessages, setStoredMessages] = useState([]);
  const [firstTime, setFirstTime] = useState(false);
  const [reaction, setReaction] = useState("normal");
  const [voice, setVoice] = useState(null);
  return (
    <AppContext.Provider
      value={{
        voice,
        setVoice,
        socket,
        axios,
        message,
        setMessage,
        user,
        setUser,
        messages,
        setMessages,
        storedMessages,
        setStoredMessages,
        firstTime,
        setFirstTime,
        url,
        reaction,
        setReaction,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

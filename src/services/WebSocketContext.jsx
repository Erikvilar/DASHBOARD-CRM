import React, { createContext, useState, useContext } from "react";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  return (
    <WebSocketContext.Provider value={{ message, setMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
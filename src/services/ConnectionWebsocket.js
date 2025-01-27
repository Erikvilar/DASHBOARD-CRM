import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import eventEmitter from "./events/Emitter";


let client;
let isConnected = false;

export const initializeWebSocket = (token) => {


  if (client && isConnected) {
    console.log("WebSocket já está conectado.");
   
    return;
  }

  const socket = new SockJS("/ws");
  client = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 2000,
    heartbeatIncoming: 2000,
    heartbeatOutgoing: 2000,
    
    debug: (str) => console.log(str),

    onConnect: () => {
      client.subscribe("/topic/response", (message) => {

        eventEmitter.emit("messageReceived", JSON.parse(message.body));
       
      });
      isConnected = true;
      console.log("Conexão WebSocket estabelecida.");
    },
    onStompError: (frame) => {
      console.error("Erro no WebSocket:", frame.headers["message"]);
      console.error("Detalhes:", frame.body);
    },
    onDisconnect: () => {
      isConnected = false;
      console.log("Conexão WebSocket encerrada.");
      handleReconnect(token);
    },
  });

  client.activate();

};

const handleReconnect = (token) => {
  if (!client || client.connected) {
    return;
  }

  setTimeout(() => {
    console.log("Tentando reconectar ao WebSocket...");
    initializeWebSocket(token);
  }, 5000);
};
export const sendWebSocketMessage = (destination, message) => {
  if (client && isConnected) {
    try {
      client.publish({
        destination,
        body: JSON.stringify(message),
      });

      console.log("Mensagem enviada:", message);
    } catch (error) {
      console.error("Erro ao enviar mensagem pelo WebSocket:", error);
    }
  } else {
    console.error("WebSocket não está conectado. Tente reconectar.");
  }
};

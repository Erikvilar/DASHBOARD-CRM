import { Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useWebSocket } from "./WebSocketContext";



let client;
let isConnected = false;


export const initializeWebSocket = (token) => {
  if (client && isConnected) {
    console.log("WebSocket já está conectado.");
    return client;
  }


  
  const socket = new SockJS("/ws");
  client = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug: (str) => console.log(str),

    onConnect: () => {

      client.subscribe("/topic/response", (message) => {
        console.log("Mensagem recebida:", message.body);
        alert("Uma linha foi atualizada");
        setMessage(message.body)
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
    },
   
    


  });

  client.activate();
  return client;
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

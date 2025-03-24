import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import eventEmitter from "./events/Emitter";
import Swal from "sweetalert2";

let client;
let isConnected = false;

export const initializeWebSocket = (navigate) => {
  const token = localStorage.getItem("JWT");
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

      isConnected=true
      client.subscribe("/topic/response", (message) => {
        const parsedMessage = JSON.parse(message.body);
        parsedMessage.tokenEmit = token;
        eventEmitter.emit("messageReceived", parsedMessage);
      });
      localStorage.setItem("status", JSON.stringify(true))
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
    onWebSocketClose: () => {
      isConnected = false;
      
      Swal.fire({
        title: "Finalizando sua sessão aguarde",
        text: "Estamos te desconetando...",
        allowOutsideClick: false,
        timer:3000,
        didOpen: () => Swal.showLoading(),
      }).then(()=>{
        desconectWebSocket();
        navigate("/")
      });
    
  
      localStorage.setItem("status", JSON.stringify(false))
      console.log("websocket encerrado");
    },
  });

  client.activate();
};
const logoutMethod = async()=>{
  const data={
    login:localStorage.getItem("user")
  }
  const response = await axiosGeneralRequest.logout(data, localStorage.getItem("JWT"))
  if(response.status == 200){
    console.log(response.data.isLogged)
    localStorage.setItem("isLogged",response.data.isLogged)
    console.log("usuario deslogado");
  }
}
export const desconectWebSocket = async() => {
  if (client && isConnected) {
    console.log("Encerrando a conexão WebSocket...");
    await logoutMethod();
    await client.deactivate();
  } else {
    console.log("Nenhuma conexão WebSocket ativa para encerrar.");
  }
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

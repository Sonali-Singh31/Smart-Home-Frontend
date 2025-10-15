import { io } from "socket.io-client";

let socket = null;

export function initSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000", {
      path: "/socket.io",
      transports: ["websocket"],
    });
  }
  return socket;
}

export function getSocket() {
  return socket;
}

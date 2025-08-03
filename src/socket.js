import { io } from "socket.io-client";

// Update this with your backend URL (e.g., Render URL or localhost)
const socket = io("http://localhost:300"); // or your deployed backend URL

export default socket;

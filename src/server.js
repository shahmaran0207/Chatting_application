import {io} from "socket.io-client";
const socket = io("http://localhost:5003");

export default socket;
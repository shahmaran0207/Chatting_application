import "./App.css";
import socket from "./server";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        askUserName();
    }, []);

    const askUserName=()=>{
        const userName=prompt("당신의 이름을 입력 하세요");

        socket.emit("login", userName, (res)=>{
        });
    }

  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;

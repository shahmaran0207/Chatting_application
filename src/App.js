import "./App.css";
import socket from "./server";
import {useEffect} from "react";

function App() {

    const askUserName=()=>{
        useEffect(() => {
            askUserName();
        }, []);

        const userName=prompt("당신의 이름을 입력해 주세요");

        socket.emit("login", userName, (res)=>{
            console.log(res);
        });
    };

  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;

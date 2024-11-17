import InputField from "./components/InputField/InputField";
import {useEffect, useState} from "react";
import socket from "./server";
import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList]=useState([]);

    useEffect(() => {
        socket.on('message', (message)=>{
            setMessageList((prevState)=>prevState.concat(message));
        })
        askUserName();
    }, []);

    const askUserName=()=>{
        const userName=prompt("당신의 이름을 입력 하세요");

        socket.emit("login", userName, (res)=>{
            if(res?.ok){
                setUser(res.data);
            }
        });
    };

    const sendMessage = (event)=>{
        event.preventDefault();
        socket.emit("sendMessage", message, (res)=>{
            console.log("sendMessage res", res);
        });
    };

  return (
    <div>
      <div className="App"></div>
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}/>

    </div>
  );
}

export default App;
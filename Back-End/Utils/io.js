const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");

module.exports=function (io){
    io.on("connection", async(socket)=>{
        console.log("client is connected", socket.id);

        socket.on("login", async (userName, cb) => {
            try {
                const user = await userController.saveUser(userName, socket.id); // socket.id 저장
                cb({ ok: true, data: { user, sid: socket.id } }); // sid 추가
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        socket.on("sendMessage", async (message, cb) => {
            try {
                const user = await userController.checkUser(socket.id); // socket.id 전달
                const newMessage = await chatController.saveChat(message, user);
                io.emit("message", newMessage);
                cb({ ok: true });
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });


        socket.on("disconnect", ()=>{
            console.log("user is disconnected");
        })
    })
}
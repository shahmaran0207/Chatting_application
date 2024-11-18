const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");

module.exports=function (io){
    io.on("connection", async(socket)=>{

        socket.on("login", async (userName, cb) => {
            try {
                const user = await userController.saveUser(userName, socket.id); // socket.id 저장
                const welcomeMessage={
                    chat: `${user.name} is joined to this room`,
                    user: {id: null, name: "system"},
                };
                io.emit("message", welcomeMessage);
                cb({ ok: true, data: { user, sid: socket.id } }); // sid 추가
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        socket.on("sendMessage", async (message, cb) => {
            try {
                const user = await userController.checkUser(socket.id);

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
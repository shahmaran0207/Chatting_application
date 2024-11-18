const User = require("../Modules/user");
const userController={};

userController.saveUser=async (userName, sid)=>{
    let user = await User.findOne({name: userName})

    if(!user){
        user = new User({
            name: userName,
            token: sid,
            online: true,
        });
    }

    user.token=sid;
    user.online=true;

    await user.save();
    return user;
};

userController.checkUser = async (sid) => {
    if (!sid) throw new Error("Socket ID is required");

    const user = await User.findOne({ token: sid });
    if (!user) throw new Error("User not found");

    return user;
};

module.exports=userController;
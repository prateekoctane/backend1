const express = require("express");
const { userModel } = require("../model/users.model");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();





userRouter.get("/allusers", async (req, res) => {

    try {
        const allUsers = await userModel.find();
        res.send(allUsers);
    } catch (err) {

        res.send({ "msg": "can't fetch users,something went wrong", "error": err.message })
    }
});

userRouter.post("/login", async (req, res) => {
    const {email,password} = req.body;


    try {
        const data = await userModel.findOne({email});
        // console.log(data, "data")

        if (data) {
            const token = jwt.sign({...data},"masai",{expiresIn: 20 })
            // res.statusMessage = "login successful";
            res.send({"msg":"login successful","token":token,"data":data.username});
        } else {

            res.send("wrong credentials");
        }
    } catch (err) {
        res.send({ "msg": "can't login,something went wrong", "error": err.message })
    }

});

userRouter.post("/adduser", async (req, res) => {
    const payload = req.body;
    if (payload.password === payload.confirm_password) {

        try {
            const newUser = new userModel(payload);
            await newUser.save();
            res.send("registration successful")
        } catch (err) {
            res.send({ "msg": "can't register,something went wrong", "error": err.message })
        }
    } else {
        res.send("password and confirm password dont match")
    }

});

userRouter.patch("/update/:id", async (req, res) => {
    const _id = req.params.id;
    const payload = req.body;
    try {
        await userModel.findByIdAndUpdate({ _id }, payload)
        res.send("user info updated successfuly")
    } catch (err) {
        res.send({ "msg": "can't update user,something went wrong", "error": err.message })
    }
    // res.send("update details of a particular user");
});

userRouter.delete("/delete/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        await userModel.findByIdAndDelete({ _id })
        res.send("user deleted successfuly")
    } catch (err) {
        res.send({ "msg": "can't delete user,something went wrong", "error": err.message })
    }
})


module.exports = { userRouter }


// {
//     "username":"abhijeetsavan",
//     "email":"abhijeetsavan@gmail.com",
//     "DOB":"20/09/1994",
//     "role":"full stack",
//     "location":"bangalore",
//     "password":"abhicandothis",
//     "confirm_password":"abhicandothis"
// }
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username:{type:String, required: true},
    email:{type:String, required: true},
    DOB:{type:String, required: true},
    role:{ type: String, required: true},
    location:{type:String, required: true},
    password:{type:String, required: true},
    confirm_password:{type:String, required: true},
});


const userModel = mongoose.model("users",userSchema);


module.exports = { userModel };
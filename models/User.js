import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
    name: String,
    email: {type: String , unique:true},
    password: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
});

export default mongoose.model("User", userSchma);
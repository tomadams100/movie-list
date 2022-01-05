const mongoose = require("mongoose")
const {Schema, model} = mongoose

const usersSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique: true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    }
})

module.exports = model("User", usersSchema)
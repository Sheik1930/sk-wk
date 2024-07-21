const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user must have a name"],
        trim:true,
        unique: true
    },
    age: {
        type: Number,
        trim:true,
        default:20
    },
    email: {
        type: String,
        trim:true,
        default:"example@gmail.com"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User
import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
})

export default mongoose.model("User", UserSchema)
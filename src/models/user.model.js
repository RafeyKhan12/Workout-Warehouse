import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be atleast 8 characters long"]
    },
    refreshToken: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "client"],
        default: "client"
    },
    avatar: {
        type:String
    }
}, {timestamps: true})

export const User = mongoose.models.User || mongoose.model("User", userSchema);
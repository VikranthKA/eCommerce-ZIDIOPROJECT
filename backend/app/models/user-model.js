const mongoose = require("mongoose")
const {Schema,model} = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // match: [/.+@.+\..+/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: true,
        // minlength: 8,
    },
    phoneNumber: {
        type: Number,
        // unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['SuperAdmin', 'Admin', 'Customer'],
    },
}, { timestamps: true });

const User = model('User', userSchema);
module.exports = User

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        min: 3,
        max: 20,
        unique: true,
    },
    address:{
        type: String,
        required: true,
        unique: true,
        max: 64,
    },
    balance:{
        type: Uint256,
        max: 96,
    },
    role: {
        type: String,
        default: "user"
    },
    password:{
        type: String,
        min: 4,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    isLiquidityProvider: {
        type: Boolean,
        default: false,
    },
    isSpacenaut: {
        type: Boolean,
        default: false,
    },
    isKraken: {
        type: Boolean,
        default: false,
    },
    isWhale: {
        type: Boolean,
        default: false,
    },
    isShark: {
        type: Boolean,
        default: false,
    },
    isOrca: {
        type: Boolean,
        default: false,
    },
    isDolphin: {
        type: Boolean,
        default: false,
    },
    isTurtle: {
        type: Boolean,
        default: false,
    },
    isFish: {
        type: Boolean,
        default: false,
    },
    isCrab: {
        type: Boolean,
        default: false,
    },
    isShrimp: {
        type: Boolean,
        default: false,
    },
    isHolder: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: ""
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model("Users", userSchema);

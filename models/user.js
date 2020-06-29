const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: {
        type: String,
        required: true,
        index: {unique: true},
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
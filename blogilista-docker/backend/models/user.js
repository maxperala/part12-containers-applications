const { transform } = require("lodash");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
    
})

userSchema.set('toJSON', {
    transform: (document, newObject) => {
        newObject.id = newObject._id;
        delete newObject._id;
        delete newObject.__v;
        delete newObject.passwordHash;

    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
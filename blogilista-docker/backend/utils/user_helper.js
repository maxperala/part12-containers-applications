const User = require("../models/user");

const alreadyExists = async (username) => {
    const users = await User.find({username});
    return users.length > 0 ? true : false;
}

const validatePassword = (pass) => {
    if (pass.length < 3) return false;
    return true;
}

const findByUsername = async (username) => {
    const user = await User.findOne({username});
    return user ? user : undefined;
}


module.exports = {alreadyExists, validatePassword, findByUsername};
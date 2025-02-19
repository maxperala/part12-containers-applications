const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_helper = require("../utils/user_helper");
const {UsernameExistsOrMissing, PasswordTooShort} = require("../utils/appErrors");
const salt = 10;


const registerUser = async (user) => {
    

    if (!user.username || await user_helper.alreadyExists(user.username)) throw new UsernameExistsOrMissing();
    if (!user.password || !user_helper.validatePassword(user.password)) throw new PasswordTooShort();
    user.passwordHash = await bcrypt.hash(user.password, salt);
    delete user.password;
    user.blogs = [];
    const newUser = new User(user);
    await newUser.save();
    return newUser;
}


const getAllUsers = async () => {
    const users = await User.find({}).populate('blogs');
    return users;
}

module.exports = {registerUser, getAllUsers};
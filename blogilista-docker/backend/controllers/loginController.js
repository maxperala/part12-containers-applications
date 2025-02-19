const user_helper = require("../utils/user_helper");
const {UsernameMissing, UserNotFound, IncorrectPassword} = require("../utils/appErrors");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

const login = async (creds) => {

    if (!creds.username) throw new UsernameMissing();
    const user = await user_helper.findByUsername(creds.username);
    if (!user) throw new UserNotFound();
    if (!creds.password) throw new IncorrectPassword();
    const passCorrect = await bcrypt.compare(creds.password, user.passwordHash);
    if (!passCorrect) throw new IncorrectPassword();

    const  userForToken = {
        username: user.username,
        name: user.name,
        id: user._id,
    }

    const token = jwt.sign(userForToken, config.SECRET)
    return {
        token,
        ...userForToken
    }

}



module.exports = {login}
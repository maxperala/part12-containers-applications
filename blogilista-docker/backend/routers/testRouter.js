const testRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

testRouter.post("/reset", async (req, res) => {
    console.log("RESET CALLED")
    await Blog.deleteMany({});
    await User.deleteMany({});
    res.status(200).end();
})


module.exports = testRouter;
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const blogRouter = require("./routers/blogRouter");
const userRouter = require("./routers/userRouter");
const loginRouter = require("./routers/loginRouter");
const testRouter = require("./routers/testRouter");

mongoose.connect(config.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use("/blogs", middleware.tokenExtract, blogRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);
if (process.env.NODE_ENV === "test") app.use("/test", testRouter);
app.use(middleware.errorHandler);

module.exports = app;

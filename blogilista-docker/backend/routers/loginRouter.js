const loginRouter = require("express").Router();
const loginController = require("../controllers/loginController");


loginRouter.post("/", async (req, res, next) => {

    try {
        const creds = req.body;
        const userObject = await loginController.login(creds);
        res.status(200).json(userObject);


    } catch (e) {
        next(e);
    }
})


module.exports = loginRouter;
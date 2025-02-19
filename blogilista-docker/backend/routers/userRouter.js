const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.post('/', async (req, res, next) => {
    try {
        const user = req.body;
        const savedUser = await userController.registerUser(user);
        res.status(201).json(savedUser);
    } catch (e) {
        next(e);
    }
})

userRouter.get('/', async (req, res, next) => {
    try {
        const users = await userController.getAllUsers();
        res.status(200).json(users);
    } catch (e) {
        next(e);
    }
})



module.exports = userRouter;
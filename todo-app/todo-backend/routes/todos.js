const express = require("express");
const { Todo } = require("../mongo");
const { getAsync, setAsync } = require("../redis/index");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  let counter = await getAsync("counter");
  counter = counter ? parseInt(counter) + 1 : 1;
  await setAsync("counter", counter);
  console.log("COUNTER", await getAsync("counter"));
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.status(200).json(req.todo.toJSON());
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  try {
    const newTodo = req.body;
    console.log(newTodo);
    if (!newTodo) return res.sendStatus(404);
    if (!newTodo.text || newTodo.done == undefined) return res.sendStatus(400);
    req.todo.text = newTodo.text;
    req.todo.done = newTodo.done;
    await req.todo.save();
    res.status(200).json(req.todo.toJSON());
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;

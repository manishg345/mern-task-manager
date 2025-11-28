const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title, userId: req.user });
  await task.save();
  res.status(201).json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.status(200).json(tasks);
});

router.put("/:id", auth, async (req, res) => {
  const { title } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true }
  );
  res.status(200).json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = router;

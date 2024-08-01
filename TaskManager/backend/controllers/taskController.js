const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, assigneeId, dueDate, priority } = req.body;
    const creatorId = req.user.id;

    const newTask = new Task(title, creatorId, assigneeId, dueDate, priority);
    await Task.create(newTask);

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findByAssigneeId(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

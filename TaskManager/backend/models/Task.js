const db = require('../config/db');

class Task {
  constructor(title, creatorId, assigneeId, dueDate, priority) {
    this.title = title;
    this.creatorId = creatorId;
    this.assigneeId = assigneeId;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  static create(task) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO tasks (title, creatorId, assigneeId, dueDate, priority) VALUES (?, ?, ?, ?, ?)',
        [task.title, task.creatorId, task.assigneeId, task.dueDate, task.priority],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  static findByAssigneeId(assigneeId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE assigneeId = ?', [assigneeId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Task;

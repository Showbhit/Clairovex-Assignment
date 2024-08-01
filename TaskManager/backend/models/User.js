const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [user.name, user.email, hashedPassword],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = User;

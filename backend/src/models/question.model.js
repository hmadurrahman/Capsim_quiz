const db = require('./db');

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM questions', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}; 
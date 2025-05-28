const db = require('./db');

exports.create = (score, maxScore) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO submissions (score, max_score) VALUES (?, ?)', [score, maxScore], function(err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
};

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT score, max_score FROM submissions', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}; 
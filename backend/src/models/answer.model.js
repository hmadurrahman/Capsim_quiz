const db = require('./db');

exports.getByQuestionIds = (questionIds) => {
  return new Promise((resolve, reject) => {
    if (!questionIds.length) return resolve([]);
    const placeholders = questionIds.map(() => '?').join(',');
    db.all(`SELECT * FROM answers WHERE question_id IN (${placeholders})`, questionIds, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}; 
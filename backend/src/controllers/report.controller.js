const Submission = require('../models/submission.model');

exports.getReport = async (req, res) => {
  try {
    const submissions = await Submission.getAll();
    const percents = submissions.map(r =>
      r.max_score > 0 ? Math.round((r.score / r.max_score) * 100) : 0
    );
    const ranges = Array(10).fill(0).map((_, i) => ({
      label: `${i * 10 + 1}%-${(i + 1) * 10}%`,
      count: 0
    }));
    percents.forEach(p => {
      let idx = Math.floor((p - 1) / 10);
      if (p === 0) idx = 0;
      if (idx > 9) idx = 9;
      if (idx < 0) idx = 0;
      ranges[idx].count++;
    });
    res.json({ ranges });
  } catch (err) {
    console.error('Error fetching report:', err);
    res.status(500).json({ error: 'Failed to fetch report data', details: err.message });
  }
}; 
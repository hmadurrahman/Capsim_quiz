const express = require('express');
const router = express.Router();
const submitController = require('../controllers/submit.controller');

// POST /api/submit
// Expects: { answers: [{ questionId, answerIds: [id, ...] }] }
router.post('/', submitController.submitQuiz);

module.exports = router;

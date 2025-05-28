const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questions.controller');

// GET /api/questions
router.get('/', questionsController.getQuestions);

module.exports = router;

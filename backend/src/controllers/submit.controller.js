const Question = require('../models/question.model');
const Answer = require('../models/answer.model');
const Submission = require('../models/submission.model');
const { calculateScore } = require('../utils/score.utils');

exports.submitQuiz = async (req, res) => {
  const userAnswers = req.body.answers;
  if (!Array.isArray(userAnswers)) {
    return res.status(400).json({ error: 'Invalid answers format. Expected an array.' });
  }
  try {
    const questions = await Question.getAll();
    if (!questions.length) return res.status(400).json({ error: 'No questions found.' });

    const questionIds = questions.map(q => q.id);
    const answers = await Answer.getByQuestionIds(questionIds);

    const { userScore, maxScore } = calculateScore(questions, answers, userAnswers);

    await Submission.create(userScore, maxScore);

    const percent = maxScore > 0 ? Math.round((userScore / maxScore) * 100) : 0;
    res.json({ score: userScore, maxScore, percent });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ error: 'Failed to submit quiz', details: err.message });
  }
}; 
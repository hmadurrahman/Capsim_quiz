const Question = require('../models/question.model');
const Answer = require('../models/answer.model');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.getAll();
    if (!questions.length) return res.json([]);
    const questionIds = questions.map(q => q.id);
    const answers = await Answer.getByQuestionIds(questionIds);

    // Group answers by question_id
    const answersByQuestion = answers.reduce((acc, a) => {
      (acc[a.question_id] = acc[a.question_id] || []).push({
        id: a.id,
        text: a.text,
        points: a.points
      });
      return acc;
    }, {});

    // Attach answers to questions
    const result = questions.map(q => ({
      id: q.id,
      text: q.text,
      type: q.type,
      answers: answersByQuestion[q.id] || []
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Failed to fetch questions', details: err.message });
  }
}; 
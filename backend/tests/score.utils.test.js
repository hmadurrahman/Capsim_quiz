const { calculateScore } = require('../src/utils/score.utils');

describe('calculateScore', () => {
  it('should calculate correct user and max score', () => {
    const questions = [
      { id: 1, type: 'single' },
      { id: 2, type: 'multiple' }
    ];
    const answers = [
      { id: 1, question_id: 1, points: 5 },
      { id: 2, question_id: 1, points: 0 },
      { id: 3, question_id: 2, points: 2 },
      { id: 4, question_id: 2, points: 3 }
    ];
    const userAnswers = [
      { questionId: 1, answerIds: [1] },
      { questionId: 2, answerIds: [3, 4] }
    ];
    const { userScore, maxScore } = calculateScore(questions, answers, userAnswers);
    expect(userScore).toBe(5 + 2 + 3);
    expect(maxScore).toBe(5 + 2 + 3);
  });
}); 
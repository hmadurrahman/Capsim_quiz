exports.calculateScore = (questions, answers, userAnswers) => {
  let maxScore = 0;
  questions.forEach(q => {
    if (q.type === 'single') {
      const qAnswers = answers.filter(a => a.question_id === q.id);
      maxScore += Math.max(...qAnswers.map(a => a.points));
    } else {
      const qAnswers = answers.filter(a => a.question_id === q.id && a.points > 0);
      maxScore += qAnswers.reduce((sum, a) => sum + a.points, 0);
    }
  });
  let userScore = 0;
  userAnswers.forEach(ans => {
    const q = questions.find(q => q.id === ans.questionId);
    if (!q) return;
    if (q.type === 'single') {
      const a = answers.find(a => a.id === ans.answerIds[0]);
      if (a) userScore += a.points;
    } else {
      ans.answerIds.forEach(aid => {
        const a = answers.find(a => a.id === aid);
        if (a) userScore += a.points;
      });
    }
  });
  return { userScore, maxScore };
}; 
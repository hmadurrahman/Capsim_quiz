const request = require('supertest');
const express = require('express');
const submitRouter = require('../src/routes/submit.routes');
const questionsRouter = require('../src/routes/questions.routes');

const app = express();
app.use(express.json());
app.use('/api/submit', submitRouter);
app.use('/api/questions', questionsRouter);

describe('POST /api/submit', () => {
  let questions;
  beforeAll(async () => {
    // Fetch questions to build a valid submission
    const res = await request(app).get('/api/questions');
    questions = res.body;
  });

  it('should calculate and return a score', async () => {
    // Pick the first answer for each question
    const answers = questions.map(q => ({
      questionId: q.id,
      answerIds: q.answers.length > 0 ? [q.answers[0].id] : []
    }));
    const res = await request(app)
      .post('/api/submit')
      .send({ answers });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('score');
    expect(res.body).toHaveProperty('maxScore');
    expect(res.body).toHaveProperty('percent');
  });

  it('should return 400 for invalid input', async () => {
    const res = await request(app)
      .post('/api/submit')
      .send({ answers: 'not-an-array' });
    expect(res.statusCode).toBe(400);
  });
}); 
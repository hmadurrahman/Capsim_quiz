const request = require('supertest');
const express = require('express');
const questionsRouter = require('../src/routes/questions.routes');

const app = express();
app.use(express.json());
app.use('/api/questions', questionsRouter);

describe('GET /api/questions', () => {
  it('should return all questions with answers', async () => {
    const res = await request(app).get('/api/questions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('answers');
    }
  });
}); 
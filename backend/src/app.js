const express = require('express');
const cors = require('cors');

const questionsRouter = require('./routes/questions.routes');
const submitRouter = require('./routes/submit.routes');
const reportRouter = require('./routes/report.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/questions', questionsRouter);
app.use('/api/submit', submitRouter);
app.use('/api/report', reportRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

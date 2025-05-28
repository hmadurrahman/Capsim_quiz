-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    type TEXT NOT NULL -- 'single' or 'multiple'
);

-- Create answers table
CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    points INTEGER NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample questions
INSERT INTO questions (id, text, type) VALUES
(1, "What's the first thing you should do when you need motivation?", 'single'),
(2, "When was Capsim Founded?", 'single'),
(3, "Which of the following are Capsim products?", 'multiple');

-- Insert sample answers
INSERT INTO answers (question_id, text, points) VALUES
(1, 'Read a book', 5),
(1, 'Watch social media', 0),
(1, 'Go to the gym', 3),
(1, 'Run in the park', 7),
(2, 'August 2010', 0),
(2, 'April 1990', 0),
(2, 'December 2000', 0),
(2, 'January 1985', 1),
(3, 'CapsimInbox', 1),
(3, 'ModXM', 1),
(3, 'CapsimOutbox', 0),
(3, 'CompXM', 1); 
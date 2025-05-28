import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (qid, aid, type) => {
    setAnswers(prev => {
      if (type === 'single') {
        return { ...prev, [qid]: [aid] };
      } else {
        const prevArr = prev[qid] || [];
        if (prevArr.includes(aid)) {
          return { ...prev, [qid]: prevArr.filter(id => id !== aid) };
        } else {
          return { ...prev, [qid]: [...prevArr, aid] };
        }
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      answers: questions.map(q => ({
        questionId: q.id,
        answerIds: answers[q.id] || []
      }))
    };
    fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setSubmitted(true);
      });
  };

  if (loading) return <div className="card">Loading...</div>;
  if (submitted && result) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Quiz Submitted!</h2>
        <div style={{ fontSize: 22, margin: '1.5rem 0', color: 'var(--primary)' }}>
          <b>{result.percent}%</b> <span style={{ fontSize: 16, color: '#444' }}>(Score: {result.score} / {result.maxScore})</span>
        </div>
        <div style={{ fontSize: 18, color: result.percent >= 70 ? 'var(--accent)' : '#d32f2f', fontWeight: 600 }}>
          {result.percent >= 70 ? 'Great job!' : 'Keep practicing!'}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Capsim Quiz</h2>
      <div style={{ marginBottom: 24, color: '#666', fontWeight: 500 }}>
        Answer all questions. <span style={{ float: 'right' }}>Progress: {Object.keys(answers).length}/{questions.length}</span>
      </div>
      {questions.map((q, idx) => (
        <div key={q.id} style={{ marginBottom: 28 }}>
          <div style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 17 }}>
            {idx + 1}. {q.text}
            <span style={{ fontSize: 13, color: '#888', marginLeft: 8 }}>
              ({q.type === 'single' ? 'Single choice' : 'Multiple choice'})
            </span>
          </div>
          <div>
            {q.answers.map(a => {
              const selected = answers[q.id]?.includes(a.id);
              return (
                <label
                  key={a.id}
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    background: selected ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                    borderRadius: 6,
                    padding: '4px 10px',
                    fontWeight: selected ? 600 : 400,
                    color: selected ? 'var(--primary)' : '#222',
                    transition: 'background 0.2s, color 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type={q.type === 'single' ? 'radio' : 'checkbox'}
                    name={`q_${q.id}`}
                    value={a.id}
                    checked={selected}
                    onChange={() => handleChange(q.id, a.id, q.type)}
                    style={{ marginRight: 8 }}
                  />
                  {a.text}
                </label>
              );
            })}
          </div>
        </div>
      ))}
      <button type="submit" style={{ width: 140, fontSize: 18, margin: '0 auto', display: 'block' }}>Submit</button>
    </form>
  );
}

export default Quiz; 
import React, { useState } from 'react';

// Component: CourseDetail
// Props: course (object), apiBase (string)
export default function CourseDetail({ course, apiBase }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSimulate = async (moduleIndex, exerciseIndex) => {
    const answer = answers[`${moduleIndex}-${exerciseIndex}`];
    const payload = { courseId: course.id, moduleIndex, exerciseIndex, answer };
    try {
      const res = await fetch(`${apiBase}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Simulation failed', err);
    }
  };

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      {course.modules && course.modules.map((mod, mi) => (
        <div key={mi} className="module">
          <h3>{mod.title}</h3>
          {mod.exercises && mod.exercises.map((ex, ei) => (
            <div key={ei} style={{ marginBottom: 8 }}>
              <div>{ex.question}</div>
              <input
                type="text"
                placeholder="Your answer"
                value={answers[`${mi}-${ei}`] || ''}
                onChange={e => handleChange(`${mi}-${ei}`, e.target.value)}
              />
              <div style={{ marginTop: 6 }}>
                <button onClick={() => handleSimulate(mi, ei)}>Simulate Grading</button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {result && (
        <div className="result">
          <div><strong>Score:</strong> {result.score}</div>
          <div><strong>Feedback:</strong> {result.feedback}</div>
        </div>
      )}
    </div>
  );
}

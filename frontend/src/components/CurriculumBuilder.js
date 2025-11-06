import React, { useState } from 'react';

// Component: CurriculumBuilder
// Simple form to create a course with title, description, and one module
export default function CurriculumBuilder({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [exerciseQuestion, setExerciseQuestion] = useState('');
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      modules: [
        { title: moduleTitle, exercises: [{ question: exerciseQuestion, type: 'text' }] }
      ]
    };

    try {
      const res = await fetch(`${API_BASE}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const created = await res.json();
      onCreated(created);
      // reset
      setTitle(''); setDescription(''); setModuleTitle(''); setExerciseQuestion('');
    } catch (err) {
      console.error('Failed to create course', err);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h2>Create Course</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Course title" />
        </div>
        <div className="form-row">
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" />
        </div>
        <div className="form-row">
          <input value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} placeholder="Module title" />
        </div>
        <div className="form-row">
          <input value={exerciseQuestion} onChange={e => setExerciseQuestion(e.target.value)} placeholder="Exercise question" />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

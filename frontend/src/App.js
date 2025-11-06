import React, { useEffect, useState } from 'react';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import CurriculumBuilder from './components/CurriculumBuilder';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);

  // Fetch all courses on load
  useEffect(() => {
    fetch(`${API_BASE}/courses`)
      .then(r => r.json())
      .then(setCourses)
      .catch(err => console.error('Failed to fetch courses', err));
  }, []);

  const refreshCourses = () => {
    fetch(`${API_BASE}/courses`).then(r => r.json()).then(setCourses);
  };

  return (
    <div className="app">
      <header>
        <h1>Gamified E-Learning Platform</h1>
      </header>
      <main>
        <div className="left">
          <CourseList courses={courses} onSelect={setSelected} />
          <CurriculumBuilder onCreated={course => { setSelected(course); refreshCourses(); }} />
        </div>
        <div className="right">
          {selected ? (
            <CourseDetail course={selected} apiBase={API_BASE} />
          ) : (
            <p>Select a course to see details and try simulation.</p>
          )}
        </div>
      </main>
    </div>
  );
}

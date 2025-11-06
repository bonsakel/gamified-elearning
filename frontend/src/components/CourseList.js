import React from 'react';

// Component: CourseList
// Props: courses (array), onSelect(fn)
export default function CourseList({ courses = [], onSelect }) {
  return (
    <div>
      <h2>Courses</h2>
      {courses.map(course => (
        <div key={course.id} className="course-item" onClick={() => onSelect(course)}>
          <h3>{course.title}</h3>
          <p style={{ fontSize: 12, color: '#666' }}>{course.description}</p>
        </div>
      ))}
    </div>
  );
}

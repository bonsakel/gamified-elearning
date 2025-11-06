// Simple Express server for Gamified E-Learning Platform
// Run: node server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors()); // enable CORS for all origins (for local dev)
app.use(express.json()); // parse JSON request bodies

const DATA_PATH = path.join(__dirname, 'data', 'courses.json');

// Helper: read courses.json
function readCourses() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

// Helper: write courses.json
function writeCourses(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET /courses -> return all courses
app.get('/courses', (req, res) => {
  try {
    const courses = readCourses();
    res.json(courses);
  } catch (err) {
    console.error('Error reading courses:', err);
    res.status(500).json({ error: 'Failed to read courses' });
  }
});

// GET /courses/:id -> return a single course by id
app.get('/courses/:id', (req, res) => {
  try {
    const id = req.params.id;
    const courses = readCourses();
    const course = courses.find(c => String(c.id) === String(id));
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error('Error reading course:', err);
    res.status(500).json({ error: 'Failed to read course' });
  }
});

// POST /courses -> add a new course
// Expected body: { title, description, modules: [{ title, exercises: [...] }] }
app.post('/courses', (req, res) => {
  try {
    const newCourse = req.body;
    if (!newCourse || !newCourse.title) {
      return res.status(400).json({ error: 'Missing course title' });
    }

    const courses = readCourses();
    // generate simple numeric id
    const nextId = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const courseToAdd = { id: nextId, ...newCourse };
    courses.push(courseToAdd);
    writeCourses(courses);

    res.status(201).json(courseToAdd);
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).json({ error: 'Failed to add course' });
  }
});

// POST /simulate -> simulate grading a user response
// Expected body: { courseId, moduleIndex, exerciseIndex, answer }
// This is a simple simulation: if answer equals "correct" (string) we mark as 100, else random score
app.post('/simulate', (req, res) => {
  try {
    const { courseId, moduleIndex, exerciseIndex, answer } = req.body;
    // Basic validation
    if (courseId == null || moduleIndex == null || exerciseIndex == null) {
      return res.status(400).json({ error: 'Missing parameters for simulation' });
    }

    // Read the course to include some context in response
    const courses = readCourses();
    const course = courses.find(c => String(c.id) === String(courseId));

    if (!course) {
      return res.status(404).json({ error: 'Course not found for simulation' });
    }

    // Simulate grading logic
    let score;
    if (typeof answer === 'string' && answer.trim().toLowerCase() === 'correct') {
      score = 100;
    } else {
      // generate a pseudo-random score based on inputs for deterministic-ish behavior
      const base = (courseId * 7 + moduleIndex * 13 + exerciseIndex * 19);
      score = ((base % 60) + (answer ? String(answer).length % 40 : 20));
      if (score > 100) score = score % 101;
    }

    const result = {
      courseId,
      moduleIndex,
      exerciseIndex,
      answer,
      score,
      feedback: score >= 70 ? 'Great job!' : 'Keep practicing!'
    };

    res.json(result);
  } catch (err) {
    console.error('Error simulating grading:', err);
    res.status(500).json({ error: 'Failed to simulate grading' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

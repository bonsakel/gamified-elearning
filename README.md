# Gamified E-Learning Platform

Project scaffold for a gamified e-learning platform built with React (frontend) and Node/Express (backend). Data is stored locally in JSON for now and the API is ready for future Firebase integration.

## Features
- Backend Express server with REST endpoints to manage courses
- Frontend React app that lists courses, shows details, and simulates grading
- Simple curriculum builder to add courses
- Local JSON storage (`backend/data/courses.json`) for example data

## Folder Structure

```
gamified-elearning/
│
├── backend/
│   ├── server.js
│   └── data/
│       └── courses.json
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── components/
│           ├── CourseList.js
│           ├── CourseDetail.js
│           └── CurriculumBuilder.js
├── package.json
└── README.md
```

## Installation

Requirements: Node.js (16+ recommended) and npm.

1) Install backend dependencies

```bash
cd backend
npm install
```

2) Install frontend dependencies

```bash
cd frontend
npm install
```

## How to Run Locally

1) Start backend (default port 5000)

```bash
cd backend
npm start
```

2) Start frontend (will run on port 3000 by default)

```bash
cd frontend
npm start
```

Open http://localhost:3000 in your browser. The frontend talks to the backend at `http://localhost:5000`.

## API Endpoints

- GET /courses - list all courses
- GET /courses/:id - get course details
- POST /courses - add a new course
- POST /simulate - simulate grading (send { courseId, moduleIndex, exerciseIndex, answer })

## Future Improvements
- Replace JSON storage with a real database (MongoDB / Firebase Firestore)
- Add authentication and user progress tracking
- Add unit tests, CI, and deployment scripts
- Improve UI/UX and add theming

## Notes
- The code is intentionally simple and commented for beginners.
- The simulate endpoint uses a naive scoring function; replace it with real grading logic later.

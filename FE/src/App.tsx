import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import '@mantine/core/styles.css';

// Authentication Pages
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/teacher/CreateQuiz';
import TeacherDashboard from './pages/teacher/TeachersDashboard';
import ViewAllQuizzes from './pages/teacher/ViewAllQuestions';
import ViewAllStudents from './pages/teacher/ViewAllStudents';
// import './App.css';

// New Pages
import QuizPage from './pages/student/QuizPage';
import ResultsPage from './pages/student/ResultsPage';
import CoursesPage from './pages/student/CoursesPage';
import EnrollPage from './pages/student/EnrollPage';
import StudentDashboard from './pages/student/StudentDashboard';

const App = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/teacher" element={<Dashboard />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="create-quiz" element={<CreateQuiz />} />
            <Route path="view-all-quizzes" element={<ViewAllQuizzes />} />
            <Route path="all-students" element={<ViewAllStudents />} />
          </Route>

          <Route path="/student" element={<Dashboard />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="enroll" element={<EnrollPage />} />
          </Route>

        </Routes>
        
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;

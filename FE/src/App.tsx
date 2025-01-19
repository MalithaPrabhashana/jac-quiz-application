import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import '@mantine/core/styles.css';

// Authentication Pages
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/student/StudentDashboard';

// New Pages
import QuizPage from './pages/student/QuizPage';
import ResultsPage from './pages/student/ResultsPage';
import CoursesPage from './pages/student/CoursesPage';
import EnrollPage from './pages/student/EnrollPage';

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

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/StudentDashboard" element={<StudentDashboard />} />

          {/* New Feature Routes */}
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/enroll" element={<EnrollPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;

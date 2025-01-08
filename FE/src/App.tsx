import { MantineProvider } from '@mantine/core';
import Login from './components/Auth/Login'; // Adjust the path as needed
import '@mantine/core/styles.css';
import Signup from './components/Auth/Signup';
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/teacher/CreateQuiz';
import TeacherDashboard from './pages/teacher/TeachersDashboard';
import ViewAllQuizzes from './pages/teacher/ViewAllQuestions';
// import './App.css';

const App = () => {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/teacher" element={<Dashboard />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="create-quiz" element={<CreateQuiz />} />
            <Route path="view-all-quizzes" element={<ViewAllQuizzes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;

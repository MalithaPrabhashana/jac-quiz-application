import { MantineProvider } from '@mantine/core';
import Login from './components/Auth/Login'; // Adjust the path as needed
import '@mantine/core/styles.css';
import Signup from './components/Auth/Signup';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/student/StudentDashboard';

// import './App.css';

const App = () => {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/StudentDashboard" element={<StudentDashboard/>} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;

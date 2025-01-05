import { MantineProvider } from '@mantine/core';
import Login from './components/Auth/Login'; // Adjust the path as needed
import '@mantine/core/styles.css';
import Signup from './components/Auth/Signup';
import { BrowserRouter, Routes, Route } from "react-router";
// import './App.css';

const App = () => {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;

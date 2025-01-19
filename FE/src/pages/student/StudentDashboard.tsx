import { Container, Text, Button, Paper, Group } from '@mantine/core';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
      {/* Sidebar */}
      <div style={{ width: '250px', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 10 }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Container style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
          
          {/* Welcome Section */}
          <Text size="xl" style={{ marginBottom: 16, fontWeight: 600 }}>
            Welcome back, Student!
          </Text>
          <Text color="dimmed" size="sm" style={{ marginBottom: 40 }}>
            Access your quizzes, results, and courses from here.
          </Text>

          {/* Take Quiz */}
          <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, marginBottom: 20 }}>
            <Text size="lg" style={{ marginBottom: 16 }}>
              Take a Quiz
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
              Start a new quiz to test your knowledge.
            </Text>
            <Group align="center" justify="center">
              <Button variant="outline" onClick={() => navigate('/quiz')}>Start Quiz</Button>
            </Group>
          </Paper>

          {/* View Results */}
          <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, marginBottom: 20 }}>
            <Text size="lg" style={{ marginBottom: 16 }}>
              View Results
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
              Check your quiz performance and progress.
            </Text>
            <Group align="center" justify="center">
              <Button variant="outline" onClick={() => navigate('/results')}>View Results</Button>
            </Group>
          </Paper>

          {/* Enrolled Courses */}
          <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, marginBottom: 20 }}>
            <Text size="lg" style={{ marginBottom: 16 }}>
              Enrolled Courses
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
              View all the courses you are enrolled in.
            </Text>
            <Group align="center" justify="center">
              <Button variant="outline" onClick={() => navigate('/courses')}>View Courses</Button>
            </Group>
          </Paper>

          {/* New Button: Enroll New Classes */}
          <Paper radius="md" shadow="sm" withBorder style={{ padding: 30 }}>
            <Text size="lg" style={{ marginBottom: 16 }}>
              Enroll in New Classes
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
              Browse and enroll in new classes to expand your learning.
            </Text>
            <Group align="center" justify="center">
              <Button variant="filled" color="green" onClick={() => navigate('/enroll')}>Enroll Now</Button>
            </Group>
          </Paper>

        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;

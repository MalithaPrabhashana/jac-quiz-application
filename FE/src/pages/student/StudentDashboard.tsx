import { Container, Text, Button, Paper, Group } from '@mantine/core';
import Sidebar from '../../components/Sidebar';

const StudentDashboard = () => {
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
          justifyContent: 'center', // ✅ Horizontally center
          alignItems: 'center',     // ✅ Vertically center
          padding: '20px',
          height: '100vh',
          boxSizing: 'border-box',
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
            <Group justify="center">
              <Button variant="outline">Start Quiz</Button>
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
            <Group justify="center">
              <Button variant="outline">View Results</Button>
            </Group>
          </Paper>

          {/* Enrolled Courses */}
          <Paper radius="md" shadow="sm" withBorder style={{ padding: 30 }}>
            <Text size="lg" style={{ marginBottom: 16 }}>
              Enrolled Courses
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
              View all the courses you are enrolled in.
            </Text>
            <Group justify="center">
              <Button variant="outline">View Courses</Button>
            </Group>
          </Paper>

        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;

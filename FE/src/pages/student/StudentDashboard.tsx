import { Container, Text, Button, Paper, Group } from '@mantine/core';

const StudentDashboard = () => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      {/* Welcome section */}
      <Container style={{ textAlign: 'center', marginBottom: 40 }}>
        <Text size="xl" style={{ marginBottom: 8 }}>
          Welcome back, Student!
        </Text>
        <Text color="dimmed" size="sm">
          Access your quizzes, results, and courses from here.
        </Text>
      </Container>

      {/* Take Quiz */}
      <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, width: '100%', maxWidth: 500, marginBottom: 20 }}>
        <Text size="lg" style={{ marginBottom: 16 }}>
          Take a Quiz
        </Text>
        <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
          Start a new quiz to test your knowledge.
        </Text>
        <Group style={{ justifyContent: 'center' }}>
          <Button variant="outline">Start Quiz</Button>
        </Group>
      </Paper>

      {/* View Results */}
      <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, width: '100%', maxWidth: 500, marginBottom: 20 }}>
        <Text size="lg" style={{ marginBottom: 16 }}>
          View Results
        </Text>
        <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
          Check your quiz performance and progress.
        </Text>
        <Group style={{ justifyContent: 'center' }}>
          <Button variant="outline">View Results</Button>
        </Group>
      </Paper>

      {/* Enrolled Courses */}
      <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, width: '100%', maxWidth: 500, marginBottom: 20 }}>
        <Text size="lg" style={{ marginBottom: 16 }}>
          Enrolled Courses
        </Text>
        <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
          View all the courses you are enrolled in.
        </Text>
        <Group style={{ justifyContent: 'center' }}>
          <Button variant="outline">View Courses</Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default StudentDashboard;

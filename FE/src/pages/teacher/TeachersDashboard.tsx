import { Container, Text, Button, Paper, Group } from '@mantine/core';

const TeacherDashboard = () => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      {/* Welcome section */}
      <Container style={{ textAlign: 'center', marginBottom: 40 }}>
        <Text size="xl" style={{ marginBottom: 8 }}>
          Welcome back, Teacher!
        </Text>
        <Text color="dimmed" size="sm">
          Manage your courses, quizzes, and students from here.
        </Text>
      </Container>

      {/* Content cards */}
      <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, width: '100%', maxWidth: 500, marginBottom: 20 }}>
        <Text size="lg" style={{ marginBottom: 16 }}>
          Manage Students
        </Text>
        <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
          View, edit, or remove students from your courses.
        </Text>
        <Group style={{ justifyContent: 'center' }}>
          <Button variant="outline">View Students</Button>
        </Group>
      </Paper>

      <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, width: '100%', maxWidth: 500, marginBottom: 20 }}>
        <Text size="lg" style={{ marginBottom: 16 }}>
          View Quizzes
        </Text>
        <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
          View quizzes you have created and track their results.
        </Text>
        <Group style={{ justifyContent: 'center' }}>
          <Button variant="outline">View Quizzes</Button>
        </Group>
      </Paper>

      <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, width: '100%', maxWidth: 500, marginBottom: 20 }}>
        <Text size="lg" style={{ marginBottom: 16 }}>
          Create a Quiz
        </Text>
        <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
          Create new quizzes for your students to take.
        </Text>
        <Group style={{ justifyContent: 'center' }}>
          <Button variant="outline">Create Quiz</Button>
        </Group>
      </Paper>

      <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, width: '100%', maxWidth: 500, marginBottom: 20 }}>
        <Text size="lg" style={{ marginBottom: 16 }}>
          View Results
        </Text>
        <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
          Check the results of your students and analyze performance.
        </Text>
        <Group style={{ justifyContent: 'center' }}>
          <Button variant="outline">View Results</Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default TeacherDashboard;

import { Container, Text, Button, Paper, Group, Grid, Card, Badge, Title } from '@mantine/core';
import { useNavigate } from 'react-router';
import { IconClipboardList, IconFileText, IconUsers, IconArmchair } from '@tabler/icons-react';

const TeacherDashboard = () => {
  const navigate = useNavigate(); // Navigation hook

  const statsData = [
    { title: 'Total Students', value: '120', badgeText: 'Active', badgeColor: 'green' },
    { title: 'Upcoming Quizzes', value: '5', badgeText: 'Soon', badgeColor: 'yellow' },
    { title: 'Completed Quizzes', value: '34', badgeText: 'Done', badgeColor: 'blue' },
    { title: 'Average Score', value: '85%', badgeText: 'Great!', badgeColor: 'pink' },
  ];

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
      {/* Welcome section */}
      <Container style={{ textAlign: 'center', marginBottom: 40 }}>
        <Title order={2} style={{ marginBottom: 8 }}>
          Welcome back, Teacher!
        </Title>
        <Text color="dimmed" size="sm">
          Manage your courses, quizzes, and students here with ease.
        </Text>
      </Container>

      {/* Quick Stats Section */}
      <Grid grow style={{ marginBottom: 40 }}>
        {statsData.map((stat, index) => (
          <Grid.Col span={3} key={index}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ minHeight: 160 }} // Ensure all cards have the same height
            >
              <Text size="lg">{stat.title}</Text>
              <Text size="xl" style={{ fontWeight: 700 }}>{stat.value}</Text>
              <Badge color={stat.badgeColor} variant="light">{stat.badgeText}</Badge>
            </Card>
          </Grid.Col>
        ))}
      </Grid>


      {/* Content cards */}
      <Grid grow style={{ width: '100%', maxWidth: 800 }}>
        <Grid.Col span={6}>
          <Paper radius="md" shadow="xs" withBorder style={{ padding: 30 }}>
            <Group align="apart">
              <IconUsers size={24} color="#2d9cdb" />
              <Text size="lg">Manage Students</Text>
            </Group>
            <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
              View, edit, or remove students from your courses.
            </Text>
            <Button variant="outline" fullWidth onClick={() => navigate('/students')}>View Students</Button>
          </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper radius="md" shadow="xs" withBorder style={{ padding: 30 }}>
            <Group align="apart">
              <IconClipboardList size={24} color="#2d9cdb" />
              <Text size="lg">View Quizzes</Text>
            </Group>
            <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
              View quizzes you have created and track their results.
            </Text>
            <Button variant="outline" fullWidth onClick={() => navigate('/quizzes')}>View Quizzes</Button>
          </Paper>
        </Grid.Col>
      </Grid>

      <Grid grow style={{ width: '100%', maxWidth: 800 }} pt={16}>
        <Grid.Col span={6}>
          <Paper radius="md" shadow="xs" withBorder style={{ padding: 30 }}>
            <Group align="apart">
              <IconFileText size={24} color="#2d9cdb" />
              <Text size="lg">Create a Quiz</Text>
            </Group>
            <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
              Create new quizzes for your students to take.
            </Text>
            <Button variant="outline" fullWidth onClick={() => navigate('/teacher/create-quiz')}>Create Quiz</Button>
          </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper radius="md" shadow="xs" withBorder style={{ padding: 30 }}>
            <Group align="apart">
              <IconArmchair size={24} color="#2d9cdb" />
              <Text size="lg">View Results</Text>
            </Group>
            <Text size="sm" color="dimmed" style={{ marginBottom: 20 }}>
              Check the results of your students performance.
            </Text>
            <Button variant="outline" fullWidth onClick={() => navigate('/results')}>View Results</Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard;

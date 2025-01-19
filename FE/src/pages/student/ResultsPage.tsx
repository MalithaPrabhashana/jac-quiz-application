import {
  Container,
  Title,
  Paper,
  Text,
  Table,
  Progress,
  Grid,
  Card,
  Group,
  Badge,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate();

  const recentResults = [
    { quiz: 'Math Basics', score: 85, date: '2024-01-12' },
    { quiz: 'Physics Concepts', score: 92, date: '2024-01-10' },
    { quiz: 'History of Europe', score: 78, date: '2024-01-08' },
  ];

  return (
    <Container size="lg" py="xl">
      {/* Page Title */}
      <Title order={2} align="center" mb="lg" color="blue">
        📊 Performance Overview
      </Title>

      {/* Statistics Section */}
      <Grid gutter="lg" mb="xl">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="lg" padding="xl" radius="md" withBorder>
            <Group position="apart">
              <Text size="sm" color="dimmed">Average Score</Text>
              <Badge color="green" variant="light">Consistent</Badge>
            </Group>
            <Text size="xl" weight={600} mt="xs">88%</Text>
            <Progress value={88} color="green" size="lg" mt="sm" />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="lg" padding="xl" radius="md" withBorder>
            <Group position="apart">
              <Text size="sm" color="dimmed">Total Quizzes Attempted</Text>
              <Badge color="blue" variant="light">Steady Progress</Badge>
            </Group>
            <Text size="xl" weight={600} mt="xs">25</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="lg" padding="xl" radius="md" withBorder>
            <Group position="apart">
              <Text size="sm" color="dimmed">Best Score</Text>
              <Badge color="gold" variant="light">Top Quiz</Badge>
            </Group>
            <Text size="xl" weight={600} mt="xs">98%</Text>
            <Badge color="blue" variant="light" mt="sm">Physics Concepts</Badge>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Recent Results Section */}
      <Paper shadow="md" radius="md" withBorder p="lg">
        <Title order={4} mb="lg" color="blue">
          📅 Recent Quiz Results
        </Title>
        <Table highlightOnHover striped withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Quiz Title</th>
              <th>Score (%)</th>
              <th>Date Taken</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentResults.map((result, index) => (
              <tr key={index}>
                <td>{result.quiz}</td>
                <td>
                  <Text
                    weight={600}
                    color={result.score >= 80 ? 'green' : 'red'}
                  >
                    {result.score}%
                  </Text>
                </td>
                <td>{result.date}</td>
                <td>
                  <Badge color={result.score >= 80 ? 'green' : 'red'} variant="light">
                    {result.score >= 80 ? 'Passed' : 'Needs Improvement'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>

      {/* Back to Dashboard Button */}
      <Button
        variant="outline"
        size="lg"
        mt="xl"
        onClick={() => navigate('/StudentDashboard')}
        style={{ display: 'block', margin: '0 auto' }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default ResultsPage;

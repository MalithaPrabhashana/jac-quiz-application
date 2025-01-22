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
import { useNavigate } from 'react-router';

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
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <Title order={2} style={{ color: '#1c7ed6' }}>
          📊 Performance Overview
        </Title>
      </div>

      {/* Statistics Section */}
      <Grid gutter="lg" style={{ marginBottom: '2rem' }}>
        <Grid.Col span={12}>
          <Card shadow="lg" padding="xl" radius="md" withBorder>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: '0.875rem', color: '#868e96' }}>
                Average Score
              </Text>
              <Badge color="green" variant="light">
                Consistent
              </Badge>
            </div>
            <Text style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.5rem' }}>
              88%
            </Text>
            <Progress value={88} color="green" size="lg" style={{ marginTop: '0.75rem' }} />
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="lg" padding="xl" radius="md" withBorder>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: '0.875rem', color: '#868e96' }}>
                Total Quizzes Attempted
              </Text>
              <Badge color="blue" variant="light">
                Steady Progress
              </Badge>
            </div>
            <Text style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.5rem' }}>
              25
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="lg" padding="xl" radius="md" withBorder>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: '0.875rem', color: '#868e96' }}>
                Best Score
              </Text>
              <Badge color="gold" variant="light">
                Top Quiz
              </Badge>
            </div>
            <Text style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.5rem' }}>
              98%
            </Text>
            <Badge color="blue" variant="light" style={{ marginTop: '0.75rem' }}>
              Physics Concepts
            </Badge>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Recent Results Section */}
      <Paper shadow="md" radius="md" withBorder>
        <div style={{ marginBottom: '1.5rem' }}>
          <Title order={4} style={{ color: '#1c7ed6' }}>
            📅 Recent Quiz Results
          </Title>
        </div>
        <Table highlightOnHover striped withColumnBorders>
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
                    style={{
                      fontWeight: 600,
                      color: result.score >= 80 ? '#38a169' : '#e53e3e',
                    }}
                  >
                    {result.score}%
                  </Text>
                </td>
                <td>{result.date}</td>
                <td>
                  <Badge
                    color={result.score >= 80 ? 'green' : 'red'}
                    variant="light"
                  >
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
        style={{
          display: 'block',
          margin: '2rem auto 0',
        }}
        onClick={() => navigate('/StudentDashboard')}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default ResultsPage;

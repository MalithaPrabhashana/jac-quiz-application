import {
  Container,
  Text,
  Card,
  Button,
  Grid,
  Badge,
  TextInput,
  Group,
  Flex,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const quizzes = [
    {
      id: 1,
      title: 'Mathematics Basics',
      description: 'Algebra, geometry, and arithmetic.',
      difficulty: 'Easy',
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      description: 'Laws of motion and energy.',
      difficulty: 'Medium',
    },
    {
      id: 3,
      title: 'World History',
      description: 'Ancient to modern world events.',
      difficulty: 'Hard',
    },
  ];

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'green';
      case 'Medium':
        return 'yellow';
      case 'Hard':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Container size="xl" py="xl">
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb="xl">
        <Text size="2xl" weight={700} color="blue">
          📚 Explore Quizzes
        </Text>
        <TextInput
          icon={<IconSearch size={18} />}
          placeholder="Search quizzes..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          w={350}
        />
      </Flex>

      {/* Quizzes Grid */}
      <Grid gutter="lg">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={quiz.id}>
              <Card
                shadow="lg"
                padding="xl"
                radius="md"
                withBorder
                style={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  ':hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Group position="apart">
                  <Text weight={600} size="lg">
                    {quiz.title}
                  </Text>
                  <Badge
                    color={getDifficultyColor(quiz.difficulty)}
                    variant="filled"
                  >
                    {quiz.difficulty}
                  </Badge>
                </Group>
                <Text size="sm" color="dimmed" mt="sm">
                  {quiz.description}
                </Text>
                <Button
                  fullWidth
                  mt="md"
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'blue' }}
                >
                  Start Quiz
                </Button>
              </Card>
            </Grid.Col>
          ))
        ) : (
          <Grid.Col span={12}>
            <Text size="lg" align="center" color="dimmed">
              No quizzes found. Try adjusting your search!
            </Text>
          </Grid.Col>
        )}
      </Grid>

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

export default QuizPage;

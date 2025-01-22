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
import { useNavigate } from 'react-router';

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <Text
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#1c7ed6',
          }}
        >
          📚 Explore Quizzes
        </Text>
        <div style={{ position: 'relative', width: '350px' }}>
          <IconSearch
            size={18}
            style={{
              position: 'absolute',
              top: '50%',
              left: '8px',
              transform: 'translateY(-50%)',
              color: '#868e96',
            }}
          />
          <TextInput
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{
              paddingLeft: '36px',
              width: '100%',
              height: '36px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      {/* Quizzes Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              shadow="lg"
              padding="xl"
              radius="md"
              withBorder
              style={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.02)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: 600, fontSize: '1.25rem' }}>
                  {quiz.title}
                </Text>
                <Badge
                  color={getDifficultyColor(quiz.difficulty)}
                  variant="filled"
                >
                  {quiz.difficulty}
                </Badge>
              </div>
              <Text
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#868e96',
                }}
              >
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
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <Text
              style={{
                fontSize: '1rem',
                color: '#868e96',
              }}
            >
              No quizzes found. Try adjusting your search!
            </Text>
          </div>
        )}
      </div>

      {/* Back to Dashboard Button */}
      <Button
        variant="outline"
        size="lg"
        mt="xl"
        onClick={() => navigate('/StudentDashboard')}
        style={{
          display: 'block',
          margin: '2rem auto 0',
        }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default QuizPage;
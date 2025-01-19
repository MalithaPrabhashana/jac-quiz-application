import {
  Container,
  Text,
  Card,
  Button,
  Grid,
  Progress,
  Badge,
  Group,
  Avatar,
  Rating,
  Stack,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: 'Advanced Calculus',
      instructor: 'Dr. Brown',
      progress: 45,
      rating: 4.5,
      duration: '10h 30m',
    },
    {
      id: 2,
      title: 'Modern Chemistry',
      instructor: 'Prof. Green',
      progress: 75,
      rating: 4.7,
      duration: '8h 20m',
    },
    {
      id: 3,
      title: 'World Literature',
      instructor: 'Ms. White',
      progress: 100,
      rating: 5.0,
      duration: '12h 15m',
    },
  ];

  return (
    <Container size="lg" py="xl">
      <Text size="xl" weight={700} mb="lg" align="center" color="blue">
        📚 My Professional Courses
      </Text>

      <Grid gutter="lg">
        {courses.map((course) => (
          <Grid.Col span={4} key={course.id}>
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
              <Group position="apart" align="center">
                <Stack spacing="xs">
                  <Text weight={700} size="lg">
                    {course.title}
                  </Text>
                  <Group spacing="xs">
                    <Avatar color="blue" size={24}>
                      {course.instructor[0]}
                    </Avatar>
                    <Text size="sm" color="dimmed">
                      {course.instructor}
                    </Text>
                  </Group>
                </Stack>
                <Badge
                  size="sm"
                  color={course.progress === 100 ? 'green' : 'blue'}
                  variant="light"
                >
                  {course.progress === 100 ? 'Completed' : 'In Progress'}
                </Badge>
              </Group>

              <Rating value={course.rating} readOnly size="sm" mt="sm" />

              <Text size="sm" color="dimmed" mt="xs">
                Estimated Duration: {course.duration}
              </Text>

              <Progress
                value={course.progress}
                mt="sm"
                size="sm"
                color={course.progress === 100 ? 'green' : 'blue'}
              />

              <Button
                fullWidth
                mt="md"
                variant={course.progress === 100 ? 'light' : 'filled'}
                color={course.progress === 100 ? 'green' : 'blue'}
                onClick={() =>
                  alert(
                    course.progress === 100
                      ? `Reviewing ${course.title}`
                      : `Continuing ${course.title}`
                  )
                }
              >
                {course.progress === 100 ? 'Review' : 'Continue'}
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

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

export default CoursesPage;

import {
  Container,
  Text,
  Card,
  Button,
  Grid,
  Group,
  Avatar,
  Stack,
  Divider,
} from '@mantine/core';
import { useNavigate } from 'react-router';

const EnrollPage = () => {
  const navigate = useNavigate();

  const newClasses = [
    { id: 1, title: 'Advanced Calculus', instructor: 'Dr. Brown', seats: 10 },
    { id: 2, title: 'Modern Chemistry', instructor: 'Prof. Green', seats: 5 },
    { id: 3, title: 'Literature Studies', instructor: 'Ms. White', seats: 0 },
  ];

  return (
    <Container size="lg" py="xl">
      <Text size="xl" color="blue">
        📘 Enroll in New Classes
      </Text>

      <Grid gutter="lg">
        {newClasses.map((cls) => (
          <Grid.Col span={4} key={cls.id}>
            <Card
              shadow="lg"
              padding="xl"
              radius="md"
              withBorder
              style={{
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.02)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <Stack>
                <Group>
                  <Text size="lg">{cls.title}</Text>
                  <Avatar color="blue" radius="xl" size={36}>
                    {cls.instructor[0]}
                  </Avatar>
                </Group>

                <Text size="sm" color="dimmed">
                  Instructor: {cls.instructor}
                </Text>

                <Text
                  size="sm"
                  color={cls.seats > 0 ? 'green' : 'red'}
                >
                  Seats Available: {cls.seats > 0 ? cls.seats : 'Full'}
                </Text>
              </Stack>

              <Divider my="sm" />

              <Button
                fullWidth
                color={cls.seats > 0 ? 'green' : 'gray'}
                disabled={cls.seats === 0}
                onClick={() =>
                  cls.seats > 0
                    ? alert(`Successfully enrolled in ${cls.title}`)
                    : alert(`${cls.title} is fully booked`)
                }
              >
                {cls.seats > 0 ? 'Enroll Now' : 'Waitlist'}
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

export default EnrollPage;
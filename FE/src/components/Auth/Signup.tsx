import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Container,
  Text,
  Anchor,
  Group,
  Select,
} from '@mantine/core';
import { apiRequest } from '../../apiRequest';

const Signup = () => {

  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    const role = e.target[3].value.toLowerCase();

    try {
      const response_signup_walker = await apiRequest('walker/sign_up_user', {
        method: 'POST',
        body: {
          "email": email ? email : "",
          "role": role ? role : "",
        },
      }) as { status: any; reports: any[] };

      console.log('Sign up response:', response_signup_walker.reports[0].message);
      const response_msg = response_signup_walker.reports[0].message;

      if (response_msg !== "User already exists") {

        try {
          const response_signup_user = await apiRequest('user/register', {
            method: 'POST',
            body: {
              "email": email ? email : "",
              "password": password ? password : "",
            },
          }) as { status: number; reports: any[] };

          console.log('Login successful:', response_signup_user);

          try {
            const response_user_login = await apiRequest<{ token: string }>('user/login', {
              method: 'POST',
              body: {
                "email": email,
                "password": password,
              },
            });

            console.log('Login successful:', response_user_login.token);

            if (response_user_login.token) {
              try {
                const response_walker_login = await apiRequest<{ token: string; reports: any[] }>('walker/login_user', {
                  method: 'POST',
                  body: {
                    "email": email
                  },
                });

                localStorage.setItem('role', response_walker_login.reports[0].role);
                localStorage.setItem('user_id', response_walker_login.reports[0].user_id);

                console.log('user_id', response_walker_login.reports[0]);
                if (response_walker_login.reports[0].role === 'teacher') {
                  window.location.href = '/teacher/dashboard';
                }
                else if (response_walker_login.reports[0].role === 'student') {
                  window.location.href = '/student/dashboard';
                }

              } catch (error: any) {
                console.error('Login failed:', error);
                setError(error.message || 'Something went wrong');
              }
            }

          } catch (error: any) {
            console.error('Login failed:', error);
            setError(error.message || 'Something went wrong');
          }

        } catch (error: any) {
          console.error('Login failed:', error);
          setError(error.message || 'Something went wrong');
        }
      }

    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Something went wrong');
    }
  };


  return (
    <Container
      style={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Container style={{ textAlign: 'center', marginBottom: 20 }}>
        <Text size="xl" style={{ marginBottom: 8 }}>
          Create an Account
        </Text>
        <Text color="dimmed" size="sm">
          Already have an account?{' '}
          <Anchor href="/login" size="sm">
            Login
          </Anchor>
        </Text>
      </Container>

      <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, width: '100%', maxWidth: 400 }}>
        <form onSubmit={handleSignup}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            required
            style={{ marginBottom: 16 }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            style={{ marginBottom: 16 }}
          />
          <Select
            label="Role"
            placeholder="Select role"
            data={['Teacher', 'Student']}
            required
            style={{ marginBottom: 32 }}
          />
          <Group style={{ marginBottom: 16 }}>
            <Anchor href="/forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          {error && (
            <Text color="red" size="sm" style={{ marginBottom: 16 }}>
              {error}
            </Text>
          )}
          <Button fullWidth type="submit">
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;

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
} from '@mantine/core';
import { apiRequest } from '../../apiRequest';

const Login = () => {
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: any) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        const loginData = {
            email: email,
            password: password,
        };

        console.log(loginData);

        try {
            const response_user_login = await apiRequest<{ token: string }>('user/login', {
                method: 'POST',
                body: loginData,
            });

            console.log('Login successful:', response_user_login.token);

            if (response_user_login.token) {
                try {
                    const response_walker_login = await apiRequest<{ token: string; reports: any[] }>('walker/login_user', {
                        method: 'POST',
                        body: loginData,
                    });
                    
                    localStorage.setItem('token', response_user_login.token);
                    localStorage.setItem('userId', response_walker_login.reports[0]);

                    console.log('user_id', response_walker_login.reports[0]);
                    window.location.href = '/dashboard';
        
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
                    Welcome back!
                </Text>
                <Text color="dimmed" size="sm">
                    Don't have an account?{' '}
                    <Anchor href="/signup" size="sm">
                        Create one
                    </Anchor>
                </Text>
            </Container>

            <Paper radius="md" shadow="sm" withBorder style={{ padding: 30, width: '100%', maxWidth: 400 }}>
                <form onSubmit={handleLogin}>
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
                        style={{ marginBottom: 32 }}
                    />
                    <Group style={{ marginBottom: 16 }}>
                        <Anchor href="/forgot-password" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button fullWidth type="submit">
                        Login
                    </Button>
                    {error && (
                        <Text color="red" size="sm" style={{ marginTop: 16 }}>
                            {error}
                        </Text>
                    )}
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
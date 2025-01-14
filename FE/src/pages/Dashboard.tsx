import { useEffect, useState } from 'react';
import { Container, Loader, Text } from '@mantine/core';
import Sidebar from '../components/Sidebar';
import TeacherDashboard from './teacher/TeachersDashboard';
import StudentDashboard from './student/StudentDashboard.tsx';

const Dashboard = () => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            setLoading(true);
            try {
                const userRole = localStorage.getItem('role');
                setRole(userRole || 'teacher');
                
            } catch (error) {
                console.error('Error fetching role:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    if (loading) {
        return (
            <Container
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Loader size="lg" />
            </Container>
        );
    }

    if (!role) {
        return (
            <Container
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Text size="lg" color="red">
                    Unable to determine user role. Please log in again.
                </Text>
            </Container>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
            }}
        >

            {/* Sidebar */}
            <div
                style={{
                    width: '250px',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                }}
            >
                <Sidebar />
            </div>


            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    marginLeft: '100px',
                    padding: '20px',
                    overflowY: 'auto',
                }}
            >
                <Text size="xl" style={{ fontWeight: 700, marginBottom: 20 }}>
                    Welcome to your {role === 'teacher' ? 'Teacher' : 'Student'} Dashboard
                </Text>

                {role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
            </div>
        </div>
    );
};

export default Dashboard;
import { useEffect, useState } from 'react';
import { Container, Loader, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';

const Dashboard = () => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery('(max-width: 768px)');  // Media query for small screens (mobile)

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
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <div style={{ height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 10 }}>
                <Sidebar role={role} />
            </div>

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    marginLeft: isMobile ? '80px' : '0',  // Apply 0px margin for small screens, 80px for larger
                    padding: '20px',
                    overflowY: 'auto',
                }}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
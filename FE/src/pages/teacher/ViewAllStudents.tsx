import { Table, Container, Paper, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react'; // Import the Trash icon

const ViewAllStudents = () => {
    const students = [
        { id: 's1', name: 'John Doe', email: 'john@example.com', age: 20, enrolled: 'Math, Science' },
        { id: 's2', name: 'Jane Smith', email: 'jane@example.com', age: 22, enrolled: 'English, History' },
    ];

    const handleDelete = (studentId: any) => {
        console.log(`Deleting student with ID: ${studentId}`);
        const updatedStudents = students.filter((student) => student.id !== studentId);
        console.log(updatedStudents);
    };

    const rows = students.map((student) => (
        <Table.Tr key={student.id}>
            <Table.Td>{student.id}</Table.Td>
            <Table.Td>{student.name}</Table.Td>
            <Table.Td>{student.email}</Table.Td>
            <Table.Td>{student.age}</Table.Td>
            <Table.Td>{student.enrolled}</Table.Td>
            <Table.Td>
                <ActionIcon color="red" onClick={() => handleDelete(student.id)}>
                    <IconTrash />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Container style={{ marginTop: 40 }}>
            <h1>All Students</h1>

            <Paper shadow="xs" withBorder style={{ padding: '20px' }}>
                <Table.ScrollContainer minWidth={500} type="native">
                    <Table striped highlightOnHover withTableBorder withColumnBorders verticalSpacing="xs">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Student ID</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th>Age</Table.Th>
                                <Table.Th>Enrolled Courses</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Paper>
        </Container>
    );
};

export default ViewAllStudents;

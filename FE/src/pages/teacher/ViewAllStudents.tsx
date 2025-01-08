import { Table, Container, Text, Paper, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react'; // Import the Trash icon

const ViewAllStudents = () => {
    // Example student data (replace with real data)
    const students = [
        { id: 's1', name: 'John Doe', email: 'john@example.com', age: 20, enrolled: 'Math, Science' },
        { id: 's2', name: 'Jane Smith', email: 'jane@example.com', age: 22, enrolled: 'English, History' },
        // Add more students as necessary
    ];

    // Function to handle the deletion of a student
    const handleDelete = (studentId: any) => {
        // You can replace this logic with an API call or state update to remove the student
        console.log(`Deleting student with ID: ${studentId}`);
        // For demonstration, filtering out the student
        const updatedStudents = students.filter((student) => student.id !== studentId);
        console.log(updatedStudents); // This will show the list of students after deletion
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

            {/* Wrapping the table with a Paper component to add border and shadow */}
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
                                <Table.Th>Actions</Table.Th> {/* Added Action column */}
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

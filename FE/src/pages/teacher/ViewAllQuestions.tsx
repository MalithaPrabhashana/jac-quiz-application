import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { Container, Paper, Text, Button, TextInput, Accordion, Group, Modal, ActionIcon, Grid } from '@mantine/core';
import { Link } from 'react-router';
import { apiRequest } from '../../apiRequest';

interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: { id: string; question: string; answer: string }[];
}

const ViewAllQuizzes = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [editedQuestion, setEditedQuestion] = useState<{
        quizId: string;
        questionId: string;
        newQuestion: string;
        newAnswer: string;
    } | null>(null);
    const [openedModal, setOpenedModal] = useState<boolean>(false);


    useEffect(() => {
        // Fetch quizzes when the component mounts
        const fetchQuizzes = async () => {
            try {
                const response = await apiRequest('walker/get_all_quizzes', {
                    method: 'POST',
                    body: {
                        user_id: localStorage.getItem("user_id") || 'n:profile:678101d379ee63dfc05351c6',
                    },
                }) as { status: number; reports: any[] };
    
                // Parse the API response to extract quiz data
                if (response.status === 200 && Array.isArray(response.reports)) {
                    const quizzesData = response.reports[0].map((quiz: any) => ({
                        id: quiz.id,
                        title: quiz.context.title,
                        description: quiz.context.description,
                        duration: quiz.context.duration,
                        questions: quiz.context.questions.map((q: any, index: number) => ({
                            id: `${quiz.id}-q${index + 1}`,
                            question: q.question,
                            answer: q.answer,
                        })),
                    }));
    
                    // Update state with parsed quiz data
                    setQuizzes(quizzesData);
                } else {
                    throw new Error('Invalid API response structure');
                }
            } catch (err: any) {
                console.error('Failed to fetch quizzes:', err);
                setError(err.message || 'Something went wrong while fetching quizzes.');
            }
        };
    
        fetchQuizzes();
    }, []);
    
    

    // Handle opening the modal to edit a question's question and answer
    const openEditModal = (quizId: string, questionId: string, currentQuestion: string, currentAnswer: string) => {
        setEditedQuestion({ quizId, questionId, newQuestion: currentQuestion, newAnswer: currentAnswer });
        setOpenedModal(true);
    };

    // Handle updating a question's question and answer
    const handleUpdateQuestion = () => {
        if (editedQuestion) {
            setQuizzes((prevQuizzes) => {
                const updatedQuizzes = [...prevQuizzes];
                const quizIndex = updatedQuizzes.findIndex((q) => q.id === editedQuestion.quizId);
                const questionIndex = updatedQuizzes[quizIndex].questions.findIndex((q) => q.id === editedQuestion.questionId);

                updatedQuizzes[quizIndex].questions[questionIndex].question = editedQuestion.newQuestion;
                updatedQuizzes[quizIndex].questions[questionIndex].answer = editedQuestion.newAnswer;
                return updatedQuizzes;
            });
        }
        setOpenedModal(false);
    };

    return (
        <Container style={{ marginTop: 40 }}>

            <Grid pb={8}>
                <Grid.Col span={6}>
                    <Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>All Quizzes</Text>
                </Grid.Col>

                <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button component={Link} to="/teacher/create-quiz" color="blue" style={{ marginBottom: 20 }}>
                        Create Quiz
                    </Button>
                </Grid.Col>
            </Grid>

            {/* Display all quizzes in one accordion */}
            <Paper withBorder shadow="xs" p="lg">
                <Accordion>
                    {quizzes.map((quiz) => (
                        <Accordion.Item value={quiz.id} key={quiz.id}>
                            <Accordion.Control style={{ fontWeight: 'bold', fontSize: '1.2rem', padding: '0px 15px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
                                <strong>{quiz.title}</strong>
                            </Accordion.Control>

                            <Accordion.Panel>
                                {quiz.questions.map((q, index) => (
                                    <Group
                                        key={`${quiz.id}-q${index}`}
                                        style={{
                                            marginBottom: 15,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div style={{ width: '85%' }}>
                                            {/* Question Number and Styling */}
                                            <Text
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    color: '#333',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {index + 1}. {q.question} {/* Numbering each question */}
                                            </Text>

                                            {/* Answer Styling */}
                                            <Text
                                                style={{
                                                    fontSize: '0.875rem',
                                                    color: '#555',
                                                    backgroundColor: '#f7f7f7',
                                                    padding: '5px 10px',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {q.answer}
                                            </Text>
                                        </div>

                                        {/* Right-aligned Edit Icon */}
                                        <ActionIcon
                                            color="blue"
                                            onClick={() => openEditModal(quiz.id, q.id, q.question, q.answer)}
                                        >
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                    </Group>
                                ))}

                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Paper>

            {/* Modal for Editing a Question and Answer */}
            <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title="Edit Question and Answer">
                {editedQuestion && (
                    <div>
                        <TextInput
                            label="Question"
                            value={editedQuestion.newQuestion}
                            onChange={(e) =>
                                setEditedQuestion((prevState) =>
                                    prevState ? { ...prevState, newQuestion: e.target.value } : prevState
                                )
                            }
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Answer"
                            value={editedQuestion.newAnswer}
                            onChange={(e) =>
                                setEditedQuestion((prevState) =>
                                    prevState ? { ...prevState, newAnswer: e.target.value } : prevState
                                )
                            }
                            style={{ marginBottom: 10 }}
                        />
                        <Button onClick={handleUpdateQuestion} color="green" style={{ marginTop: 10 }}>
                            Save Changes
                        </Button>
                    </div>
                )}
            </Modal>
        </Container>
    );
};

export default ViewAllQuizzes;

import { useState, useEffect } from 'react';
import { Container, Paper, Text, Button, TextInput, Accordion, Group, Modal, ActionIcon, Grid } from '@mantine/core';
import { Link } from 'react-router';

interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: { id: string; question: string; answer: string }[];
}

const ViewAllQuizzes = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [editedQuestion, setEditedQuestion] = useState<{
        quizId: string;
        questionId: string;
        newQuestion: string;
        newAnswer: string;
    } | null>(null);
    const [openedModal, setOpenedModal] = useState<boolean>(false);

    // Fetch quizzes data (you can replace with an API call)
    useEffect(() => {
        // Simulating an API call with some example quizzes
        const fetchedQuizzes = [
            {
                id: '1',
                title: 'Math Quiz 1',
                description: 'Basic Math Quiz',
                questions: [
                    { id: 'q1', question: 'What is 2 + 2?', answer: '4' },
                    { id: 'q2', question: 'What is 3 + 5?', answer: '8' },
                ],
            },
            {
                id: '2',
                title: 'Science Quiz 1',
                description: 'Basic Science Quiz',
                questions: [
                    { id: 'q3', question: 'What is H2O?', answer: 'Water' },
                    { id: 'q4', question: 'What is the chemical symbol for oxygen?', answer: 'O2' },
                ],
            },
        ];
        setQuizzes(fetchedQuizzes);
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
                            <Accordion.Control>{quiz.title}</Accordion.Control>
                            <Accordion.Panel>
                                {quiz.questions.map((q) => (
                                    <Group key={q.id} style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <Text style={{ fontWeight: 500 }}>{q.question}</Text>
                                            <Text style={{ fontSize: '0.875rem' }}>{q.answer}</Text>
                                        </div>
                                        {/* Right-aligned Edit Icon */}
                                        <ActionIcon color="blue" onClick={() => openEditModal(quiz.id, q.id, q.question, q.answer)}>
                                            ✏️
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

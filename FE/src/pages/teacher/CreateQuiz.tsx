import { useState, useEffect } from 'react';
import {
  Container,
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  NumberInput,
  Divider,
  Paper,
  Grid,
} from '@mantine/core';
import { apiRequest } from '../../apiRequest';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState(0); // Duration in minutes
  const [questions, setQuestions] = useState([
    { question: '', answer: '' }, // Initial question template
  ]);

  // Handle adding a new question template
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  // Handle updating a specific question or answer
  const handleQuestionChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle saving the quiz
  const handleSaveQuiz = async () => {
    const quizData = {
      user_id: localStorage.getItem('user_id'),
      title: title,
      description: description,
      duration: duration,
      questions: questions,
    };

    console.log('Saving quiz:', quizData);

    // Add API call or state management logic here
    try {
      const response = await apiRequest("walker/create_quiz", {
        method: "POST",
        body: quizData,
      });

      console.log(response);

    } catch (error: any) {
      console.error("Error saving quiz:", error);
      alert(error.message || "Something went wrong while saving the quiz.");
    }
  };

  // Update the document title whenever the quiz title changes
  useEffect(() => {
    document.title = title ? `${title} - Create Quiz` : 'Create Quiz';
  }, [title]);

  return (
    <Container style={{ marginTop: 40 }}>
      {/* Page Title */}
      <h1>Create Quiz - {title || ''} Quiz </h1>

      {/* Quiz Details */}

      <Paper withBorder shadow="xs" p="lg">
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Quiz Title"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginBottom: 20 }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Textarea
              label="Quiz Description"
              placeholder="Enter quiz description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginBottom: 20 }}
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label="Quiz Category"
              placeholder="Select category"
              data={['Math', 'Science', 'History', 'Programming']}
              value={category}
              onChange={(value) => setCategory(value || '')}
              style={{ marginBottom: 20 }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <NumberInput
              label="Time Duration (in minutes)"
              placeholder="Enter duration"
              value={duration}
              onChange={(value: any) => setDuration(value || 0)}
              min={1}
              style={{ marginBottom: 20 }}
            />
          </Grid.Col>
        </Grid>

        <Divider my="sm" label="Questions" />

        {/* Questions Section */}
        {questions.map((q, index) => (
          <Paper key={index} withBorder shadow="xs" p="md" style={{ marginBottom: 20 }}>
            <TextInput
              label={`Question ${index + 1}`}
              placeholder="Enter question"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Answer"
              placeholder="Enter answer"
              value={q.answer}
              onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
              style={{ marginBottom: 10 }}
            />
          </Paper>
        ))}

        <Group style={{ marginBottom: 20 }}>
          <Button onClick={handleAddQuestion}>+ Add Question</Button>
        </Group>

        {/* Save Quiz Button */}
        <Group style={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleSaveQuiz} color="blue">
            Save Quiz
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default CreateQuiz;
import { useState } from 'react';
import { Card, Title, Text, Stack, Grid, Button } from '@mantine/core';
import CreateFlashcards from './CreateFlashcards';

export default function SubjectDashboard({ subjectId, quizzes }) {
  // API STUFF: GET THE FLASHCARD DATA FROM THE DATABASE BASED ON SUBJECT ID? 
  // SEND NEW FLASHCARD DECK TO DATABASE WHEN USER CREATES ONE

  // Dummy subject details based on subject id:
  const dummySubjects = {
    math: {
      name: "Math",
      description: "Mathematics Subject",
    },
    science: {
      name: "Science",
      description: "Science Subject",
    },
    history: {
      name: "History",
      description: "History Subject",
    },
  };

  const subject = dummySubjects[subjectId] || { name: "Unknown", description: "Unknown" };

  // Dummy flashcard decks for each subject:
  const dummyFlashcardDecks = {
    math: [
      { id: 1, title: "Algebra Deck" },
      { id: 2, title: "Geometry Deck" },
      { id: 3, title: "Calculus Deck" },
    ],
    science: [
      { id: 4, title: "Physics Deck" },
      { id: 5, title: "Chemistry Deck" },
    ],
    history: [
      { id: 6, title: "Ancient History Deck" },
      { id: 7, title: "Modern History Deck" },
    ],
  };

  const flashcardDecks = dummyFlashcardDecks[subjectId] || [];
  
  // createflashcard model state
  const [showCreateDeck, setShowCreateDeck] = useState(false);

  return (
    <Stack spacing="md">
      <Title order={3}>{subject.name} Dashboard</Title>
      <Text>{subject.description}</Text>

      <Button onClick={() => setShowCreateDeck(true)}>Create Flashcard Deck</Button>

      <Grid>
        {flashcardDecks.length > 0 ? (
          flashcardDecks.map((deck) => (
            <Grid.Col key={deck.id} span={6}>
              <Card
                shadow="md"
                p="lg"
                radius="md"
                withBorder
                style={{
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Title order={4} align="center">
                  {deck.title}
                </Title>
              </Card>
            </Grid.Col>
          ))
        ) : (
          <Text>No flashcard decks available</Text>
        )}
      </Grid>

      <Card shadow="sm" p="md">
        <Title order={4}>Quizzes</Title>
        {quizzes && quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <Text key={index}>
              Score: {quiz.score}% - Date: {new Date(quiz.date).toLocaleDateString()}
            </Text>
          ))
        ) : (
          <Text>No quizzes available</Text>
        )}
      </Card>

      <CreateFlashcards
        opened={showCreateDeck}
        onClose={() => setShowCreateDeck(false)}
        onSubmit={(deck) => {
          
          // TODO: SOMETHING TO HANDLE SENDING NEW DECK TO MONGO
          console.log('New deck created:', deck);
          setShowCreateDeck(false);
        }}
      />
    </Stack>
  );
}

import { useState, useContext, useEffect } from 'react';
import { Card, Title, Text, Stack, Grid, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import CreateFlashcards from './CreateFlashcards';
import { UserContext } from '../../../App';

export default function SubjectDashboard({ subjectId, quizzes }) {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  const [showCreateDeck, setShowCreateDeck] = useState(false);

  // Fetch decks for the logged-in user
  useEffect(() => {
    if (username) {
      fetch(`http://localhost:4000/api/deck?username=${username}`)
        .then((res) => res.json())
        .then((data) => {
          setFlashcardDecks(data.decks);
        })
        .catch((error) => console.error("Error fetching decks:", error));
    }
  }, [username]);

  // Navigate to the flashcards view for the selected deck
  const handleDeckClick = (deckId) => {
    navigate('/flashcards', { state: { deckId } });
  };

  return (
    <Stack spacing="md">
      <Title order={3}>Subject Dashboard</Title>
      <Text>Welcome, {username}</Text>

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
                onClick={() => handleDeckClick(deck.id)}
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
          // TODO: SEND NEW DECK TO DATABASE
          console.log('New deck created:', deck);
          setShowCreateDeck(false);
        }}
      />
    </Stack>
  );
}

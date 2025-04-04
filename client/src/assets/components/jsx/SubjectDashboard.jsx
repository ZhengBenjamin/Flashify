import { useState, useContext, useEffect } from 'react';
import { Card, Title, Text, Stack, Grid, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Flashcards from './Flashcards';
import CreateFlashcards from './CreateFlashcards';
import { UserContext } from '../../../App';

export default function SubjectDashboard({ subject }) {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState(null);

  // Fetch decks for the logged-in user
  useEffect(() => {
    if (username) {
      refreshDecks();
    }
  }, [username, subject.id]);
  
  const refreshDecks = () => {
    fetch(`http://localhost:4000/api/deck?username=${username}&subject_id=${subject.id}`)
      .then((res) => res.json())
      .then((data) => setFlashcardDecks(data))
      .catch((error) => console.error("Error refreshing decks:", error));
  };
  
  // Navigate to the flashcards view for the selected deck
  const handleDeckClick = (deckId) => {
    console.log(deckId);
    setSelectedDeckId(deckId);
  };

  if (selectedDeckId) {
    return <Flashcards deckId={selectedDeckId} />;
  }

  return (
    <Stack spacing="md">
      <Title order={4}>{subject.name} Dashboard</Title>

      <Button onClick={() => setShowCreateDeck(true)}>Create Flashcard Deck</Button>

      <Grid>
        {flashcardDecks && flashcardDecks.length > 0 ? (
          flashcardDecks.map((deck) => (
            <Grid.Col key={deck.deck_id} span={6}>
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
                onClick={() => handleDeckClick(deck.deck_id)}

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

      {/* Todo: Add when quizzes are implemented
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
      </Card> */}

      <CreateFlashcards
        opened={showCreateDeck}
        onClose={() => setShowCreateDeck(false)}
        subject={subject}
        onSubmit={(deck) => {
          console.log('New deck created:', deck);
          refreshDecks();
          setShowCreateDeck(false);
        }}
      />
    </Stack>
  );
}

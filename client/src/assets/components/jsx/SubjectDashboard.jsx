import { useState, useContext, useEffect } from 'react';
import { Card, Title, Text, Stack, Grid, Button } from '@mantine/core';
import Flashcards from './Flashcards';
import CreateFlashcards from './CreateFlashcards';
import { UserContext } from '../../../App';

export default function SubjectDashboard({ subject }) {
  const { username } = useContext(UserContext);
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [hoveredDeckId, setHoveredDeckId] = useState(null);
  const [editDeck, setEditDeck] = useState(null); // holds deck object when editing

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

  // Handle deletion of a deck
  const handleDelete = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        const res = await fetch(`http://localhost:4000/api/deck/${deckId}`, {
          method: "DELETE",
        });
  
        if (!res.ok) throw new Error("Failed to delete deck");
  
        refreshDecks(); // Refresh from DB after deletion
      } catch (err) {
        console.error("Error deleting deck:", err);
        alert("Failed to delete deck.");
      }
    }
  };

  const handleEdit = (deckId) => {
    const deckToEdit = flashcardDecks.find((deck) => deck.deck_id === deckId);
    setEditDeck(deckToEdit);        // Set deck to be edited
    setShowCreateDeck(true);        // Open modal in edit mode
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
                  position: 'relative',
                }}
                onMouseEnter={() => setHoveredDeckId(deck.deck_id)}
                onMouseLeave={() => setHoveredDeckId(null)}
                onClick={() => handleDeckClick(deck.deck_id)}
              >
                {/* Conditionally render the delete button when the deck is hovered */}
                {hoveredDeckId === deck.deck_id && (
                  <>
                  <Button
                    variant="light"
                    size="xs"
                    style={{ position: 'absolute', top: 10, right: 80 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(deck.deck_id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="light"
                    color="red"
                    size="xs"
                    style={{ position: 'absolute', top: 10, right: 10 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(deck.deck_id);
                    }}
                  >
                    Delete
                  </Button>
                  </>
                )}
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
        onClose={() => {
          setShowCreateDeck(false)
          setEditDeck(null);
        }}
        subject={subject}
        editDeck={editDeck}
        onSubmit={(deck) => {
          console.log('New deck created:', deck);
          refreshDecks();
          setShowCreateDeck(false);
          setEditDeck(null);
        }}
      />
    </Stack>
  );
}

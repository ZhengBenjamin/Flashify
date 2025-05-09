/**
 * AdminUserDashboard component for managing a user's subjects and decks.
 * Displays a list of subjects and their associated decks for the selected user.
 * @param {Object} props - Component props.
 * @param {Object} props.user - The user object containing user details.
 * @returns {JSX.Element} The AdminUserDashboard layout.
 */

import { useState, useEffect } from 'react';
import { Card, Title, Text, Stack, Grid, Button } from '@mantine/core';
import { UserContext } from '../../../App';
import CreateFlashcards from './CreateFlashcards';
import Flashcards from './Flashcards';

export default function AdminUserDashboard({ user }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [hoveredDeckId, setHoveredDeckId] = useState(null);
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [editDeck, setEditDeck] = useState(null);

  useEffect(() => {
    if (user) {
      fetchSubjects();
    }
  }, [user]);

  useEffect(() => {
    if (user && selectedSubject) {
      fetchDecks();
    }
  }, [user, selectedSubject]);

  /**
   * Fetches all subjects for the selected user.
   */
  const fetchSubjects = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/subject/${user.username}`);
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  /**
   * Fetches all decks for the selected subject and user.
   */
  const fetchDecks = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/deck?username=${user.username}&subject_id=${selectedSubject.subject_id}`
      );
      const data = await res.json();
      setFlashcardDecks(data);
    } catch (err) {
      console.error("Error fetching decks:", err);
    }
  };

  /**
   * Handles the selection of a deck.
   * @param {number} deckId - The ID of the selected deck.
   */
  const handleDeckClick = (deckId) => {
    setSelectedDeckId(deckId);
  };

  /**
   * Handles the deletion of a deck.
   * @param {number} deckId - The ID of the deck to delete.
   */
  const handleDelete = (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      setFlashcardDecks((prev) => prev.filter((deck) => deck.deck_id !== deckId));
    }
  };

  /**
   * Handles the editing of a deck.
   * @param {number} deckId - The ID of the deck to edit.
   */
  const handleEdit = (deckId) => {
    const deckToEdit = flashcardDecks.find((deck) => deck.deck_id === deckId);
    setEditDeck(deckToEdit);
    setShowCreateDeck(true);
  };

  /**
   * Handles navigation back to the subjects view.
   */
  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setFlashcardDecks([]);
  };

  if (selectedDeckId) {
    return (
      <UserContext.Provider value={{ username: user.username }}>
        <Flashcards deckId={selectedDeckId} />
      </UserContext.Provider>
    );
  }

  return (
    <Stack spacing="md">
      <Title order={3}>User: {user.username}</Title>

      {!selectedSubject ? (
        <>
          <Title order={4}>Subjects</Title>
          <Grid gutter={'md'}>
            {subjects && subjects.length > 0 ? (
              subjects.map((subject) => (
                <Grid.Col key={subject.subject_id} span={6}>
                  <Card
                    shadow="md"
                    p="lg"
                    radius="md"
                    withBorder
                    style={{
                      backgroundColor: `#${subject.color.toString(16).padStart(6, '0')}`,
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    <Title order={4}>{subject.subjectName}</Title>
                  </Card>
                </Grid.Col>
              ))
            ) : (
              <Grid.Col span={12}>
                <Title order={3}>No subjects found for this user.</Title>
              </Grid.Col>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Title order={4}>{selectedSubject.subjectName} Decks</Title>
          <Button onClick={() => setShowCreateDeck(true)}>Create Flashcard Deck</Button>
          <Button variant="subtle" color="gray" onClick={handleBackToSubjects} mt="sm">
            ← Back to Subjects
          </Button>
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
              <Text>No flashcard decks in this subject</Text>
            )}
          </Grid>

          <CreateFlashcards
            opened={showCreateDeck}
            onClose={() => {
              setShowCreateDeck(false);
              setEditDeck(null);
            }}
            subject={selectedSubject}
            editDeck={editDeck}
            onSubmit={() => {
              fetchDecks();
              setShowCreateDeck(false);
              setEditDeck(null);
            }}
          />
        </>
      )}
    </Stack>
  );
}

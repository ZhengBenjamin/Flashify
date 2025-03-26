import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, Container, Group, Text, Button, Flex } from '@mantine/core';
import { UserContext } from '../../../App'; // adjust the import path as needed
import classes from '../css/Flashcards.module.css';
import Summary from "./Summary.jsx";

export default function Flashcards({ deckId, flashcardsData: initialFlashcardsData = [], initialResponses = [] }) {
    const { username } = useContext(UserContext);

    // State for flashcards, error and loading status
    const [flashcardsData, setFlashcardsData] = useState(initialFlashcardsData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [correctResponses, setCorrectResponses] = useState(initialResponses);
    const [showSummary, setShowSummary] = useState(false);

    // Fetch flashcards from the backend when username and deckId are available
    useEffect(() => {
        if (username && deckId && flashcardsData.length === 0) {
            const url = `http://localhost:4000/api/card?username=${username}&deck_id=${deckId}`;
            console.log("Fetching flashcards from URL:", url);
            setLoading(true);
            axios.get(url)
                .then(response => {
                    console.log("API response:", response.data);
                    // Directly use the returned array of flashcards
                    setFlashcardsData(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.response?.data?.error || "Error fetching flashcards");
                    setLoading(false);
                });
        }
    }, [username, deckId, flashcardsData.length]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const undo = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length);
        setCorrectResponses(correctResponses.slice(0, -1));
        console.log("undo");
    };

    const handleNext = (correct) => {
        setIsFlipped(false);
        setCorrectResponses([...correctResponses, correct]);

        if (currentCardIndex === flashcardsData.length - 1) {
            setShowSummary(true);
        } else {
            setCurrentCardIndex((prevIndex) => prevIndex + 1);
        }
    };

    if (showSummary) {
        return <Summary deckId={deckId} remainingFlashcards={flashcardsData} correctResponses={correctResponses} />;
    }

    // Render loading, error or no data messages as needed
    if (loading) {
        return (
            <Container className={classes.container}>
                <Text>Loading flashcards...</Text>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className={classes.container}>
                <Text>{error}</Text>
            </Container>
        );
    }

    if (flashcardsData.length === 0) {
        return (
            <Container className={classes.container}>
                <Text>No flashcards available</Text>
            </Container>
        );
    }

    const currentCard = flashcardsData[currentCardIndex];

    return (
        <Container className={classes.container}>
            <Group position="right" justify="space-between">
                <Text>
                    Flashcard: {currentCardIndex + 1}/{flashcardsData.length}
                </Text>
                {currentCardIndex > 0 && (
                    <Text>
                        Correct: {correctResponses.filter(response => response === 1).length}/
                        {correctResponses.length} = {(100.0 * (correctResponses.filter(response => response === 1).length)
                        / correctResponses.length).toFixed(2)}%
                    </Text>
                )}
            </Group>

            <Group position="center">
                <Card className={classes.card} onClick={handleFlip}>
                    <Text className={classes.text}>
                        {isFlipped ? currentCard.back : currentCard.front}
                    </Text>
                </Card>
            </Group>

            <Flex justify="space-between" mt="md">
                <Flex justify="center" gap="md">
                    <Button className={classes.button} onClick={() => handleNext(0)}>
                        ❌ Don't Know
                    </Button>
                    <Button className={classes.button} onClick={() => handleNext(1)}>
                        ✅ I Know it
                    </Button>
                </Flex>

                {currentCardIndex > 0 && (
                    <Button className={classes.button} onClick={undo}>
                        ↩️ Undo
                    </Button>
                )}
            </Flex>
        </Container>
    );
}
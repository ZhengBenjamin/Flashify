import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, Container, Group, Text, Button, Flex } from '@mantine/core';
import { UserContext } from '../../../App'; // adjust the import path as needed
import classes from '../css/Flashcards.module.css';
import Summary from "./Summary.jsx";

export default function Flashcards({ deckId, correctResponses: initialCorrectResponses = [], toStudy: initialToStudy = [] }) {
    const { username } = useContext(UserContext);

    // State for flashcards, error and loading status
    const [flashcardsData, setFlashcardsData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Indexing and Flipping Flashcards
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // State for tracking correct responses and showing summary
    const [correctResponses, setCorrectResponses] = useState(initialCorrectResponses);
    const [showSummary, setShowSummary] = useState(false);

    // Prevents checking for initialCorrectResponses more than once
    const [firstLoad, setFirstLoad] = useState(true);

    // Fetch flashcards from the backend when username and deckId are available
    useEffect(() => {
        if (username && deckId && flashcardsData.length === 0) {
            const url = `http://localhost:4000/api/card?username=${username}&deck_id=${deckId}`;
            setLoading(true);
            axios.get(url)
                .then(response => {
                    setFlashcardsData(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.response?.data?.error || "Error fetching flashcards");
                    setLoading(false);
                });
        }
    }, [username, deckId, flashcardsData.length]);

    useEffect(() => {
        if (firstLoad && initialCorrectResponses.length > 0 && flashcardsData.length > 0) {
            // Print out each array for debugging
            // console.log("initial correct responses: " + initialCorrectResponses);
            // console.log("flashcards data: " + flashcardsData);
            // console.log("correct responses: " + correctResponses);

            // Filter out flashcards that were answered correctly
            const filteredFlashcards = flashcardsData.filter((_, index) => initialCorrectResponses[index] !== 1);
            const filteredCorrectResponses = initialCorrectResponses.filter(response => response !== 1);

            /*
            console.log("states: " + initialCorrectResponses);
            console.log("filtered flashcards: " + filteredFlashcards);
            console.log("filtered correct responses: " + filteredCorrectResponses);
            */

            // Update the state with the filtered flashcards and correct responses
            setFlashcardsData(filteredFlashcards);
            setCorrectResponses(filteredCorrectResponses);

            // Set firstLoad to false to prevent re-running this effect
            setFirstLoad(false);
        }
    }, [firstLoad, initialCorrectResponses, flashcardsData]);

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

    const handleContinue = () => {
        const incorrectFlashcards = flashcardsData.filter((_, index) => correctResponses[index] === 0);
        setFlashcardsData(incorrectFlashcards);
        setCorrectResponses([]);
        setCurrentCardIndex(0);
        setShowSummary(false);
    };

    if (showSummary) {
        return <Summary deckId={deckId} remainingFlashcards={flashcardsData} correctResponses={correctResponses} onContinue={handleContinue} />;
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
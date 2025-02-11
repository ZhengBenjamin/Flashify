import { useState } from 'react';
import { Card, Container, Group, Text, Button } from '@mantine/core';
import classes from '../css/Flashcards.module.css';

// TODO: Use the backend to fetch flashcards data
const flashcardsData = [
    { front: 'Front of Card 1', back: 'Back of Card 1' },
    { front: 'Front of Card 2', back: 'Back of Card 2' },
    { front: 'Front of Card 3', back: 'Back of Card 3' },
];

export default function Flashcards() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length);
    };

    const currentCard = flashcardsData[currentCardIndex];

    return (
        <Container className={classes.container}>
            <Group position="center">
                <Card className={classes.card} onClick={handleFlip}>
                    <Text>{isFlipped ? currentCard.back : currentCard.front}</Text>
                </Card>
            </Group>
            <Group position="center" mt="md">
                <Button onClick={handlePrev}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
            </Group>
        </Container>
    );
}
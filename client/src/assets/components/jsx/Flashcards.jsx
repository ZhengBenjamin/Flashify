import {useState} from 'react';
import {Card, Container, Group, Text, Button, Flex} from '@mantine/core';
import classes from '../css/Flashcards.module.css';

// TODO: Use the backend to fetch flashcards data
const flashcardsData = [
    {front: 'Front of Card 1', back: 'Back of Card 1'},
    {front: 'Front of Card 2', back: 'Back of Card 2'},
    {front: 'Front of Card 3', back: 'Back of Card 3'},
    {front: 'Front of Card 4', back: 'Back of Card 4'},
    {front: 'Front of Card 5', back: 'Back of Card 5'},
    {front: 'Front of Card 6', back: 'Back of Card 6'},
];

const correctResponses = [];

export default function Flashcards() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleDontKnow = () => {
        correctResponses.push(0);
        handleNext();
    }

    const handleKnowIt = () => {
        correctResponses.push(1);
        handleNext();
    }

    const undo = () => {
        console.log("Undo");
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length);
    }

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
    };

    const currentCard = flashcardsData[currentCardIndex];

    return (
        <Container className={classes.container}>
            <Group position={"right"} justify={"space-between"}>
                <p>Flashcard: {currentCardIndex + 1}/{flashcardsData.length}</p>
                {currentCardIndex > 0 && (
                    <p>Correct: {correctResponses.filter((response) => response === 1).length}/
                        {correctResponses.length} = {(100.0 * (correctResponses.filter((response) => response === 1).length)
                            / correctResponses.length).toFixed(2)}%</p>)}
            </Group>

            <Group position={"center"}>
                <Card className={classes.card} onClick={handleFlip}>
                    <Text className={classes.text}>{isFlipped ? currentCard.back : currentCard.front}</Text>
                </Card>
            </Group>

            <Flex justify={"space-between"} mt={"md"}>
                <Flex justify={"center"} gap={"md"}>
                    <Button className={classes.button} onClick={handleDontKnow}>❌ Don&#39;t Know</Button>
                    <Button className={classes.button} onClick={handleKnowIt}>✅ I Know it</Button>
                </Flex>

                {currentCardIndex > 0 && (<Button className={classes.button} onClick={undo}>↩️ Undo</Button>)}
            </Flex>

        </Container>
    );
}
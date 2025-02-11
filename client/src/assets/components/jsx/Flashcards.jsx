import {useState} from 'react';
import {Card, Container, Group, Text, Button, Flex} from '@mantine/core';
import classes from '../css/Flashcards.module.css';

// TODO: Use the backend to fetch flashcards data
const flashcardsData = [
    {front: 'Front of Card 1', back: 'Back of Card 1'},
    {front: 'Front of Card 2', back: 'Back of Card 2'},
    {front: 'Front of Card 3', back: 'Back of Card 3'},
];

export default function Flashcards() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleDontKnow = () => {
        console.log("Don't Know");
        handleNext();
    }

    const handleKnowIt = () => {
        console.log("Know It");
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
            <Group position={"right"}>
                <p>Flashcard: {currentCardIndex + 1}/{flashcardsData.length}</p>
            </Group>

            <Group position={"center"}>
                <Card className={classes.card} onClick={handleFlip}>
                    <Text>{isFlipped ? currentCard.back : currentCard.front}</Text>
                </Card>
            </Group>

            <Flex justify={"space-between"} mt={"md"}>
                <Flex justify={"center"} gap={"md"}>
                    <Button className={classes.button} onClick={handleDontKnow}>❌ Don&#39;t Know</Button>
                    <Button className={classes.button} onClick={handleKnowIt}>✅ I Know it</Button>
                </Flex>

                {currentCardIndex > 0 && (
                    <Button className={classes.button} onClick={undo}>↩️ Undo</Button>
                )}
            </Flex>

        </Container>
    );
}
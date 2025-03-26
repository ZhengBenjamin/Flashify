import { useState } from 'react';
import { Container, Text, Title, Button, Flex } from '@mantine/core';
import classes from '../css/Flashcards.module.css';
import Flashcards from './Flashcards.jsx';

export default function Summary({ deckId, remainingFlashcards, correctResponses }) {
    const [showFlashcards, setShowFlashcards] = useState(false);
    const [flashcardsData, setFlashcardsData] = useState([]);
    const [responses, setResponses] = useState([]);

    const total = correctResponses.length;
    const correct = correctResponses.filter((response) => response === 1).length;

    const next = () => {
        if (remainingFlashcards.length === 0) {
            restart();
        } else {
            setFlashcardsData(remainingFlashcards);
            setResponses(correctResponses);
            setShowFlashcards(true);
        }
    };

    const restart = () => {
        setFlashcardsData(remainingFlashcards);
        setResponses([]);
        setShowFlashcards(true);
    };

    if (showFlashcards) {
        return <Flashcards deckId={deckId} flashcardsData={flashcardsData} initialResponses={responses} />;
    }

    return (
        <Container className={classes.container}>
            <Flex direction="column" align={"center"} spacing={"md"}>
                <Title order={1}>Summary:</Title>
                <br/>
                <Text>Correct: {correct} / {total} = {(100.0 * correct / total).toFixed(2)}%</Text>
                <br/><br/>

                {correct !== total && (<Button className={classes.button} onClick={next}>continue →</Button>)}
                <br/>
                <Button className={classes.button} onClick={restart}>restart progress 🔄</Button>
            </Flex>
        </Container>
    );
}
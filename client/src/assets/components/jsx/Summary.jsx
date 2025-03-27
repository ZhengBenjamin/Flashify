import { useState } from 'react';
import { Container, Text, Title, Button, Flex } from '@mantine/core';
import classes from '../css/Flashcards.module.css';
import Flashcards from './Flashcards.jsx';

export default function Summary({ deckId, remainingFlashcards, correctResponses }) {
    const [showFlashcards, setShowFlashcards] = useState(false);
    const [flashcardsData, setFlashcardsData] = useState([]);
    const [responses, setResponses] = useState([]);

    const [restartBool, setRestartBool] = useState(false);

    const total = correctResponses.length;
    const correct = correctResponses.filter((response) => response === 1).length;

    const next = () => {
        const newFlashcardsData = remainingFlashcards.filter((_, index) => correctResponses[index] === 0);
        setFlashcardsData(newFlashcardsData);
        setResponses(correctResponses.filter((response) => response === 0));
        setShowFlashcards(true);
        setRestartBool(false);
    };

    const restart = () => {
        setFlashcardsData(remainingFlashcards);
        setResponses([]);
        setShowFlashcards(true);
        setRestartBool(true);
    };

    if (showFlashcards) {
        // { deckId, correctResponses: initialCorrectResponses = [], toStudy: initialToStudy = [] }
        // return <Flashcards deckId={deckId} flashcardsData={flashcardsData} initialResponses={responses} />;
        if (restartBool) {
            return <Flashcards deckId={deckId} flashcardsData={flashcardsData} correctResponses={[]} toStudy={flashcardsData} />;
        }
        return <Flashcards deckId={deckId} flashcardsData={flashcardsData} correctResponses={correctResponses} toStudy={remainingFlashcards} />;
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
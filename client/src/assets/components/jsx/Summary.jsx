import {useLocation, useNavigate} from 'react-router-dom';
import {Container, Text, Title, Button, Flex} from '@mantine/core';
import classes from "../css/Flashcards.module.css";

export default function Summary() {
    // React Router
    const navigate = useNavigate();
    const location = useLocation();

    // Flashcards
    const flashcardsData = location.state?.flashcardsData || [];
    const allFlashcards = location.state.allFlashcards;

    // Correct/Incorrect Responses
    const correctResponses = location.state?.correctResponses || [];
    const total = correctResponses.length;
    const correct = correctResponses.filter((response) => response === 1).length;

    // Continue Studying
    const next = () => {
        const newFlashcardsData = flashcardsData.filter((_, index) => correctResponses[index] === 0);

        if (newFlashcardsData.length === 0) {
            restart();
            return;
        }

        navigate('/flashcards', {state: {newFlashcardsData: newFlashcardsData, correctResponses: [], allFlashcards: allFlashcards}});
    }

    // Restart Progress
    const restart = () => {
        navigate('/flashcards', {state: {newFlashcardsData: allFlashcards, correctResponses: [], allFlashcards: allFlashcards}});
    }


    return (
        <Container className={classes.container}>
            <Flex direction={"column"} align={"center"} spacing={"md"}>
                <Title order={1}>Summary:</Title>
                <br/>
                <Text>Correct: {correct} / {total} = {(100.0 * correct / total).toFixed(2)}%</Text>
                <br/>

            </Flex>

            <Flex align={"center"} spacing={"md"}>
                {correct !== total && (<Button className={classes.button} onClick={next}>continue →</Button>)}
                <Button className={classes.button} onClick={restart}>restart progress 🔄</Button>
            </Flex>



        </Container>
    );
}
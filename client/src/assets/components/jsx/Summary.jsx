import {useLocation, useNavigate} from 'react-router-dom';
import {Container, Text, Title, Button, Flex} from '@mantine/core';
import classes from "../css/Flashcards.module.css";

export default function Summary() {
    const location = useLocation();
    const flashcardsData = location.state?.flashcardsData || [];
    const correctResponses = location.state?.correctResponses || [];
    const total = correctResponses.length;
    const correct = correctResponses.filter((response) => response === 1).length;

    const allFlashcards = location.state.allFlashcards;


    const navigate = useNavigate();

    const next = () => {
        const newFlashcardsData = flashcardsData.filter((_, index) => correctResponses[index] === 0);

        //console.log("newFlashcardsData: ", newFlashcardsData);
        //console.log("correctResponses: ", correctResponses);
        //console.log("old flashcardsData: ", flashcardsData);



        if (newFlashcardsData.length === 0) {
            restart();
            return;
        }

        navigate('/flashcards', {state: {newFlashcardsData: newFlashcardsData, correctResponses: [], allFlashcards: allFlashcards}});
    }

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
                <Button className={classes.button} onClick={next}>continue →</Button>
                <Button className={classes.button} onClick={restart}>restart progress 🔄</Button>
            </Flex>



        </Container>
    );
}
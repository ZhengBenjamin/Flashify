import {useLocation} from 'react-router-dom';
import {Container, Text, Title, Button, Flex} from '@mantine/core';
import classes from "../css/Flashcards.module.css";

export default function Summary() {
    const location = useLocation();
    const correctResponses = location.state?.correctResponses || [];
    // const { correctResponses, flashcardsData } = location.state;
    const total = correctResponses.length;
    const correct = correctResponses.filter((response) => response === 1).length;

    return (
        <Container className={classes.container}>
            <Flex direction={"column"} align={"center"} spacing={"md"}>
                <Title order={1}>Summary:</Title>
                <Text>Correct: {correct} / {total} = {(100.0 * correct / total).toFixed(2)}%</Text>
            </Flex>





        </Container>
    );
}
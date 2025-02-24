import {useState} from 'react';
import {Card, Container, Group, Text, Button, Flex} from '@mantine/core';
import classes from '../css/Flashcards.module.css';
import {useLocation, useNavigate} from "react-router-dom";

const defaultFlashcardsData = [
    {front: 'Front of Card 1', back: 'Back of Card 1'},
    {front: 'Front of Card 2', back: 'Back of Card 2'},
    {front: 'Front of Card 3', back: 'Back of Card 3'},
    {front: 'Front of Card 4', back: 'Back of Card 4'},
    {front: 'Front of Card 5', back: 'Back of Card 5'},
    {front: 'Front of Card 6', back: 'Back of Card 6'},
];

export default function Flashcards() {
    const location = useLocation();
    const navigate = useNavigate();

    const flashcardsData = location.state?.newFlashcardsData || defaultFlashcardsData;

    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [correctResponses, setCorrectResponses] = useState(location.state?.correctResponses || []);
    let lastResponse = 0;

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleDontKnow = () => {
        lastResponse = 0;
        // const updatedResponses = [...correctResponses, 0];
        // setCorrectResponses(updatedResponses);
        // console.log(correctResponses);
        // handleNext(updatedResponses);
        handleNext();
    }

    const handleKnowIt = () => {
        lastResponse = 1;
        /*
        const updatedResponses = [...correctResponses, 1];
        setCorrectResponses(updatedResponses);
        console.log(correctResponses);
         */
        handleNext();
    }

    const undo = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length);
    }

    const handleNext = () => {
        setIsFlipped(false);
        setCorrectResponses([...correctResponses, lastResponse]);
        console.log([...correctResponses, lastResponse]);

        if (currentCardIndex === flashcardsData.length - 1) {
            navigate('/summary', {state: {correctResponses: [...correctResponses, lastResponse], flashcardsData: flashcardsData, allFlashcards: defaultFlashcardsData}});
        } else {
            setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
        }
    };

    const currentCard = flashcardsData[currentCardIndex];

    return (
        <Container className={classes.container}>
            <Group position={"right"} justify={"space-between"}>
                <Text>Flashcard: {currentCardIndex + 1}/{flashcardsData.length}</Text>
                {currentCardIndex > 0 && (
                    <Text>Correct: {correctResponses.filter((response) => response === 1).length}/
                        {correctResponses.length} = {(100.0 * (correctResponses.filter((response) => response === 1).length)
                            / correctResponses.length).toFixed(2)}%</Text>)}
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
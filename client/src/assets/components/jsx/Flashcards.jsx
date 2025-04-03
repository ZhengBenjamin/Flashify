import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Card, Container, Group, Text, Button, Flex, Title} from '@mantine/core';
import {UserContext} from '../../../App'; // adjust the import path as needed
import classes from '../css/Flashcards.module.css';

// eslint-disable-next-line react/prop-types
export default function Flashcards({deckId}) {
    // State variables
    const {username} = useContext(UserContext);
    const [flashcardsData, setFlashcardsData] = useState([]);

    // Status variables
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Variables for flashcard logic
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [learnedTerms, setLearnedTerms] = useState([]);
    const [termsToStudy, setTermsToStudy] = useState(flashcardsData);
    const [resultsThisRound, setResultsThisRound] = useState([]);

    // Fetch flashcards from the backend when username and deckId are available
    useEffect(() => {
        if (username && deckId && flashcardsData.length === 0) {
            const url = `http://localhost:4000/api/card?username=${username}&deck_id=${deckId}`;
            setLoading(true);
            axios.get(url)
                .then(response => {
                    setFlashcardsData(response.data);
                    setTermsToStudy(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.response?.data?.error || "Error fetching flashcards");
                    setLoading(false);
                });
        }
    }, [username, deckId, flashcardsData.length]);

    /*** Studying Flashcard Logic ***/
        // Function to handle flipping the card
    const flipCard = () => setFlipped(!flipped);

    // Function to handle correct/incorrect answer
    const handleAnswer = (isCorrect) => {


        // Update the progress in the current round
        setResultsThisRound(prevResults => {
            const updatedResults = [...prevResults, isCorrect];

            if (currentCardIndex + 1 === termsToStudy.length)
                updateLearnedTerms(updatedResults);

            return updatedResults;
        });

        // move to the next card
        setCurrentCardIndex(currentCardIndex + 1);
        setFlipped(false);

        // Check if we have reached the end of the flashcards
        console.log('index: ' + (1 + currentCardIndex) + ', length: ' + termsToStudy.length);
        console.log('results: ' + (resultsThisRound.length) + ', length: ' + termsToStudy.length);
        console.log('results: ' + resultsThisRound);
        // if (currentCardIndex + 1 === termsToStudy.length)
        //    updateLearnedTerms(isCorrect);
    };

    const undoAnswer = () => {
        // Remove the last answer from the results
        setResultsThisRound(resultsThisRound.slice(0, -1));

        // move back to the previous card
        setCurrentCardIndex(currentCardIndex - 1);
        setFlipped(false);
    }

    /*** Summary Screen Logic ***/

        // Display summary screen
    const [showSummary, setShowSummary] = useState(false);

    // Results from this round

    const updateLearnedTerms = (results) => {
        // Update the learned terms based on the results of this round
        const newLearnedTerms = [...learnedTerms];
        const newTermsToStudy = [...termsToStudy];

        console.log('number: ' + resultsThisRound.length);

        for (let i = 0; i < results.length; i++) {
            if (results[i]) {
                newLearnedTerms.push(termsToStudy[i]);
                newTermsToStudy.splice(i, 1);
            }
        }
        setLearnedTerms(newLearnedTerms);
        setTermsToStudy(newTermsToStudy);

        console.log('learned terms: ' + newLearnedTerms);
        console.log('terms to study: ' + newTermsToStudy);

        // Now show the summary screen
        setShowSummary(true);
    }

    const continueStudying = () => {
        setCurrentCardIndex(0);
        setFlipped(false);
        setResultsThisRound([]);
        setShowSummary(false);
    }

    const restartFlashcards = () => {
        // Reset the deck
        setLearnedTerms([]);
        setTermsToStudy(flashcardsData);

        // Continue studying
        continueStudying();
    }


    /*** Render Flashcards ***/

    /**
     * Loading state
     */
    if (loading) {
        return (<Container className={classes.container}><Text>Loading flashcards...</Text></Container>);
    }

    /**
     * No flashcards state
     */
    if (flashcardsData.length === 0) {
        return (<Container className={classes.container}><Text>No flashcards available</Text></Container>);
    }

    /**
     * Error state
     */
    if (error) {
        return (<Container className={classes.container}><Text>Error</Text></Container>);
    }



    /**
     * Summary screen
     */

    // console.log('results this round: ' + resultsThisRound);
    // console.log('number correct: ' + resultsThisRound.filter(response => response).length);

    if (showSummary) {

        // console.log('learned terms: ' + learnedTerms);

        return (
            <Container className={classes.container}>
                <Flex direction="column" align={"center"} spacing={"md"}>
                    <Title order={1}>Summary:</Title>
                    <br/>
                    <h6>Results this round</h6>
                    <Text>{resultsThisRound.filter(response => response).length} / {resultsThisRound.length} =
                        {(100.0 * resultsThisRound.filter(response => response).length / resultsThisRound.length).toFixed(2)}%</Text>
                    <br/><br/>



                    <h6>Results overall</h6>
                    <Text>{learnedTerms.length} / {flashcardsData.length} =
                        {(learnedTerms.length / flashcardsData.length * 100.0).toFixed(2)}%</Text>
                    <br/><br/>

                    {learnedTerms.length < flashcardsData.length &&
                        (<Button className={classes.button} onClick={continueStudying}>continue →</Button>)}
                    <br/>
                    <Button className={classes.button} onClick={restartFlashcards}>restart progress 🔄</Button>
                </Flex>
            </Container>
        );
    }

    /**
     * Flashcard screen (default)
     */
    return (
        <Container className={classes.container}>
            <Group position="right" justify="space-between">
                <Text>
                    Flashcard: {currentCardIndex + 1}/{flashcardsData.length}
                </Text>
                {currentCardIndex > 0 && (
                    <Text>
                        Correct: { resultsThisRound.filter(response => response).length }/
                        {resultsThisRound.length} = {(100.0 * (resultsThisRound.filter(response => response).length)
                        / resultsThisRound.length).toFixed(2)}%

                    </Text>
                )}
            </Group>

            <Group position="center">
                <Card className={classes.card} onClick={flipCard}>
                    <Text className={classes.text}>
                        {flipped ? termsToStudy[currentCardIndex].back : termsToStudy[currentCardIndex].front}
                    </Text>
                </Card>
            </Group>

            <Flex justify="space-between" mt="md">
                <Flex justify="center" gap="md">
                    <Button className={classes.button} onClick={() => handleAnswer(false)}>
                        ❌ Don&#39;t Know
                    </Button>
                    <Button className={classes.button} onClick={() => handleAnswer(true)}>
                        ✅ I Know it
                    </Button>
                </Flex>

                {currentCardIndex > 0 && (
                    <Button className={classes.button} onClick={undoAnswer}>
                        ↩️ Undo
                    </Button>
                )}
            </Flex>
        </Container>
    );
}




import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Card, Container, Group, Text, Button, Flex, Title} from '@mantine/core';
import {UserContext} from '../../../App'; // adjust the import path as needed
import classes from '../css/Flashcards.module.css';

// eslint-disable-next-line react/prop-types
export default function Flashcards({deckId}) {
    /*** Flashcard Logic Fields ***/

        // State variables
    const {username} = useContext(UserContext);
    const [flashcardsData, setFlashcardsData] = useState([]);

    // Status variables
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Flashcard logic variables
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    // Variables for tracking user progress
    const [learnedTerms, setLearnedTerms] = useState([]);
    const [termsToStudy, setTermsToStudy] = useState([]);
    const [resultsThisRound, setResultsThisRound] = useState([]);

    /**
     * Fetch flashcards from the backend when username and deckId are available
     */
    useEffect(() => {
        // Fetch flashcards only if username and deckId are available
        if (username && deckId && flashcardsData.length === 0) {
            const url = `http://localhost:4000/api/card?username=${username}&deck_id=${deckId}`;
            setLoading(true);
            axios.get(url)
                .then(response => {
                    // Set the flashcards data and terms to study with the data from the backend
                    const tmp = response.data;
                    setFlashcardsData(response.data);
                    setTermsToStudy(shuffle(tmp));
                    // setTermsToStudy(tmp);
                    // setTermsToStudy(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.response?.data?.error || "Error fetching flashcards");
                    setLoading(false);
                });
            // randomizeFlashcards();

        }
    }, [username, deckId, flashcardsData.length]);

    /*** Studying Flashcard Logic ***/

        // showSummary must be placed here to avoid an error
    const [showSummary, setShowSummary] = useState(false);

    /**
     * Flips the card to show the other side
     */
    const flipCard = () => setFlipped(!flipped);

    // Function to handle correct/incorrect answer
    const handleAnswer = (isCorrect) => {
        // Update the progress in the current round
        setResultsThisRound(prevResults => {
            const updatedResults = [...prevResults, isCorrect];

            // If the last card was answered, update results & show the summary screen
            if (currentCardIndex + 1 === termsToStudy.length)
                updateLearnedTerms(updatedResults);

            return updatedResults;
        });

        // move to the next card
        setCurrentCardIndex(currentCardIndex + 1);
        setFlipped(false);
    };

    /**
     * If a user wants to undo their last answer, remove the last answer from the results
     */
    const undoAnswer = () => {
        // Remove the last answer from the results
        setResultsThisRound(resultsThisRound.slice(0, -1));

        // move back to the previous card
        setCurrentCardIndex(currentCardIndex - 1);
        setFlipped(false);
    }

    /**
     * Randomizes the order of the flashcards
     *
     * @param cards the array of flashcards to shuffle
     */
    const shuffle = (cards) => {
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /*** Summary Screen Logic ***/

    /**
     * Update the learned terms based on the results of this round
     *
     * @param results the results of this round
     */
    const updateLearnedTerms = (results) => {
        // Update the learned terms based on the results of this round
        const newLearnedTerms = [...learnedTerms];

        const newTermsToStudy = termsToStudy.filter((_, index) => {
            if (results[index]) {
                newLearnedTerms.push(termsToStudy[index]);
                return false;
            }
            return true;
        });

        // Update the state with the new learned terms and terms to study
        setLearnedTerms(newLearnedTerms);
        setTermsToStudy(shuffle(newTermsToStudy));

        // Display the summary screen
        setShowSummary(true);
    }

    /**
     * Continue studying after the summary screen
     */
    const continueStudying = () => {
        // Reset the learned terms and results for the next round
        setCurrentCardIndex(0);
        setFlipped(false);
        setResultsThisRound([]);
        setShowSummary(false);
    }

    /**
     * Restart the flashcards and the progress from the user
     */
    const restartFlashcards = () => {
        // Reset the deck to fetch the flashcards again
        setLearnedTerms([]);
        setFlashcardsData([]);
        setTermsToStudy([]);

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

    if (showSummary) {
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
                    Flashcard: {currentCardIndex + 1}/{termsToStudy.length}
                </Text>
                {currentCardIndex > 0 && (
                    <Text>
                        Correct: {resultsThisRound.filter(response => response).length}/
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
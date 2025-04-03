import { useState, useContext } from 'react';
import { Modal, Container, Group, Card, Text, Button, Checkbox } from '@mantine/core';
import classes from '../css/CreateFlashcards.module.css';
import { UserContext } from '../../../App'; // Import UserContext

export default function DeleteFlashcards({ opened, onClose }) {

    const [decks, setDecks] = useState([]); // State to hold the list of decks

    // States
    const [submitConfirmation, setSubmitConfirmation] = useState(false);

    const { username } = useContext(UserContext); // Get the username from global state


    const handleCancel = () => {
        console.log("Cancel button clicked");
    }

    const handleSubmit = () => {

        // Set the submit confirmation to true
        setSubmitConfirmation(true);
    };

    if (decks.length === 0) {
        return (
            <Modal
                opened={opened}
                onClose={onClose}
                title="Create Flashcard Deck"
                size="xl"
                overlayOpacity={0.55}
                overlayBlur={3}
                centered
                className={classes.modal}
            >
                <Container className={classes.container}>
                    <Text
                        placeholder="No decks available to delete."
                        className={classes.titleInput}
                    />
                </Container>
            </Modal>);
    }

    if (submitConfirmation) {
        return (
            <Modal
                opened={submitConfirmation}
                onClose={() => setSubmitConfirmation(false)}
                title="Delete confirmation"
                size="xl"
                overlayOpacity={0.55}
                overlayBlur={3}
                centered
                className={classes.modal}
                >
                <Container className={classes.container}>
                    <Text
                        placeholder="Are you sure you want to delete the following decks?"
                        className={classes.titleInput}
                    />
                </Container>
            </Modal>);
    }

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Create Flashcard Deck"
            size="xl"
            overlayOpacity={0.55}
            overlayBlur={3}
            centered
            className={classes.modal}
        >
            <Container className={classes.container}>
                <Text
                    placeholder="Select from the following decks to delete:"
                    className={classes.titleInput}
                />

                {decks.forEach((deck) => (
                    <Card key={deck.deck_id} className={classes.card}>
                        <Checkbox
                            label={deck.title}
                            className={classes.checkbox}
                        />
                        <Text className={classes.text}>
                            {deck.description}
                        </Text>
                    </Card>
                ))}



                <Group position="center" className={classes.saveGroup}>
                    <Button className={classes.button} onClick={handleCancel}>
                        Cancel
                    </Button>

                    <Button className={classes.button} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Group>
            </Container>
        </Modal>
    );
}

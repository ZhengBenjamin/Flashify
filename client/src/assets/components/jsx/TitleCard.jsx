/**
 * TitleCard component for the front page.
 * Displays a welcome message and a button to navigate to the login page.
 * @returns {JSX.Element} The TitleCard layout.
 */

import { Button, Container, List, Text, Title, Group, Image } from '@mantine/core';
import classes from '../css/TitleCard.module.css';

export default function TitleCard() {
  return (
    <Container size="lg">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Welcome to Flashify!
          </Title>
          <Text c="dimmed" mt="md">
            Your go-to platform for creating and managing flashcards effortlessly! 
            Whether you're studying for exams, mastering a new language, or just looking to boost your memory, 
            Flashify makes it easy to organize, review, and retain information with interactive and customizable flashcards. 
          </Text>
          <Button radius="xl" size="md" className={classes.control} onClick={() => window.location.href = "/auth"}>
            Log in
          </Button>
        </div>
      </div>
    </Container>
  );
}
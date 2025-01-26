import { Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from '../css/TitleCard.module.css';

export default function TitleCard() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>Flashify</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Something something subtitle
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
          Explore Features
        </Button>
      </Container>
    </div>
  );
}
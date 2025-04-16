import { Container, Image, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import spaced_repetition_icon from '../../images/spaced_repetition_icon.jpg';
import notes_icon from '../../images/notes_icon.jpg';
import study_sets_icon from '../../images/study_sets_icon.jpg';
import collaborative_decks_icon from '../../images/collaborative_decks_icon.jpg';

import classes from '../css/Features.module.css';

const data = [
  {
    image: spaced_repetition_icon,
    title: 'Spaced Repetition',
    description: "Designed to optimize your learning by reviewing at random intervals. Randomizing the order of flashcards keeps your brain engaged and helps you retain information more effectively.",
  },
  {
    image: study_sets_icon,
    title: 'Study Sets',
    description: "Create Sets tailored to your learning needs! Organize flashcards with whatever content you want to streamline your study sessions. Whether you're preparing for a test or reinforcing key concepts, Study Sets keep everything structured and accessible.",
  },
  {
    image: notes_icon,
    title: 'Intuitive Interface',
    description: "Navigate your study tools with ease. Flashify's clean, modern design makes it simple to create, organize, and review content without distractions. Focus more on learning, less on figuring out how to use the platform.",
  },
  {
    image: collaborative_decks_icon,
    title: 'Organize by Subjects',
    description: "Easily organize your flashcards into subjects and decks. Flashify allows you to create, edit, and manage subjects, ensuring your study materials are always structured and accessible.",
  },
];

export default function FeaturesImages() {
  const items = data.map((item) => (
    <div className={classes.item} key={item.image}>
      <ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md">
        <Image src={item.image} />
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text c="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <div size="md" className={classes.wrapper}>
      <Text className={classes.supTitle}>Features</Text>

      <Title className={classes.title} order={2}>
        An All-In-One Platform for ALL your Studying Needs
      </Title>

      <Container p={0}>
        <Text c="dimmed" className={classes.description}>
        Effortlessly create flashcards, organize study sets, take notes, and collaborate with others using powerful tools like spaced repetition and shared decks. 
        Whether you're cramming for exams or mastering new skills, Flashify helps you study smarter, not harder. 🚀
        </Text>
      </Container>

      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </div>
  );
}
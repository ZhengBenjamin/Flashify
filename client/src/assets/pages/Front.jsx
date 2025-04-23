/**
 * Front page of the application.
 * Displays the title card and features of the platform.
 * @returns {JSX.Element} The front page layout.
 */

import TitleCard from '../components/jsx/TitleCard';
import Features from '../components/jsx/Features';
import { Container } from '@mantine/core';

export default function Front() {
  return (
    <Container size="md">
      <TitleCard />
      <Features />
    </Container>
  );
}
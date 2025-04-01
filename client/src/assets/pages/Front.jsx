import TitleCard from '../components/jsx/TitleCard';
import Features from '../components/jsx/Features';
import { Container } from '@mantine/core';

export default function Front() {
    return (
        <Container size="md">
            <TitleCard/>
            <Features/>
        </Container>
    );
}
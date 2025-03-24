import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import classes from '../css/Header.module.css';

const links = [
    { link: '/', label: 'Home', },
    { link: '/auth', label: 'Login'},
    { link: '/flashcards', label: 'Flashcards'},
    { link: '/studyinterface', label: 'Study'},
];

export default function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={classes.link}
        >
            {link.label}
        </Link>
    ));

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <p>Flashify</p>
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>


    );
}

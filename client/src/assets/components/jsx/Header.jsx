import {useState} from 'react';
import { Link } from 'react-router-dom';
import {Burger, Container, Group} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import classes from '../css/Header.module.css';

const links = [
    {label: 'Home', link: '/'},
    {label: 'Login', link: '/auth'},

];

export default function Header() {
    const [opened, {toggle}] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={() => setActive(link.link)}
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

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm"/>
            </Container>
        </header>
    );
}
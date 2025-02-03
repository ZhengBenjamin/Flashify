import { useState } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../css/Header.module.css';

const links = [
  { label: 'Home', link: '#' },
  { label: 'Your Library', link: '#' },
  { label: 'TBD', link: '#' },
  { label: 'TBD', link: '#' },
];

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <nav className={classes.header}>
      <Container size="md" className={classes.inner}>
        <p>Flashify</p>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </nav>
  );
}
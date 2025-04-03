import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../css/Header.module.css';
import { UserContext } from '../../../App';

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  // Base links
  const baseLinks = [
    { label: 'Home', link: '/' },
    { label: 'Study', link: '/studyinterface' },
  ];

  // Auth links 
  const authLink = username
    ? {
        label: 'Sign Out',
        link: '/',
        onClick: () => {
          setUsername('');
          localStorage.removeItem('username');
          navigate('/');
        },
      }
    : { label: 'Login', link: '/auth' };

  const links = [...baseLinks, authLink];

  const items = links.map((link) => {
    // Auth links active state
    const isAuthLink = link.label === 'Login' || link.label === 'Sign Out';
    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
        data-active={isAuthLink ? true : undefined}
        onClick={() => {
          if (link.onClick) link.onClick();
        }}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Link to="/" className={classes.link}>
          Flashify
        </Link>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}

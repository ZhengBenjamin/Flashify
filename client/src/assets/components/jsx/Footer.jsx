import { Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from '../css/Footer.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/auth', label: 'Login' },
];

export default function FooterSimple() {
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
    <div className={classes.footer}>
      <Container className={classes.inner}>
        Flashify
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

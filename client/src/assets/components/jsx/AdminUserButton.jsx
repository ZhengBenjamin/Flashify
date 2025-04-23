/**
 * AdminUserButton component for displaying a user button.
 * Allows the admin to select a user by clicking the button.
 * @param {Object} props - Component props.
 * @param {string} props.user - The username to display.
 * @param {string} props.color - The background color of the button.
 * @param {Function} props.onClick - Function to handle button click.
 * @returns {JSX.Element} The AdminUserButton layout.
 */

import { Card, Group, Text } from '@mantine/core';
import classes from '../css/SubjectButton.module.css';

export default function AdminUserButton(props) {
  return (
    <Card
      radius="xl"
      className={classes.card}
      onClick={props.onClick}
      style={{ backgroundColor: props.color, cursor: 'pointer' }}
    >
      <Group wrap="nowrap" gap={0}>
        <div className={classes.body}>
          <Text className={classes.title}>{props.user}</Text>
        </div>
      </Group>
    </Card>
  );
}

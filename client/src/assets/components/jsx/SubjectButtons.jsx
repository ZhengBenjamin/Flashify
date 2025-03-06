import { Card, Group, Text } from '@mantine/core';
import classes from '../css/SubjectButton.module.css';

export default function SubjectButton(props) {
  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      onClick={props.onClick} 
      style={{ backgroundColor: props.color, cursor: 'pointer' }}  // Indicate it's clickable
    >
      <Group wrap="nowrap" gap={0}>
        <div className={classes.body}>
          <Text className={classes.title}>{props.subject}</Text>
          <Text>{props.description}</Text>
        </div>
      </Group>
    </Card>
  );
}

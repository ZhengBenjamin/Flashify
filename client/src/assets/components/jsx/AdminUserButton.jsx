import { Card, Group, Text } from '@mantine/core';
import classes from '../css/SubjectButton.module.css'; 

export default function UserButton(props) {
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

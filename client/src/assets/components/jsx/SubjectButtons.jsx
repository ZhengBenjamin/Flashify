import { Card, Group, Text } from '@mantine/core';
import classes from '../css/SubjectButton.module.css';

export default function SubjectButton(props) {
  return (
    <Card withBorder radius='md' className={classes.card} component="a" href={props.link}>
      <Group wrap='nowrap' gap={(0)}>
        <div className={classes.body}>
          <Text className={classes.title}>{props.subject}</Text>
          <Text>{props.description}</Text>
        </div>
      </Group>
    </Card>
  );
}

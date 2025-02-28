import { Tabs, Center, Paper, Stack, Title, Text, useMantineTheme } from '@mantine/core';
import SubjectButton from './SubjectButtons';
import classes from '../css/SubjectNavbar.module.css';

export default function SubjectNavbar(props) {

  return (
    <Paper className={classes.navbar}>
      <Center>
        <Title order={2}> Your Subjects: </Title>
      </Center>

      <Stack justify="center" className={classes.stack}>
      {props.subjects.map((subject, index) => (
        <SubjectButton 
          key={index} 
          subject={subject.name} 
          description={subject.description} 
          link={subject.link} 
        />
      ))}
      </Stack>
    </Paper>
  )

}

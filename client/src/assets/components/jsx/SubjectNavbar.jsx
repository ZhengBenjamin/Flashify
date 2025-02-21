import { Tabs, Center, Paper, Stack, Title, Text, useMantineTheme } from '@mantine/core';
import SubjectButtons from './SubjectButtons';
import classes from '../css/SubjectNavbar.module.css';


function SubjectCard(props) {
  const theme = useMantineTheme();

  return (
    <Paper shadow="md" radius="md" p="lg" component="a" href={props.subjectLink} className={classes.paper}>
      <div>
        <Text align="center" size="xl" className={classes.title}>
          {props.subject}
        </Text>
      </div>
    </Paper>
  );
}

export default function SubjectNavbar(props) {

  return (

    <Paper className={classes.navbar}>
      <Center>
        <Title order={2}> Your Subjects: </Title>
      </Center>

      <Stack justify="center" className={classes.stack}>

        {props.subjects.map((subject) => (
          <SubjectButtons keyprops={subject}/>
        ))}
        
      </Stack>
    </Paper>
  )

}

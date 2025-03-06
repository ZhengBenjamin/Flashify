import { useState } from 'react';
import { Center, Paper, Stack, Title, TextInput, Button, Modal } from '@mantine/core';
import { ColorInput } from '@mantine/core';
import SubjectButton from './SubjectButtons';
import classes from '../css/SubjectNavbar.module.css';

export default function SubjectNavbar(props) {
  const { subjects, onSubjectSelect, onAddSubject } = props;
  const [modalOpened, setModalOpened] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectDescription, setNewSubjectDescription] = useState('');
  const [newSubjectColor, setNewSubjectColor] = useState('#ffffff');

  const handleAddSubject = () => {
    const newSubject = {
      name: newSubjectName,
      description: newSubjectDescription,
      link: `/${newSubjectName.toLowerCase()}`, // can be removed if not needed
      color: newSubjectColor,
    };

    onAddSubject(newSubject);
    setNewSubjectName('');
    setNewSubjectDescription('');
    setNewSubjectColor('#ffffff');
    setModalOpened(false);
  };

    return (

        <Paper className={classes.navbar}>
            <Center>
                <Title order={2}> Your Subjects: </Title>
            </Center>

            <Stack justify="center" className={classes.stack}>

                {props.subjects.map((subject) => (
                    <SubjectCard subject={subject.label} subjectLink={subject.link} />
                ))}

            </Stack>
        </Paper>
    )

}
  return (
    <>
      <Paper className={classes.navbar}>
        <Center>
          <Title order={2}> Your Subjects: </Title>
        </Center>

        <Stack justify="center" className={classes.stack}>
          {subjects.map((subject, index) => (
            <SubjectButton 
              key={index} 
              subject={subject.name} 
              description={subject.description} 
              color={subject.color}
              onClick={() => onSubjectSelect(subject)}  // Pass selected subject to parent
            />
          ))}

          {/* Create New Subject Button */}
          <Button onClick={() => setModalOpened(true)}>Create New Subject</Button>
        </Stack>
      </Paper>

      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Create New Subject">
        <TextInput
          label="Subject Name"
          placeholder="Enter subject name"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.currentTarget.value)}
          required
          mb="md"
        />
        <TextInput
          label="Subtitle"
          placeholder="Enter subject subtitle/description"
          value={newSubjectDescription}
          onChange={(e) => setNewSubjectDescription(e.currentTarget.value)}
          required
          mb="md"
        />
        <ColorInput
          label="Button Color"
          placeholder="Pick a color"
          value={newSubjectColor}
          onChange={setNewSubjectColor}
          required
          mb="md"
        />
        <Button onClick={handleAddSubject}>Add Subject</Button>
      </Modal>
    </>
  );
}

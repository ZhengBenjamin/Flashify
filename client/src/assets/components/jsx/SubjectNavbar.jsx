import { useState } from 'react';
import { Center, Paper, Stack, Title, TextInput, Button, Modal, Card } from '@mantine/core';
import { ColorInput } from '@mantine/core';
import SubjectButton from './SubjectButtons';
import classes from '../css/SubjectNavbar.module.css';


export default function SubjectNavbar(props) {
  const { subjects, onSubjectSelect, onAddSubject } = props;
  const [modalOpened, setModalOpened] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectColor, setNewSubjectColor] = useState('#ffffff');

  const handleAddSubject = () => {
    const newSubject = {
      subjectName: newSubjectName,    
      color: newSubjectColor,         
    };
  
    onAddSubject(newSubject);         
    setNewSubjectName('');
    setNewSubjectColor('#ffffff');
    setModalOpened(false);
  };
  

  return (
    <>
      <Paper className={classes.navbar}>
        <Title order={4}>Available Subjects: </Title>
        <Stack justify="center" className={classes.stack}>
          {subjects.map((subject, index) => (
            <SubjectButton 
              key={index} 
              subject={subject.name} 
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
  )
}
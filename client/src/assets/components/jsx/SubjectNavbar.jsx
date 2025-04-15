import { useState } from 'react';
import { Paper, Stack, Title, TextInput, Button, Modal, ColorInput } from '@mantine/core';
import SubjectButton from './SubjectButtons';
import classes from '../css/SubjectNavbar.module.css';
import axios from 'axios';

export default function SubjectNavbar(props) {
  const { subjects, onSubjectSelect, onAddSubject, onSubjectDeleted } = props;

  const [modalOpened, setModalOpened] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectColor, setNewSubjectColor] = useState('#ffffff');
  const [hoveredSubjectId, setHoveredSubjectId] = useState(null);

  // Handle subject creation
  const handleSaveSubject = () => {
    const subjectData = {
      subjectName: newSubjectName,
      color: newSubjectColor,
    };

    onAddSubject(subjectData);

    setModalOpened(false);
    setNewSubjectName('');
    setNewSubjectColor('#ffffff');
  };

  // Delete subject
  const handleDeleteSubject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject and all its decks/cards?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/subject/${id}`);
      onSubjectDeleted(id); // update parent state
    } catch (err) {
      console.error("Error deleting subject:", err);
      alert("Failed to delete subject.");
    }
  };

  return (
    <>
      <Paper className={classes.navbar}>
        <Title order={4}>Available Subjects:</Title>
        <Stack justify="center" className={classes.stack}>
          {subjects.map((subject, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredSubjectId(subject.id)}
              onMouseLeave={() => setHoveredSubjectId(null)}
              style={{ position: 'relative' }}
            >
              <SubjectButton
                subject={subject.name}
                color={subject.color}
                onClick={() => onSubjectSelect(subject)}
              />
              {hoveredSubjectId === subject.id && (
                <>
                  <Button
                    size="xs"
                    color="red"
                    style={{
                      position: 'absolute',
                      top: '50%', 
                      right: '10px',
                      transform: 'translateY(-50%)', // Vertically center the button
                      padding: '5px 10px',
                      backgroundColor: '#e74c3c',  // Red for Delete
                      color: 'white',
                      display: 'inline-block',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSubject(subject.id);
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          ))}

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
        <Button onClick={handleSaveSubject}>Add Subject</Button>
      </Modal>
    </>
  );
}

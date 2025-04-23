/**
 * SubjectNavbar component for managing subjects.
 * Displays a list of subjects and allows users to add or delete subjects.
 * @param {Object} props - Component props.
 * @param {Array} props.subjects - List of subjects.
 * @param {Function} props.onSubjectSelect - Function to handle subject selection.
 * @param {Function} props.onAddSubject - Function to handle adding a new subject.
 * @param {Function} props.onSubjectDeleted - Function to handle subject deletion.
 * @returns {JSX.Element} The SubjectNavbar layout.
 */

import { useState } from 'react';
import { Paper, Stack, Title, TextInput, Button, Modal, ColorInput, Group } from '@mantine/core';
import SubjectButton from './SubjectButtons';
import classes from '../css/SubjectNavbar.module.css';
import axios from 'axios';

export default function SubjectNavbar(props) {
  const { subjects, onSubjectSelect, onAddSubject, onSubjectDeleted } = props;

  const [modalOpened, setModalOpened] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectColor, setNewSubjectColor] = useState('');
  const [hoveredSubjectId, setHoveredSubjectId] = useState(null);

  // Handle subject creation
  const handleSaveSubject = () => {
    const subjectData = {
      subjectName: newSubjectName,
      color: newSubjectColor || null, // Pass null if no color is selected
    };

    onAddSubject(subjectData);

    setModalOpened(false);
    setNewSubjectName('');
    setNewSubjectColor('');
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
      <Paper
        shadow="md"
        radius="md"
        p="lg"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Title order={4} align="center" style={{ color: '#4c6ef5' }}>
          Available Subjects
        </Title>
        <Stack mt="lg">
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
                <Button
                  size="xs"
                  color="red"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    padding: '5px 10px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubject(subject.id);
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
          <Button
            fullWidth
            className={classes.createSubjectButton}
            onClick={() => setModalOpened(true)}
          >
            Create New Subject
          </Button>
        </Stack>
      </Paper>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title=""
        centered
        overlayOpacity={0.6}
        overlayBlur={3}
        size="lg"
        styles={{
          modal: {
            backgroundColor: '#f0f4ff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          },
          header: { borderBottom: 'none' },
          close: { color: '#4c6ef5' },
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Title order={3} style={{ color: '#4c6ef5', marginBottom: '1rem' }}>
            Create a New Subject
          </Title>
          <TextInput
            label="Subject Name"
            placeholder="Enter subject name"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.currentTarget.value)}
            required
            mb="md"
            styles={{
              input: {
                borderRadius: '8px',
              },
            }}
          />
          <ColorInput
            label="Pick a Color (Optional)"
            placeholder="Select a color or leave blank for random"
            value={newSubjectColor}
            onChange={setNewSubjectColor}
            mb="md"
            styles={{
              input: {
                borderRadius: '8px',
              },
            }}
          />
          <Group position="center" mt="lg" style={{paddingTop: '2rem'}}>
            <Button
              onClick={handleSaveSubject}
              style={{
                backgroundColor: '#4c6ef5',
                color: '#ffffff',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
              }}
            >
              Add Subject
            </Button>
            <Button
              variant="outline"
              onClick={() => setModalOpened(false)}
              style={{
                borderColor: '#4c6ef5',
                color: '#4c6ef5',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
              }}
            >
              Cancel
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
}

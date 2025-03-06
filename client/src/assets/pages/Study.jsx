import { useState } from 'react';
import { Grid, Container } from '@mantine/core';
import Header from '../components/jsx/Header';
import SubjectNavbar from '../components/jsx/SubjectNavbar';
import QuizHistory from '../components/jsx/QuizHistory';
import Events from '../components/jsx/Events';
import SubjectDashboard from '../components/jsx/SubjectDashboard';

export default function Study() {
  // API STUFF: GET SUBJECT DATA FROM DATABASE; SEND NEW SUBJECT TO DATABASE WHEN USER CREATES ONE. 


  // TODO: GET SUBJECT API 
  const [subjects, setSubjects] = useState([
    { id: 'math', name: 'Math', description: 'Mathematics Subject', color: '#e0f7fa' },
    { id: 'science', name: 'Science', description: 'Science Subject', color: '#e8f5e9' },
    { id: 'history', name: 'History', description: 'History Subject', color: '#fffde7' },
  ]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Dummy quiz history data implemnet this last
  const quizHistory = [
    { subject: 'math', date: '69420-02-25', score: 85 },
    { subject: 'science', date: '2012-02-20', score: 92 },
    { subject: 'history', date: '2077-02-15', score: 78 },
  ];

  // Don't implemnet this yet don't knwo if we will keep this
  const events = [
    {
      name: 'Math Quiz - Algebra',
      date: '2024-03-05',
      time: '10:00 AM',
      description: 'Test your knowledge of Algebraic equations.',
      location: 'Online',
    },
    {
      name: 'Science Lecture - Physics',
      date: '2024-03-10',
      time: '2:00 PM',
      description: 'Join us for a detailed lecture on the basics of Physics.',
      location: 'Room 203',
    },
  ];

  // Add subject to db dunno if this works david check
  const addSubject = async (newSubject) => {
    try {
      const response = await fetch('/api/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubject),
      });
      if (!response.ok) {
        throw new Error('Error adding subject');
      }
      const data = await response.json();
      // Once update, gets new subject from db? Dunno 
      setSubjects((prev) => [...prev, data.subject]);
    } catch (error) {
      console.error('Failed to add subject:', error);
    }
  };

  return (
    <Container my="xl">
      <Grid>
        {/* Left Sidebar */}
        <Grid.Col span={4}>
          <SubjectNavbar 
            subjects={subjects} 
            onSubjectSelect={(subject) => setSelectedSubject(subject)}
            onAddSubject={addSubject}
          />
        </Grid.Col>

        {/* Right Content Area */}
        <Grid.Col span={8}>
          {selectedSubject ? (
            <SubjectDashboard 
              subjectId={selectedSubject.id} 
            />
          ) : (
            <>
              <QuizHistory quizzes={quizHistory} />
              <Events events={events} />
            </>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}

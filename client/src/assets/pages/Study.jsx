import React, { useState, useEffect, useContext } from 'react';
import { Grid, Title, Modal, Paper } from '@mantine/core';
import { UserContext } from '../../App';
import SubjectNavbar from '../components/jsx/SubjectNavbar';
import QuizHistory from '../components/jsx/QuizHistory';
import SubjectDashboard from '../components/jsx/SubjectDashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import classes from '../components/css/Dashboard.module.css';

export default function Study() {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showRedirectModal, setRedirectModal] = useState(false);

  const quizHistory = [
    { subject: 'math', date: '69420-02-25', score: 85 },
    { subject: 'science', date: '2012-02-20', score: 92 },
    { subject: 'history', date: '2077-02-15', score: 78 },
  ];

  useEffect(() => {
    if (!username) {
      setRedirectModal(true);
      setTimeout(() => {
        setRedirectModal(false);
        navigate('/auth');
      }, 3000);
    }
  }, [username, navigate]);

  const fetchSubjects = async () => {
    if (!username) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/subject/${username}`);
      const subjectList = res.data.map((s) => ({
        id: s.subject_id,
        name: s.subjectName,
        color: `#${s.color.toString(16).padStart(6, '0')}`,
      }));
      setSubjects(subjectList);
    } catch (err) {
      console.error("❌ Failed to fetch subjects:", err.response?.data || err.message || err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [username]);

  const generateRandomPastelColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  };

  const addSubject = async ({ subjectName, color }) => {
    try {
      const finalColor = color || generateRandomPastelColor();
      const colorNumber = parseInt(finalColor.replace("#", ""), 16);
      const newSubjectData = {
        subject_id: uuidv4(),
        username,
        subjectName,
        color: colorNumber,
      };

      const res = await axios.post("http://localhost:4000/api/subject/create", newSubjectData);
      const createdSubject = res.data;

      setSubjects((prev) => [
        ...prev,
        {
          id: createdSubject.subject_id,
          name: createdSubject.subjectName,
          color: `#${createdSubject.color.toString(16).padStart(6, '0')}`,
        },
      ]);
    } catch (err) {
      console.error("❌ Failed to create subject:", err.response?.data || err.message || err);
      alert("Error creating subject. Please try again.");
    }
  };

  const deleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/subject/${id}`);
      setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
    } catch (err) {
      console.error("Error deleting subject:", err);
      alert("Failed to delete subject.");
    }
  };

  const editSubject = async (id, updatedSubject) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/subject/${id}`, updatedSubject);
      const updated = res.data;

      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject.id === id ? { ...subject, name: updated.subjectName, color: updated.color } : subject
        )
      );
    } catch (err) {
      console.error("Error updating subject:", err);
      alert("Failed to update subject.");
    }
  };

  return (
    <div className={classes.dashboardContainer}>
      <Paper className={classes.dashboardPaper} radius="md">
        <Title align="center" className={classes.dashboardTitle}>
          Welcome to your dashboard, {username}!
        </Title>
        <Grid gutter="xl" className={classes.dashboardGrid}>
          <Grid.Col
            span={4}
            className={classes.subjectNavbar}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <SubjectNavbar
              subjects={subjects}
              onSubjectSelect={(subject) => setSelectedSubject(subject)}
              onAddSubject={addSubject}
              onSubjectDeleted={deleteSubject}
              onEditSubject={editSubject}
            />
          </Grid.Col>

          <Grid.Col span={8}>
            {selectedSubject ? ( // If subject selected show subject dashboard
              <SubjectDashboard subject={selectedSubject} key={selectedSubject.id} />
            ) : ( // else default view
              <Paper className={classes.quizHistoryPaper} style={{paddingTop: "30px"}}> 
                <Title order={2} align="center" className={classes.quizHistoryTitle}>
                  Select a subject from the left to view your decks!
                </Title>
                {/* <QuizHistory quizzes={quizHistory} /> */}
              </Paper>
            )}
          </Grid.Col>
        </Grid>
      </Paper>

      <Modal
        opened={showRedirectModal}
        onClose={() => {}}
        title="Authentication Required"
        centered
      >
        <Title order={5} align="center">
          You must be signed in to visit this page. Redirecting to the Login Page...
        </Title>
      </Modal>
    </div>
  );
}

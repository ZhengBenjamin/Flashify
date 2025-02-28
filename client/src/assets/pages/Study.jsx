import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from '../components/jsx/Header';
import SubjectNavbar from '../components/jsx/SubjectNavbar';
import QuizHistory from '../components/jsx/QuizHistory';

// TODO: Link to DB both are example data
const subjects = [
  { name: 'Math', description: 'Mathematics Subject', link: '/math' },
  { name: 'Science', description: 'Science Subject', link: '/science' },
  { name: 'History', description: 'History Subject', link: '/history' },
];

const quizHistory = [
  { subject: 'Math', date: '69420-02-25', score: 85 },
  { subject: 'Science', date: '2012-02-20', score: 92 },
  { subject: 'History', date: '2077-02-15', score: 78 },
];

export default function Study() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={<Header />}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <SubjectNavbar subjects={subjects} />
      </AppShell.Navbar>

      <AppShell.Main>
        {/* Todo: Add flashcards + features */}
        
        {/* Quiz History Section */}
        <QuizHistory quizzes={quizHistory} />
      </AppShell.Main>
    </AppShell>
  );
}

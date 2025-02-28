import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from '../components/jsx/Header';
import SubjectNavbar from '../components/jsx/SubjectNavbar';

// TODO: Link to DB
const subjects = [
  { name: 'Math', description: 'Mathematics Subject', link: '/math' },
  { name: 'Science', description: 'Science Subject', link: '/science' },
  { name: 'History', description: 'History Subject', link: '/history' },
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
        <SubjectNavbar subjects={subjects}/>
      </AppShell.Navbar>

      <AppShell.Main>
        {/*Todo: Add flashcards + features*/}
      </AppShell.Main>
    </AppShell>
  );
}
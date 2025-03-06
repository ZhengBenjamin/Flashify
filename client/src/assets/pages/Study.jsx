
import { AppShell, Burger } from '@mantine/core';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from '../components/jsx/Header';
import SubjectNavbar from '../components/jsx/SubjectNavbar';

// TODO: Link to DB
const subjects = [
    { label: 'Math', link: '/math' },
    { label: 'Science', link: '/science' },
    { label: 'History', link: '/history' },
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
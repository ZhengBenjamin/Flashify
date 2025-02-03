import {AppShell, Navbar, Header, Group, Button, Burger} from '@mantine/core';

export default function NavBar() {
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            navbar={
                <Navbar>
                    <Group>
                        <!-- TODO: Update with how we want the Navbar to act like -->
                        <Button>Home</Button>
                        <Button>Study</Button>
                        <Button>Upload a Study Guide</Button>
                        <Button>Support</Button>
                    </Group>
                </Navbar>
            }
            header={
                <Header height={60} p="md">
                    <Group position={"apart"} style={{height: "100%"}}>
                        <Burger opened={opened} onClick={() => setOpened((o) => !o)} size={"sm"}/>
                        <h1>Flashify</h1>
                    </Group>
                </Header>
            }
            >
            {/* Main Content goes here */}
        </AppShell>
    )
}
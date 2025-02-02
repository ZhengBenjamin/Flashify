// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import Front from './assets/pages/Front';
import Authentication from './assets/pages/Authentication';

export default function App() {
  return (
    <MantineProvider>
      <Front />
    </MantineProvider>
  );
}
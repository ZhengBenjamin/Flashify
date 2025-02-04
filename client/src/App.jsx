// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import Front from './assets/pages/Front';
import Authentication from './assets/pages/Authentication';
import Header from "./assets/components/jsx/Header.jsx";

export default function App() {
    return (
        <MantineProvider>
            <Router>
                <Header/>

                <Routes>
                    <Route path="/" element={<Front/>}/>
                    <Route path="/auth" element={<Authentication/>}/>
                </Routes>
            </Router>
        </MantineProvider>
    );
}
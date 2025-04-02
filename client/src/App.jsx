// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import React, {useState, createContext} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import Front from './assets/pages/Front';
import Authentication from './assets/pages/Authentication';
import Header from "./assets/components/jsx/Header.jsx";
import Flashcards from "./assets/components/jsx/Flashcards.jsx";
import Summary from "./assets/components/jsx/Summary.jsx";
import Study from "./assets/pages/Study";
import Footer from "./assets/components/jsx/Footer.jsx";

export const UserContext = createContext();

// This is the main entry point of the application?????? Is it? Or does the main call this. 
export default function App() {
    const storedUsername = localStorage.getItem('username') || '';
    const [username, setUsername] = useState(storedUsername);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            <MantineProvider>
                <Router>
                    <Header/>

                    <Routes>
                        <Route path="/" element={<Front/>}/>
                        <Route path="/auth" element={<Authentication/>}/>
                        <Route path="/flashcards" element={<Flashcards/>}/>
                        <Route path="/summary" element={<Summary/>}/>
                        <Route path="/studyinterface" element={<Study/>}/>
                    </Routes>

                    <Footer/>
                </Router>
            </MantineProvider>
        </UserContext.Provider>
    );
}

import React, {useState, createContext} from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import Front from './assets/pages/Front';
import Authentication from './assets/pages/Authentication';
import Admin from './assets/pages/Admin'; 
import Header from "./assets/components/jsx/Header.jsx";
import Flashcards from "./assets/components/jsx/Flashcards.jsx";
import Summary from "./assets/components/jsx/Summary.jsx";
import Study from "./assets/pages/Study";
import Footer from "./assets/components/jsx/Footer.jsx";

export const UserContext = createContext();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="fadePage">
      <Routes location={location}>
        <Route path="/" element={<Front />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/studyinterface" element={<Study />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default function App() {
    const storedUsername = localStorage.getItem('username') || '';
    const storedRole = localStorage.getItem('role') || '';
    
    const [username, setUsername] = useState(storedUsername);
    const [role, setRole] = useState(storedRole);
  
    return (
      <UserContext.Provider value={{ username, setUsername, role, setRole }}>
        <MantineProvider>
          <Router>
            <Header />
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              .fadePage {
                animation: fadeIn 0.5s ease-in-out;
              }
            `}</style>
            <AnimatedRoutes />
            <Footer />
          </Router>
        </MantineProvider>
      </UserContext.Provider>
    );
  }

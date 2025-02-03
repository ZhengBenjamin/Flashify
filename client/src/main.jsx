import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from "./assets/components/jsx/Navbar";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Navbar/>
        <App/>
    </StrictMode>,
)

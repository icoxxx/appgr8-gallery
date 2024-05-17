import './App.css';
import PhotoList from './components/PhotoList';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhotoForm from './components/PhotoForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PhotoList />} />
                <Route path="/add" element={<PhotoForm />} />
                <Route path="/edit/:id" element={<PhotoForm />} />
            </Routes>
        </Router>
    );
};

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import StudentForm from './components/StudentForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StudentList />} />
                <Route path="/students/new" element={<StudentForm />} />
                <Route path="/students/:id" element={<StudentDetail />} />
                <Route path="/students/:id/edit" element={<StudentForm />} />
            </Routes>
        </Router>
    );
};

export default App;

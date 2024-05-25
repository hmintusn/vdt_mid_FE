import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        fullName: '',
        gender: '',
        school: ''
    });

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/students/${id}`)
                .then(response => setStudent(response.data))
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `http://localhost:8080/students/${id}` : 'http://localhost:8080/students';

        axios[method](url, student)
            .then(() => navigate('/'))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>{id ? 'Edit Student' : 'Add Student'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={student.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={student.gender}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>School:</label>
                    <input
                        type="text"
                        name="school"
                        value={student.school}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default StudentForm;

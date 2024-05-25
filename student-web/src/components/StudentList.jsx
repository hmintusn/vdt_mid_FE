import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"

const StudentList = () => {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/students');
            setStudents(response.data);
            console.log(response);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, []);
    
    const deleteStudent = (id) => {
        axios.delete(`http://localhost:8080/students/${id}`)
            .then(() => {
                setStudents(students.filter(student => student.id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Student List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>School</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="text-center">
                            <td>{student.fullName}</td>
                            <td>{student.gender}</td>
                            <td>{student.school}</td>
                            <td className="gap-2">
                                <Link to={`/students/${student.id}`} className="gap-2">
                                    <span className="btn btn-info btn-sm">
                                        <FaEye /> View
                                    </span>
                                </Link>
                                <Link to={`/students/${student.id}/edit`} className="gap-2"> 
                                    <span className="btn btn-info btn-sm">
                                        <FaEdit /> Edit
                                    </span>
                                </Link>
                                <button onClick={() => deleteStudent(student.id)} className="btn btn-danger btn-sm ml-5">
                                    <FaTrashAlt /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/students/new">
                <span className="btn btn-primary btn-sm">
                    <FaPlus />Add Student
                </span>
            </Link>
        </div>
    );
};

export default StudentList;

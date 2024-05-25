import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaEdit} from "react-icons/fa"

const StudentDetail = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/students/${id}`)
            .then(response => setStudent(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!student) return <div>Loading...</div>;

    return (
        <div>
            <h1>Student Detail</h1>
            <p>Full Name: {student.fullName}</p>
            <p>Gender: {student.gender}</p>
            <p>School: {student.school}</p>
            <Link to={`/students/${student.id}/edit`} className="gap-2"> 
                <span className="btn btn-info btn-sm">
                    <FaEdit /> Edit
                </span>
            </Link>
            <Link to="/">Back to List</Link>
        </div>
    );
};

export default StudentDetail;

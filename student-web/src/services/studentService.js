import axios from 'axios';

export const api = axios.create({
	baseURL: "http://localhost:8080"
})

export const getAllStudents = async () => {
    try{
        const result = await api.get('/students');
        return result.data;
    }catch(err){
        throw new Error("Error fetching students")
    }
}
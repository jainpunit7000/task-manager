import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const getTasks = async () => {
    try {
        const response = await axios.get(`${baseUrl}/tasks/`);
        return response;
    } catch (err) {
        return err;
    }
};

export const createTask = async (newTask) => {
    try {
        const response = await axios.post(`${baseUrl}/tasks/`, newTask);
        return response;
    } catch (err) {
        return err;
    }
};

export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await axios.put(`${baseUrl}/tasks/${taskId}/`, updatedTask);
        return response;
    } catch (err) {
        return err;
    }
};

export const getAuditTrail = async (taskId) => {
    try {
        const response = await axios.get(`${baseUrl}/tasks/${taskId}/audit_trace`);
        return response;
    } catch (err) {
        return err;
    }
};
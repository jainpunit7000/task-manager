import React from "react";

import { createTask } from "../api/taskApi";
import TaskForm from "./TaskForm";

const CreateTask = ({ addTask, showSnackbar }) => {
    const handleSubmit = async (newTask) => {
        const createdTask = await createTask(newTask);
        if (createdTask.data === undefined) {
            showSnackbar("Error creating task");
            return;
        }
        addTask(createdTask.data);
    };

    return (
        <div>
            <TaskForm onSubmit={handleSubmit}></TaskForm>
        </div>
    );
};

export default CreateTask;

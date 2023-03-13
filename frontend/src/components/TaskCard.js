import React, { useState } from 'react';

import { formatDate, splitAndCapitalize } from '../utils/helper';
import { updateTask } from "../api/taskApi";
import TaskForm from './TaskForm';
import AuditTrail from './AuditTrail';

const taskCardColor = {
    "pending": "#D3D3D3",
    "in_progress": "#fff3cd",
    "in_review": "#f8d7da",
    "complete": "#d4edda"

}

const TaskCard = ({ task, updateExistingTask, showSnackbar }) => {
    const [showAudit, setShowAudit] = useState(false);
    const handleAuditClose = () => setShowAudit(false);
    const handleAuditShow = () => setShowAudit(true);

    const id = (task && task.id) || "dummy";
    const created_at = (task && task.created_at) || "dummy";
    
    const handleUpdateSubmit = async (newTask) => {
        const updatedTask = await updateTask(newTask["id"], newTask);
        if (updatedTask.data === undefined) {
            showSnackbar("Error updating task");
            return;
        }
        updateExistingTask(updatedTask.data);
    };

    return (
        <div className="card" style={{ position: "relative", background: taskCardColor[task.status] }}>
            <div className="card-body">
                <h6 className="card-title">Task Id: {task.id}</h6>
                <hr style={{margin:"4px auto"}}/>
                <h5 className="card-text my-1">{task.title}</h5>
                <p className="card-text">Status: {splitAndCapitalize(task.status)}</p>
                <h6 className="card-subtitle mb-2 text-muted">
                    ETA: {formatDate(task.eta)}
                </h6>
                <TaskForm task={task} onSubmit={handleUpdateSubmit} />
                <div>
                    <span className="audit-trail" style={{
                        position: "absolute",
                        right: "5%",
                        bottom: "22px"
                    }} onClick={handleAuditShow}>
                        Audit
                    </span>
                    {showAudit && <AuditTrail
                        task_id={id}
                        created_at={created_at}
                        showAudit={showAudit}
                        handleAuditClose={handleAuditClose}
                        handleAuditShow={handleAuditShow}
                        showSnackbar={showSnackbar}
                    />}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
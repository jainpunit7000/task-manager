import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, updateExistingTask, showSnackbar }) => {
    return (
        <div className="container">
            <div className="row align-items-center">
                {tasks.length > 0 ? tasks.map(task => (
                    <div key={task.id} className="col-md-4 col-lg-3 mb-4">
                        <TaskCard showSnackbar={showSnackbar} task={task} updateExistingTask={updateExistingTask} />
                    </div>
                )) : <p className='text-center mt-3'>No tasks to display</p>}
            </div>
        </div>
    );
};

export default TaskList;

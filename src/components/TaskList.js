// TaskList.js
import React from 'react';
import { useSelector } from 'react-redux';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-item mb-3 border p-3 rounded">
          {task.image && (
            <>
              <img
                src={task.image}
                alt={`${task.title} preview`}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
              />
              <div>Image URL: {task.image}</div> {/* Log the URL */}
            </>
          )}
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.state}</p>
        </div>
      ))}
    </div>
  );
};


export default TaskList;

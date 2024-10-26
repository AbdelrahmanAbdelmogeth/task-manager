import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../features/tasks/taskSlice';
import TaskForm from './TaskForm';

const EditTaskPage = ({ task, onClose, onAddTaskToggle }) => {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateTask({ ...task, ...data })); // Merge task data with updates
    onClose(); // Close form after submission
  };

  return (
    <div>
      {task ? (
        <TaskForm
          onSubmit={onSubmit}
          defaultValues={task}
          onAddTaskToggle={onClose}
          isEditMode={true}
        />
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};

export default EditTaskPage;

import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import TaskForm from './TaskForm';

const AddTaskPage = ({ onAddTaskToggle }) => {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addTask({ ...data, id: Date.now().toString() }));
    onAddTaskToggle(); // Close form after submission
  };

  return (
    <div>
      <TaskForm onSubmit={onSubmit} onAddTaskToggle={onAddTaskToggle} isEditMode={false} />
    </div>
  );
};

export default AddTaskPage;

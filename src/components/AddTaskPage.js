import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import TaskForm from './TaskForm';

const AddTaskPage = ({onAddTaskToggle}) => {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addTask({ ...data, id: Date.now().toString(), state: 'todo' }));
  };

  return (
    <div>
      <TaskForm onSubmit={onSubmit} onAddTaskToggle={onAddTaskToggle}/>
    </div>
  );
};

export default AddTaskPage;

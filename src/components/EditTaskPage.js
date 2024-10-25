// src/components/EditTaskPage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../features/tasks/taskSlice';
import TaskForm from './TaskForm';
import { useParams } from 'react-router-dom';

const EditTaskPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.find(task => task.id === id));

  const onSubmit = (data) => {
    dispatch(editTask({ id, updates: data }));
  };

  return (
    <div>
      <h2>Edit Task</h2>
      {task ? <TaskForm onSubmit={onSubmit} defaultValues={task} /> : <p>Task not found</p>}
    </div>
  );
};

export default EditTaskPage;

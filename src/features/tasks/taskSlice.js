// taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, index: state.length }; // Set index based on current length
      state.push(newTask);
    },  
    editTask: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex(task => task.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    changeTaskState: (state, action) => {
      const { id, newState } = action.payload;
      const index = state.findIndex(task => task.id === id);
      if (index !== -1) {
        state[index].state = newState;
      }
    },
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Update the existing task
      }
    },
     // existing reducers...
     reorderTasks: (state, action) => {
      return action.payload.sort((a, b) => a.index - b.index); // Sort tasks by index
    },
  },
});

export const { addTask, deleteTask, changeTaskState, updateTask, reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;

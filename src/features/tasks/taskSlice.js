// taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
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
    }
  },
});

export const { addTask, editTask, deleteTask, changeTaskState, updateTask } = taskSlice.actions;
export default taskSlice.reducer;

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AddTaskPage from './components/AddTaskPage';
import EditTaskPage from './components/EditTaskPage';
import KanbanBoard from './components/KanbanBoard';
import Sidebar from './components/Sidebar';

function App() {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [isEditTaskVisible, setIsEditTaskVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsEditTaskVisible(true);
  };

  const toggleAddTaskVisibility = () => {
    setIsAddTaskVisible((prev) => !prev);
  };

  const closeAddTaskForm = () => {
    setIsAddTaskVisible(false);
  };

  const closeEditTaskForm = () => {
    setIsEditTaskVisible(false);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex" id="wrapper">
          <Sidebar onAddTaskToggle={toggleAddTaskVisibility} />
          <div className="App" style={{ flexGrow: 1 }}>
            <KanbanBoard onEditTask={handleEditTask} />
            {isAddTaskVisible && (
              <AddTaskPage 
                onAddTaskToggle={closeAddTaskForm} 
                onAdd={() => setIsAddTaskVisible(false)} 
              />
            )}
            {isEditTaskVisible && (
              <EditTaskPage 
                task={taskToEdit} 
                onClose={closeEditTaskForm} 
                onAddTaskToggle={toggleAddTaskVisibility} 
              />
            )}
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

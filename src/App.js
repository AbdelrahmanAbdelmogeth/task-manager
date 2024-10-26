import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Remove Route and Routes imports
import { Provider } from 'react-redux';
import { store } from './app/store';
import AddTaskPage from './components/AddTaskPage';
import EditTaskPage from './components/EditTaskPage';
import KanbanBoard from './components/KanbanBoard';
import Sidebar from './components/Sidebar';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowEditTask(true);
  };

  const handleAddTaskToggle = () => {
    setShowAddTask((prev) => !prev);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex" id="wrapper">
          <Sidebar onAddTaskToggle={handleAddTaskToggle} />
          <div className="App" style={{ flexGrow: 1 }}>
            <KanbanBoard onEditTask={handleEditTask} />
            {showAddTask && (
              <AddTaskPage onAddTaskToggle={handleAddTaskToggle} onAdd={() => setShowAddTask(false)} />
            )}
            {showEditTask && <EditTaskPage task={taskToEdit} onClose={() => setShowEditTask(false)} onAddTaskToggle={handleAddTaskToggle}/>}
            
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

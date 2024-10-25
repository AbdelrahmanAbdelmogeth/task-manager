import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AddTaskPage from './components/AddTaskPage';
import KanbanBoard from './components/KanbanBoard';
import Sidebar from './components/Sidebar';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const handleAddTaskToggle = () => {
    setShowAddTask((prev) => !prev);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex" id="wrapper">
          <Sidebar onAddTaskToggle={handleAddTaskToggle} />
          <div className="App" style={{ flexGrow: 1 }}>
            <KanbanBoard />
            {showAddTask && (
              <AddTaskPage onAdd={() => setShowAddTask(false)} />
            )}
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

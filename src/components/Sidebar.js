import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = ({ onAddTaskToggle }) => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-dark sidebar" style={{ height: '100vh' }}>
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/kanban" className="nav-link text-white">
              <h5 className="mb-0">Task Manager</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/kanban" className="nav-link bg-primary text-white">
              <i className="fas fa-tasks" style={{ marginRight: '8px' }}></i>Task Board
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link text-white" onClick={onAddTaskToggle} style={{ cursor: 'pointer' }}>
              <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>Add New Task
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

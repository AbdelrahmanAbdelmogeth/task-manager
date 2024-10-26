import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { changeTaskState, deleteTask, reorderTasks } from '../features/tasks/taskSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const KanbanBoard = ({ onEditTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedTasks = Array.from(tasks);

    if (destination.droppableId === source.droppableId) {
      const sourceTasks = updatedTasks.filter(task => task.state === source.droppableId);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      sourceTasks.splice(destination.index, 0, movedTask);
      
      const newTasks = updatedTasks.map(task => 
        task.state === source.droppableId 
          ? { ...task, state: source.droppableId } 
          : task
      );
      
      sourceTasks.forEach((task, index) => {
        newTasks[newTasks.findIndex(t => t.id === task.id)].index = index;
      });
  
      dispatch(reorderTasks(newTasks));
      return;
    }
  
    dispatch(changeTaskState({ id: draggableId, newState: destination.droppableId }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditTask = (task) => {
    onEditTask(task);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesState = selectedState ? task.state === selectedState : true;
    const matchesPriority = selectedPriority ? task.priority === selectedPriority : true;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesPriority && matchesSearch;
  });

  return (
    <div className="container mt-3">
      <div className="row mb-3">
        <div className="col-8">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search by task name" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <div className="col">
          <select className="form-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">All States</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="col">
          <select className="form-select" value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          {['todo', 'doing', 'done'].map((state) => (
            <div className="col" key={state}>
              <Droppable droppableId={state}>
                {(provided) => (
                  <div className="card" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="card-header bg-primary text-white">
                      {state.toUpperCase()}
                    </div>
                    <div className="card-body">
                      {filteredTasks.filter((task) => task.state === state).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            <div className="card mb-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div className={`card-body ${getPriorityColor(task.priority)}`}>
                                {task.image && (
                                  <img
                                    src={task.image}
                                    alt={`${task.title} preview`}
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                  />
                                )}
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                                <span className="badge badge-secondary" style={{ color: task.priority === 'Medium' ? 'black' : 'white' }}
                                >{task.priority}</span>
                                <div className="position-absolute bottom-0 end-0 mb-2 me-2">
                                  <button 
                                    className="btn btn-link p-0 me-2" 
                                    onClick={() => handleEditTask(task)}
                                    title="Edit"
                                  >
                                    <FontAwesomeIcon 
                                      icon={faEdit} 
                                      style={{ color: task.priority === 'Medium' ? 'black' : 'white' }}
                                    />
                                  </button>
                                  <button 
                                    className="btn btn-link p-0" 
                                    onClick={() => handleDeleteTask(task.id)} 
                                    title="Delete"
                                  >
                                    <FontAwesomeIcon 
                                      icon={faTrashAlt} style={{ color: task.priority === 'Medium' ? 'black' : 'white' }}
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-danger text-white';
    case 'Medium':
      return 'bg-warning text-dark';
    case 'Low':
      return 'bg-success text-white';
    default:
      return '';
  }
};

export default KanbanBoard;

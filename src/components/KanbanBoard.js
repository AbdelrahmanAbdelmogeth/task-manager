import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { changeTaskState, deleteTask } from '../features/tasks/taskSlice';
import {reorderTasks} from '../features/tasks/taskSlice'

const KanbanBoard = ({ onEditTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    // Dropped outside the list
    if (!destination) return;
  
    // Dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
  
    // Reordering tasks within the same state
    if (destination.droppableId === source.droppableId) {
      const updatedTasks = Array.from(tasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);
      
      // Dispatch an action to update the state with reordered tasks
      dispatch(reorderTasks(updatedTasks)); // Implement this action in your Redux slice
      return;
    }
  
    // Moving to a different state
    dispatch(changeTaskState({ id: draggableId, newState: destination.droppableId }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditTask = (task) => {
    onEditTask(task); // Pass task to be edited
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="row">
          {['todo', 'doing', 'done'].map((state) => (
            <div className="col" key={state}>
              <Droppable droppableId={state}>
                {(provided) => (
                  <div
                    className="card"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="card-header bg-primary text-white">
                      {state.toUpperCase()}
                    </div>
                    <div className="card-body">
                      {tasks.filter((task) => task.state === state).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              className="card mb-2"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={`card-body ${getPriorityColor(task.priority)}`}>
                                {task.image && (
                                  <img
                                    src={task.image}
                                    alt={`${task.title} preview`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                                  />
                                )}
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                                <span className="badge badge-secondary">{task.priority}</span>
                                <button
                                  className="btn btn-danger btn-sm mt-2 mr-2"
                                  onClick={() => handleDeleteTask(task.id)}
                                >
                                  Delete
                                </button>
                                <button
                                  className="btn btn-warning btn-sm mt-2 me-2"
                                  onClick={() => handleEditTask(task)}
                                >
                                  Edit
                                </button>
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
      </div>
    </DragDropContext>
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

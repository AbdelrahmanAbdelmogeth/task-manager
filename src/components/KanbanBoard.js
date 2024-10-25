import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { changeTaskState } from '../features/tasks/taskSlice';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    dispatch(changeTaskState({ id: draggableId, newState: destination.droppableId }));
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

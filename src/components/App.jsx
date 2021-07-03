import React from 'react';
import NewTaskForm from './NewTaskForm';
import TasksBox from './TasksBox';

const App = () => (
  <div className="col-4">
    <NewTaskForm />
    <TasksBox />
  </div>
);

export default App;

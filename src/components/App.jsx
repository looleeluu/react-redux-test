import React from 'react';
import NewTaskForm from './NewTaskForm';
import Filter from './Filter';
import TasksBox from './TasksBox';

const App = () => (
  <div className="col-5">
    <NewTaskForm />
    <Filter />
    <TasksBox />
  </div>
);

export default App;

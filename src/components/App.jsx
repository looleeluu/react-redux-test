import React from 'react';
import NewTaskForm from './NewTaskForm';
import TasksBox from './TasksBox';

const App = () => (
	<div className="col-5">
		<NewTaskForm />
		<TasksBox />
	</div>
);

export default App;
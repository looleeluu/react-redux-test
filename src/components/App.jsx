import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NewTaskForm from './NewTaskForm';
import TasksBox from './TasksBox';

const App = () => (
	<div className="col-3">
		<NewTaskForm />
		<TasksBox />
	</div>
);

export default App;
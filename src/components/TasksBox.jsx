import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => {
	const { tasks, text } = state;
	const props = {
		tasks,
		text,
	}
	return props;
};

const actionCreators = {
	addTask: actions.addTask,
	removeTask: actions.removeTask,
	updateNewTaskText: actions.updateNewTaskText,
};

const TasksBox = ({ tasks, handleRemoveTask }) => {
	if (tasks.length === 0) {
		return null;
	}
	return (
		<div className="mt-3">
			<ul className="list-group">
				{tasks.map(({ id, text }) => (
					<li key={id} className="list-group-item d-flex">
						<span className="mr-auto">{text}</span>
						<button type="button" className="btn-close" aria-label="Close" onClick={handleRemoveTask(id)} />
					</li>
				))}
			</ul>
		</div>
	)
}

const App = ({ text, tasks, addTask, updateNewTaskText, removeTask }) => {
	const handleAddTask = (e) => {
		e.preventDefault();
		addTask({
				text,
				id: _.uniqueId('task_'),
			},
		);
	};

	const handleInput = (e) => {
		updateNewTaskText(e.target.value);
	};

	const handleRemoveTask = (id) => () => {
		removeTask(id); 
	};

	return (
		<div className="col-5">
			<form action="" className="row m-5 g-3" onSubmit={handleAddTask} >
				<div className="form-group mx-sm-3">
					<input className="form-control" type="text" required value={text} onChange={handleInput} />
				</div>
				<button type="submit" className="btn btn-primary btn-sm">Add</button>
			</form>
			<TasksBox tasks={tasks} handleRemoveTask={handleRemoveTask}  />
		</div>
	);
};

export default connect(mapStateToProps, actionCreators)(App);

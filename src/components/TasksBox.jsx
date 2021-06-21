import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = ({ tasks, text }) => {
	const { allIds, byId } = tasks;
	return { 
		tasks: allIds.map((id) => byId[id]),
		text,
	};
};

const actionCreators = {
	addTask: actions.addTask,
	removeTask: actions.removeTask,
	updateNewTaskText: actions.updateNewTaskText,
	toggleTaskState: actions.toggleTaskState,
};

const TasksBox = ({ tasks, handleToggleTaskState, handleRemoveTask }) => {
	console.log(tasks);
	if (tasks.length === 0) {
		return null;
	}

	return (
		<div className="mt-3">
			<ul className="list-group">
				{tasks.map(({ id, text, state }) => (
					<li key={id} className="list-group-item d-flex">
						<span className="mr-auto">
							<a href="#" onClick={handleToggleTaskState(id)}>
                {state === 'active' ? text : <s>{text}</s>}
              </a>
						</span>
						<button type="button" className="btn-close" aria-label="Close" onClick={handleRemoveTask(id)} />
					</li>
				))}
			</ul>
		</div>
	)
}

const App = ({ text, tasks, addTask, updateNewTaskText, removeTask, toggleTaskState }) => {
	const handleToggleTaskState = (id) => () => {
		toggleTaskState({ id });
	};

	const handleAddTask = (e) => {
		e.preventDefault();
    const task = { text, id: _.uniqueId(), state: 'active' };
    addTask({ task });
	};

	const handleInput = (e) => {
		const text = e.target.value;
		updateNewTaskText({ text });
	};

	const handleRemoveTask = (id) => () => {
		removeTask({ id }); 
	};

	return (
		<div className="col-5">
			<form action="" className="row m-5 g-3" onSubmit={handleAddTask} >
				<div className="form-group mx-sm-3">
					<input className="form-control" type="text" required value={text} onChange={handleInput} />
				</div>
				<button type="submit" className="btn btn-primary btn-sm">Add</button>
			</form>
			<TasksBox tasks={tasks} handleRemoveTask={handleRemoveTask} handleToggleTaskState={handleToggleTaskState} />
		</div>
	);
};

export default connect(mapStateToProps, actionCreators)(App);

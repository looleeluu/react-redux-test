import React from 'react';
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
	removeTask: actions.removeTask,
	toggleTaskState: actions.toggleTaskState,
};

const TasksBox = ({ tasks, removeTask, toggleTaskState }) => {
	const handleToggleTaskState = (id) => () => {
		toggleTaskState({ id });
	};;

	const handleRemoveTask = (id) => () => {
		removeTask({ id }); 
	};;

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

export default connect(mapStateToProps, actionCreators)(TasksBox);

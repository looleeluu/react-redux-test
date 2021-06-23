import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = ({ text }) => {
	const props = { text };
	return props;
};

const actionCreators = {
	addTask: actions.addTask,
	updateNewTaskText: actions.updateNewTaskText,
};

const NewTaskForm = ({ text, addTask, updateNewTaskText }) => {
	const handleAddTask = (e) => {
    e.preventDefault();
    const task = { text, id: _.uniqueId(), state: 'active' };
    addTask({ task });
  };

  const handleUpdateNewTaskText = (e) => {
    updateNewTaskText({ text: e.target.value });
  };

	return (
    <form action="" className="form-inline" onSubmit={handleAddTask}>
      <div className="form-group mx-sm-3">
        <input
          type="text"
          required
          value={text}
          onChange={handleUpdateNewTaskText}
        />
      </div>
      <input type="submit" className="btn btn-primary btn-sm" value="Add" />
    </form>
  );
};

export default connect(mapStateToProps, actionCreators)(NewTaskForm);

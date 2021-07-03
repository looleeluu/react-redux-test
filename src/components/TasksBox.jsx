import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { tasksSelector } from '../selectors/index';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => {
  const { tasksUiState } = state;
  return {
    tasksUiState,
    tasks: tasksSelector(state),
  };
};

const actionCreators = {
  removeTask: actions.removeTask,
  inverseTaskTheme: actions.inverseTaskTheme,
  toggleTaskState: actions.toggleTaskState,
};

const TasksBox = ({
  tasks, tasksUiState, removeTask, inverseTaskTheme, toggleTaskState,
}) => {
  const handleTaskState = (id) => () => {
    toggleTaskState({ id });
  };

  const handleRemoveTask = (id) => () => {
    removeTask({ id });
  };

  const handleInverseTaskTheme = (id) => () => {
    inverseTaskTheme({ id });
  };

  const renderTask = (task) => {
    const { text, id, state } = task;
    const currentTheme = tasksUiState[id].theme;

    const classes = cn({
      'list-group-item d-flex justify-content-between': true,
      [`list-group-item-${currentTheme}`]: true,
    });

    const linkClass = cn({
      'link-dark': currentTheme === 'light',
      'link-primary': currentTheme === 'primary',
    });

    return (
      <li key={id} className={classes}>
        <div className="d-inline">
          <input className="form-check-input mx-2" type="checkbox" value="" onChange={handleTaskState(id)} />
          <a href="/#" className={linkClass} onClick={handleInverseTaskTheme(id)}>{state === 'finished' ? <s>{text}</s> : text}</a>
        </div>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleRemoveTask(id)} />
      </li>
    );
  };

  if (tasks.length === 0) return null;

  return (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(renderTask)}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(TasksBox);
